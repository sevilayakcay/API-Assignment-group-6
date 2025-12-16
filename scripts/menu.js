async function loadCategories() {
  try {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    const data = await response.json();
    if (!response.ok) throw new Error(`Network reponse was not ok`);

    const container = document.getElementById("categoryButtons");

    data.categories.forEach(cat => {
      const btn = document.createElement("button");
      btn.className = "button meal-btn";
      btn.textContent = cat.strCategory;

      btn.addEventListener("click", () => {
        const allBtns = container.querySelectorAll(".button");
        allBtns.forEach(b => b.classList.remove("active"));

        btn.classList.add("active");

        loadMealsByCategory(cat.strCategory);
      });

      container.appendChild(btn);
    });
  } catch (error) {
    console.error("Failed to load categories:", error);
  }
}

async function loadMealsByCategory(category) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await response.json();
    if (!data.meals) {
      throw new Error(`No meals found for category: ${category}`);
    }

    const mealList = document.getElementById("mealList");
    mealList.innerHTML = "";

    const shuffled = data.meals.sort(() => 0.5 - Math.random());
    const mealsToShow = shuffled.slice(0, 10);

    mealsToShow.forEach(meal => {
      const card = document.createElement("div");
      card.className = "meal-card";

      card.innerHTML = `
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
              <h3>${meal.strMeal}</h3>
            `;

      mealList.appendChild(card);
    });
  } catch (error) {
    console.error("Food could not upload:", error);
  }
}

loadCategories();

const mealInput = document.getElementById("MealInput");
const mealSuggestions = document.getElementById("suggestions");
const mealList = document.getElementById("mealList");

let debounceTimeout;

mealInput.addEventListener("input", () => {
  clearTimeout(debounceTimeout);
  t;
  debounceTimeout = setTimeout(() => {
    const mealNameInput = mealInput.value.trim();
    fetchMeals(mealNameInput);
  }, 500); // 500ms bekle, kullanıcı yazmayı bitirsin
});

async function fetchMeals(mealNameInput) {
  if (!mealNameInput) {
    mealSuggestions.innerHTML = "";
    return;
  }

  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealNameInput}`);
    if (!response.ok) throw new Error("Network error");

    const data = await response.json();
    if (!data.meals) {
      mealSuggestions.innerHTML = "";
      return;
    }

    const limitedMeals = data.meals.slice(0, 2);
    mealSuggestions.innerHTML = "";

    limitedMeals.forEach(meal => {
      const suggestionItem = document.createElement("div");
      suggestionItem.className = "suggestion-item";

      suggestionItem.innerHTML = `<img src="${meal.strMealThumb}" alt="${meal.strMeal}" />`;

      suggestionItem.addEventListener("click", () => {
        mealInput.value = meal.strMeal;
        mealSuggestions.innerHTML = "";
        displayMeals([meal]);
      });

      mealSuggestions.appendChild(suggestionItem);
    });
  } catch (error) {
    console.error(error);
  }
}

const displayMeals = meals => {
  mealList.innerHTML = "";
  meals.forEach(meal => {
    const mealCard = document.createElement("div");
    mealCard.className = "meal-card";
    mealCard.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <h3>${meal.strMeal}</h3>
    `;
    mealList.appendChild(mealCard);
  });
};
