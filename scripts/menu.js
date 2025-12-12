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

      btn.addEventListener("click", () => loadMealsByCategory(cat.strCategory));

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

    data.meals.forEach(meal => {
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
