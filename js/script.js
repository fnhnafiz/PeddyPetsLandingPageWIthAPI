// Globally Varriables For All Shorted with Decending Order Price
let allPets = [];
// Scrool to main section

function goToMainSection() {
  const mainSection = document.getElementById("pets-container");
  mainSection.scrollIntoView({ behavior: "smooth" });
}

const loaderData = async () => {
  startLoading();
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pets`
  );
  const data = await response.json();
  displayPicture(data.pets);
};
// Short for Function
const shortPets = async () => {
  displayPicture(allPets.sort((a, b) => b.price - a.price));
  startLoading();
};

const displayPicture = (allPicture) => {
  document.getElementById("pets-content").style.display = "none";
  document.getElementById("spiner").style.display = "flex";
  setTimeout(function () {
    // console.log(allPicture);
    document.getElementById("pets-content").style.display = "flex";
    document.getElementById("spiner").style.display = "none";

    allPets = allPicture;

    const pictureContainer = document.getElementById("Picture-container");
    pictureContainer.innerHTML = "";
    if (allPicture.length === 0) {
      pictureContainer.classList.remove("grid");
      pictureContainer.innerHTML = `
      <div class="min-h-[400px] flex flex-col gap-5 justify-center items-center bg-[#F8F8F8]">
      <img src="./images/error.webp" alt="Not Available">
      <h1 class="font-bold text-3xl text-center">
      No Information Available
      </h1>
      <p class="text-gray-500 text-base text-center">
      It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
      its layout. The point of using Lorem Ipsum is that it has a.
      </p>
      </div>
      `;
      return;
    } else {
      pictureContainer.classList.add("grid");
    }
    allPicture.forEach((picture) => {
      picture.breed = picture.breed || "N/A";
      picture.date_of_birth = picture.date_of_birth || "N/A";
      picture.price = picture.price || "N/A";
      picture.gender = picture.gender || "N/A";
      // const allPicture = picture?.category ? picture.category : "Not available";
      // console.log(picture);
      const card = document.createElement("div");
      card.classList = "card bg-base-100 shadow-xl px-4 py-4 border";
      card.innerHTML = `
      <div>
                <img class="rounded-lg"
                  src=${picture.image};
                  alt="Shoes"
                />
              </div>
              <div>
                <h2 class="text-xl font-bold  text-black mt-6">${picture.pet_name}</h2>
                <div class="flex gap-2 space-y-3 items-center">
                  <i class="ri-profile-line  text-gray-500 text-[30px]"></i>
                  <p class="text-gray-500">
                   Breed: ${picture.breed}
                  </p>
                </div>
                <div class="flex gap-2  items-center">
                  <i class="ri-calendar-line text-[30px] text-gray-500"></i>
                  <p class="text-gray-500">
                   Birth: ${picture.date_of_birth}
                  </p>
                </div>
                <div class="flex gap-2  items-center">
                  <i class="ri-women-line text-[30px] text-gray-500"></i>
                  <p class="text-gray-500">
                    Gender: ${picture.gender}
                  </p>
                </div>
                <div class="flex gap-2 items-center">
                 <i class="ri-money-dollar-circle-line text-[30px] text-gray-500"></i>
                  <p class="text-gray-500">
                   Price : ${picture.price}$
                  </p>
                </div>
                <div class="flex justify-between border-t pt-3   ">
                  <button onclick="fevoriteImage('${picture.image}')"
                    class="flex w-[18%] justify-center border btn text-[#0E7A81] font-bold p-2 rounded-lg"
                  >
                    
                  <i class="ri-thumb-up-line text-xl"></i>
                  </button>
                  <button onclick="adoptedModal()"
                    class=" btn border text-[#0E7A81] font-bold p-2 rounded-lg"
                  >
                    Adopt
                  </button>
                  <button onclick="petsDetails('${picture.petId}')"
                    class=" btn border  text-[#0E7A81] font-bold p-2 rounded-lg"
                  >
                    Details
                  </button>
                </div>
                </div>
      `;
      pictureContainer.appendChild(card);
    });
  }, 3000);
};

// Loading Spinner

const startLoading = () => {
  // document.getElementById("Picture-container").innerHTML = `
  // <div class="lg:ml-[400px] md:ml-[200px] md:mt-[50px] flex gap-5">
  //           <span  class="loading loading-dots loading-lg"></span>
  //           <span  class="loading loading-dots loading-lg"></span>
  //           <span class="loading loading-dots loading-lg"></span>
  // </div>
  // `;
};
loaderData();

//Fevorite Images view Function

