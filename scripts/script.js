const randomMealApi = "https://www.themealdb.com/api/json/v1/1/random.php";
const mealButton = document.querySelector(".meal-btn");
const mealOfDayDiv = document.querySelector(".meal-of-the-day_div");
const mealImage = document.querySelector(".meal-image");
const mealName = document.querySelector(".meal-of-the-day-title");
const mealSection = document.querySelector(".meal-section");
const mealDetailsDiv = document.querySelector(".meal-details-div");
const mealDetailBtn = document.querySelector(".detail-btn");
const arrowIcon = document.getElementById("hidden");
const mealSearchInput = document.querySelector(".searchInput");
const mealList = document.getElementById("mealList");
const searchList = document.querySelector(".search-list");
let currentMeal = null;

const fetchRandomMeal = async () => {
  try {
    const response = await fetch(randomMealApi);

    if (!response.ok) {
      throw new Error("Sry, there is a Network issue");
    }

    const randomMealData = await response.json();
    currentMeal = randomMealData.meals[0];

    mealImage.setAttribute("src", currentMeal.strMealThumb);
    mealName.textContent = randomMealData.meals[0].strMeal;
  }
  catch (error) {
    console.log("Error fetching random meal: ", error);
  }
}

const showMealOfDay = () => {
  mealOfDayDiv.classList.remove("hidden");
  mealSection.classList.add("hidden")
}

const showMealDetails = () => {
  mealSection.classList.remove("hidden");
}

const fetchMealDetails = () => {
  if (!currentMeal) return;
  const ingredients = [];
  const instructions = currentMeal.strInstructions;
  for (let i = 1; i <= 20; i++) {
    const ingredient = currentMeal[`strIngredient${i}`];
    const measure = currentMeal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(`${measure ? measure : ""} ${ingredient}`.trim());
    }
  }

  const instructionLines = instructions
    .split("\r\n")
    .filter(line => line.trim() !== "");


  mealDetailsDiv.innerHTML = `
    <h3>Ingredients</h3>
    <div>
      ${ingredients.map(i => `<p>${i}</p>`).join("")}
    </div>
    </br>
    <h3>Instructions</h3>
    <div>
      ${instructionLines.map(step => `<p>${step}</p></br>`).join("")}
    </div>
  `;
}

mealSearchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const query = searchInput.value.trim();
    if (!query) return;

    fetchMeals(query);
    saveSearch(query);
  }
});

async function fetchMeals(searchTerm) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
    );

    const data = await response.json();

    if (!data.meals) {
      displayNoResults();
      return;
    }

    renderMeals([data.meals[0]]);
  } catch (error) {
    console.error("Error fetching meals:", error);
  }
}

function renderMeals(meals) {

  mealList.innerHTML = meals
    .map(
      meal => `
      <h3>Searched meal</h3>
      <p class="mealSearch-title">${meal.strMeal}</p>`
    )
    .join("");
  loadSearches();
}

function displayNoResults() {
  mealList.innerHTML = "<p>No meal found 😢</p>";
}

function saveSearch(searchTerm) {
  let searches = JSON.parse(localStorage.getItem("mealSearches")) || [];

  const normalized = searchTerm.toLowerCase();

  if (!searches.includes(normalized)) {
    searches.unshift(normalized);
  }

  searches = searches.slice(0, 5);

  localStorage.setItem("mealSearches", JSON.stringify(searches));
}

function loadSearches() {
  const searches = JSON.parse(localStorage.getItem("mealSearches")) || [];

  searchList.innerHTML = "";

  searches.forEach(search => {
    const p = document.createElement("p");
    p.textContent = search;
    searchList.appendChild(p);
    p.addEventListener("click", () => {
      searchInput.value = search;
      fetchMeals(search);
    });
  });
}

loadSearches();

mealButton.addEventListener("click", () => {
  showMealOfDay();
  fetchRandomMeal();

  arrowIcon.style.display = "none";
})

mealDetailBtn.addEventListener("click", () => {
  showMealDetails();
  fetchMealDetails();

  arrowIcon.style.display = "block";
  arrowIcon.style.margin = "20px";
})

