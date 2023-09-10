import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_mfie1o5oye1qpXLITVDU5HcZrii0Sq5vTF8i6b8uOvhNZjID7WKceWhqNDU7s5WN";


const url = 'https://api.thecatapi.com/v1';


export function fetchBreeds() { 
return axios.get(`${url}/breeds`)
  .then((res) => {
     return res.data;
  })
  .catch((error) => {
     throw new Error(error.message);
  });
};


export function fetchCatByBreed(breedId) {
    return axios.get(`${url}/images/search?breed_ids=${breedId}`)
      .then(response => response.data)
      .catch(error => {
         throw new Error(error.message);
        });
};