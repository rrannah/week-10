document.addEventListener("DOMContentLoaded", function () {
  populateBreedOptions();
  getCatImage(); // Initial load
});

function populateBreedOptions() {
  var breedSelect = document.getElementById('breedSelect');
  var apiUrl = 'https://api.thecatapi.com/v1/breeds';

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      data.forEach(breed => {
        var option = document.createElement('option');
        option.value = breed.id;
        option.text = breed.name;
        breedSelect.add(option);
      });
    })
    .catch(error => console.error('Error:', error));
}

function getCatImage() {
  var breedSelect = document.getElementById('breedSelect');
  var selectedBreed = breedSelect.value;

  var apiUrl;

  if (selectedBreed === 'random') {
    apiUrl = 'https://api.thecatapi.com/v1/images/search';
  } else {
    apiUrl = 'https://api.thecatapi.com/v1/images/search?limit=1&breed_ids=' + selectedBreed;
  }

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      var catImage = document.getElementById('catImage');
      var breedInfo = document.getElementById('breedInfo');

      catImage.src = data[0].url;
      catImage.alt = 'Cat Image';

      if (data[0].breeds.length > 0) {
        var breed = data[0].breeds[0];
        breedInfo.innerHTML = `
          <h2>${breed.name}</h2>
          <p><strong>Origin:</strong> ${breed.origin}</p>
          <p><strong>Temperament:</strong> ${breed.temperament}</p>
          <p><strong>Life Span:</strong> ${breed.life_span} years</p>
          <p><strong>Wikipedia:</strong> <a href="${breed.wikipedia_url}" target="_blank">Learn more</a></p>
        `;
      } else {
        breedInfo.innerHTML = ''; // Clear breed info if not available
      }
    })
    .catch(error => console.error('Error:', error));
}
