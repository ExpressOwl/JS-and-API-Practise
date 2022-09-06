const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('container');
let searchQuery = '';
const APP_ID = '46c6aec1';
const APP_key = '89fefa3f2b2585ca0e8d55eafa74c846';

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector('input').value;
  fetchAPI();
})

async function fetchAPI (){
  const baseURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=46c6aec1&app_key=89fefa3f2b2585ca0e8d55eafa74c846`;
  const response = await fetch(baseURL);
  const data = await response.json();
  generateHTML(data.hits);
  console.log(data);
}

function generateHTML(results){
  let generatedHTML = '';
  results.map(result => {
    generatedHTML += 
    `
    <div class="item">
    <img src="${result.recipe.image}" alt="">
    <div class="flex-container">
      <h1 class="title">${result.recipe.label}</h1>
      <a class="view-button" href="${result.recipe.url}" target="_blank">View Recipe</a>
    </div>
    <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
    <p class="item-data">Diet Label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : 'No Data Found' }</p>
    <p class="item-data">Health Label: ${result.recipe.healthLabels}</p>
    </div>
    `
  })
  searchResultDiv.innerHTML = generatedHTML;
}
