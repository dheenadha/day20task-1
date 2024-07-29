document.addEventListener('DOMContentLoaded', function () {
    fetchBreeds();
    fetchDogImages();

    document.getElementById('newDogBtn').addEventListener('click', fetchDogImages);
    document.getElementById('breedSelect').addEventListener('change', fetchDogImages);
});


 // Fetches a list of dog breeds and populates the breed select dropdown.
function fetchBreeds() {
    fetch('https://dog.ceo/api/breeds/list/all')
        .then(response => response.json())
        .then(data => {
            const breedSelect = document.getElementById('breedSelect');
            const breeds = Object.keys(data.message);
            breeds.forEach(breed => {
                const option = document.createElement('option');
                option.value = breed;
                option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
                breedSelect.append(option);
            });
        })
        .catch(error => console.error('Error fetching breeds:', error));
}


//Fetches random dog images (or images of a selected breed) and updates the DOM.

function fetchDogImages() {
    const breed = document.getElementById('breedSelect').value;
    const url = breed ? `https://dog.ceo/api/breed/${breed}/images/random/3` : 'https://dog.ceo/api/breeds/image/random/3';


    fetch(url)
        .then(response => response.json())
        .then(data => {
            const imagesContainer = document.getElementById('dogImages');
            imagesContainer.innerHTML = '';

            data.message.forEach(imageUrl => {
                const img = document.createElement('img');
                img.src = imageUrl;
                img.className = 'img-fluid';
                imagesContainer.append(img);
            });
        })
        .catch(error => {
            console.error('Error fetching dog images:', error);
        });
}




