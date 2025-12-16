const randomMealApi = "https://www.themealdb.com/api/json/v1/1/random.php";
const mealButton = document.querySelector(".meal-btn");
const mealOfDayDiv = document.querySelector(".meal-of-the-day_div");
const mealImage = document.querySelector(".meal-image");
const mealName = document.querySelector(".meal-of-the-day-title");
const mealSection = document.querySelector(".meal-section");
const mealDetailsDiv = document.querySelector(".meal-details-div");
const mealDetailBtn = document.querySelector(".detail-btn");
let currentMeal = null;

const fetchRandomMeal = async () => {
  try {
    const response = await fetch(randomMealApi);

    if (!response.ok) {
      throw new Error("Sry, there is a Network issue");
    }

    const randomMealData = await response.json();
    //console.log(randomMealData)
    console.log(randomMealData.meals[0])
    //console.log(randomMealData.meals[0].strMeal);

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

mealButton.addEventListener("click", () => {
  showMealOfDay();
  fetchRandomMeal();
})
const arrowIcon = document.getElementById("hidden");
mealDetailBtn.addEventListener("click", () => {
  showMealDetails();
  fetchMealDetails();

  arrowIcon.style.display = "block";
  arrowIcon.style.margin = "20px";
})