const imgViewDetails = async () => {
  startLoading();
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pets`
  );
  const data = await response.json();
  fevoriteImage(data.pets);
};
const fevoriteImage = async (pictures) => {
  //   const { image } = pictures;
  const fevoriteImageContainer = document.getElementById(
    "fevoritePictureContainer"
  );
  const fevoriteOne = document.createElement("div");
  fevoriteOne.innerHTML = `
    <div class="">
    <img class="rounded-lg w-full" src='${pictures}'/>
    </div>
    `;
  fevoriteImageContainer.appendChild(fevoriteOne);
};

// Remove BUtton Colors
const removeButtonsColor = () => {
  const removeButtons = document.getElementsByClassName("pets-btn");

  for (let button of removeButtons) {
    button.classList.remove("activeBtn");
    button.classList.remove("border-[#0E7A81]");
  }
};

// SHow Catagoies Picture Pets
const loadCatagoriesPicture = async (id) => {
  startLoading();
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${id}`
  );
  const data = await res.json();
  {
    removeButtonsColor();
    const activeButton = document.getElementById(`btn-${id}`);

    activeButton.classList.add("activeBtn", "border-[#0E7A81]");
    displayPicture(data.data);
    reloadPage();
  }
};

// Modal Function
const petsDetails = async (petId) => {
  // console.log(petId);
  // startLoading();
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${petId}`
  );
  const data = await res.json();
  // modalDetails(data.petData);
  const {
    pet_name = "N/A",
    image = "N/A",
    breed = "N/A",
    gender = "N/A",
    birth = "N/A",
    price = "N/A",
    vaccinated_status = "N/A",
    pet_details = "N/A",
  } = data.petData;

  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `

<dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
  <div class="modal-box">
    <img class="rounded-lg w-full"
                src=${image};
                alt="Shoes"
              />
              <div>
              <h2 class="text-xl font-bold  text-black my-6">${pet_name}</h2>
              <div class="flex gap-2 space-y-3 items-center">
                <i class="ri-profile-line  text-gray-500 text-[30px]"></i>
                <p class="text-gray-500">
                 Breed: ${breed}
                </p>
              </div>
              <div class="flex gap-2  items-center">
                <i class="ri-calendar-line text-[30px] text-gray-500"></i>
                <p class="text-gray-500">
                 Birth: ${birth}
                </p>
              </div>
              <div class="flex gap-2  items-center">
                <i class="ri-women-line text-[30px] text-gray-500"></i>
                <p class="text-gray-500">
                  Gender: ${gender}
                </p>
              </div>
              <div class="flex gap-2 items-center">
               <i class="ri-money-dollar-circle-line text-[30px] text-gray-500"></i>
                <p class="text-gray-500">
                 Price : ${price}$
                </p>
              </div>
              <div class="flex gap-2  items-center">
                <i class="ri-women-line text-[30px] text-gray-500"></i>
                <p class="text-gray-500">
                  vaccinated_status: ${vaccinated_status}
                </p>
              </div>
              <p class="flex flex-col gap-4 py-5"><span class="font-bold text-xl">Details Information:</span>
              <span class="text-gray-400">${pet_details}</span></p>
            </div>
            
    <div class="modal-action">
      <form method="dialog" class="w-full">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn w-full">Cancel</button>
      </form>
    </div>
  </div>
</dialog>
  
  `;
  my_modal_5.showModal();
};

// Get Catagrois Functionality
const getCatagories = async () => {
  startLoading();
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/categories`
  );
  const data = await res.json();
  displayCatagories(data.categories);
};

// Catagories Functionality
const displayCatagories = (catagories) => {
  // console.log(catagories);
  const buttonContainer = document.getElementById("pets-button-container");
  catagories.forEach((catagory) => {
    const buttonDiv = document.createElement("div");
    buttonDiv.innerHTML = `
    
    <button id="btn-${catagory.category}" onclick="loadCatagoriesPicture('${catagory.category}')" class="w-full  flex justify-center gap-2 items-center border font-bold text-2xl py-6 px-24 rounded-full pets-btn hover:bg-[#0E7A81] hover:text-white hover:ease-in-out hover:duration-300 transition">
    <img src="${catagory.category_icon}"/> ${catagory.category}
    </button>
    
    `;
    buttonContainer.appendChild(buttonDiv);
  });
};
getCatagories();

// CounDown funtion
function startCountdown() {
  let countdownValue = 3;

  const countdownElement = document.getElementById("countDown");
  countdownElement.innerHTML = countdownValue;

  const countdownInterval = setInterval(() => {
    countdownValue--;
    countdownElement.innerHTML = countdownValue;

    if (countdownValue === 0) {
      clearInterval(countdownInterval);
      document.getElementById("mymodalclose").click();
    }
  }, 1000);
}

const adoptedModal = () => {
  startCountdown();
  my_modal_6.showModal();
};
