import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from "./cat-api";


const breedsMenu = document.querySelector(".breed-select");
const errorMsg = document.querySelector(".error");
const loadMsg = document.querySelector(".loader"); 
const catInfo = document.querySelector(".cat-info"); 


breedsMenu.style.width = '300px';
errorMsg.style.display = "none";
loadMsg.style.display = "none";
breedsMenu.innerHTML = '';


fetchBreeds()
  .then(breedList => {
    breedsMenu.innerHTML = breedList.map(option => `
      <option value="${option.id}">${option.name}</option>
    `).join('');
    new SlimSelect({
      select: breedsMenu,
    });
  })
  .catch(() => {
    Notify.failure(errorMsg.textContent, {position: 'center-center', width: '400px'});
  });


breedsMenu.addEventListener("change", onSelectBreed);


function onSelectBreed() {
  const selectedBreedId = breedsMenu.value;
  loadMsg.style.display = "block";

  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      const { url, breeds } = catData[0];

      catInfo.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="500"/></div>
        <div class="box">
          <h1>${breeds[0].name}</h1>
          <p>${breeds[0].description}</p>
          <p><b>Temperament:</b> ${breeds[0].temperament}</p>
        </div>`;
      loadMsg.style.display = "none";
    })
    
    .catch(() => {
      Notify.failure(errorMsg.textContent, {position: 'center-center', width: '400px'});
    });
};