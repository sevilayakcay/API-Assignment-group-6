const randomMealApi = "https://www.themealdb.com/api/json/v1/1/random.php";
const mealOfDayDiv = document.querySelector(".meal-of-the-day_div");
const mealButton = document.querySelector(".meal-btn");
const mealImage = document.querySelector(".meal-image");
const mealName = document.querySelector(".meal-of-the-day-title");
const fetchRandomMeal = async () => {
  try {
    randomMealApi;
    const response = await fetch(randomMealApi);

    if (!response.ok) {
      throw new Error("Sry, there is a Network issue");
    }

    const randomMealData = await response.json();
    console.log(randomMealData)
    console.log(randomMealData.meals[0].strMeal);
    mealImage.setAttribute("src", randomMealData.meals[0].strMealThumb);
    mealImage.setAttribute("height", 200);
    mealImage.setAttribute("width", 200);
    mealName.textContent = randomMealData.meals[0].strMeal;
  }
  catch (error) {
    console.log("Error fetching random meal: ", error);
  }
}

const showMealOfDay = () => {
  mealOfDayDiv.classList.remove("hidden");
}

mealButton.addEventListener("click", () => {
  showMealOfDay();
  fetchRandomMeal();
})