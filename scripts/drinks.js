const btnAlcoholic = document.getElementById("btn-alc");
const btnNonAlcoholic = document.getElementById("btn-non-alc");
const btnChefSpecial = document.getElementById("btn-chef-spec");
const mainContent = document.querySelector(".main-content");
const drinksContainer = document.getElementById("drinks_container");
const input = document.getElementById("input");
const ingredient = document.getElementById("ingredient");

const getAlcoholicDrink = async () => {
  console.log("clicked");

  drinksContainer.innerHTML = "";

  try {
    const response = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic"
    );
    const data = await response.json();
    const drinks = data.drinks.slice(0, 10);
    drinks.forEach((drink) => {
      console.log(drink);
      const display = document.createElement("div");
      display.classList.add("display");
      display.innerHTML = `<img src='${drink.strDrinkThumb}'
      <p>${drink.strDrink}</p>`;
      drinksContainer.appendChild(display);
    });
  } catch (error) {
    console.log("Error:", error);
  }
};

const getNonAlcoholicDrink = async () => {
  console.log("clicked");
  drinksContainer.innerHTML = "";

  try {
    const res = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic"
    );
    const data = await res.json();
    const drinks = data.drinks.slice(0, 10);
    drinks.forEach((drink) => {
      console.log(drink.strDrink);
      const display = document.createElement("div");

      display.innerHTML = `<img src=${drink.strDrinkThumb}>
      <p>${drink.strDrink}</p>`;
      drinksContainer.appendChild(display);
    });
  } catch (error) {
    console.log("Error:", error);
  }
};

const getChefSpecial = async () => {
  console.log("clicked");

  drinksContainer.innerHTML = "";

  try {
    const res = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );
    const data = await res.json();
    const randomDrink = data.drinks[0].strDrink;
    const newSrc = data.drinks[0].strDrinkThumb;
    console.log(randomDrink);
    console.log(newSrc);

    const display = document.createElement("div");

    display.innerHTML = `<img src=${data.drinks[0].strDrinkThumb}>
      <p>${data.drinks[0].strDrink}</p>`;
    drinksContainer.appendChild(display);
  } catch (error) {
    console.log("Error:", error);
  }
};

const baseUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const getDrink = async () => {
  drinksContainer.innerHTML = "";

  let searchValue = input.value.trim();
  if (!searchValue) return;

  const api = `${baseUrl}${searchValue}`;

  try {
    const response = await fetch(api);
    const data = await response.json();

    if (!data.drinks) {
      drinksContainer.innerHTML = "<p>No drinks found</p>";
      return;
    }

    const drink = data.drinks[0];

    const display = document.createElement("div");
    display.classList.add("display");
    display.innerHTML = `<img src="${drink.strDrinkThumb}">
      <p>${drink.strDrink}</p>`;
    drinksContainer.appendChild(display);

    saveDrinkSearch(searchValue);
    loadDrinkSearches();
  } catch (error) {
    console.log("Error:", error);
  }
};

function saveDrinkSearch(searchValue) {
  let searches =
    JSON.parse(localStorage.getItem("drinkSearches")) || [];

  const normalized = searchValue.toLowerCase();

  if (!searches.includes(normalized)) {
    searches.unshift(normalized);
  }

  searches = searches.slice(0, 5); // max 5 st

  localStorage.setItem("drinkSearches", JSON.stringify(searches));
}


btnAlcoholic.addEventListener("click", getAlcoholicDrink);
btnNonAlcoholic.addEventListener("click", getNonAlcoholicDrink);
btnChefSpecial.addEventListener("click", () => {
  ingredient.classList.remove("hide");
  getChefSpecial();
});

const getIngredient = async () => {
  drinksContainer.innerHTML = "";
  try {
    const response = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );
    const data = await response.json();
    const ingredient1 = data.drinks[0].strIngredient1;
    const ingredient2 = data.drinks[0].strIngredient2;
    const ingredient3 = data.drinks[0].strIngredient3;
    const ingredient4 = data.drinks[0].strIngredient4;
    console.log(ingredient1);
    console.log(ingredient2);
    console.log(ingredient3);
    console.log(ingredient4);

    if (!ingredient) {

      return;
    }

    const displayList = document.createElement('div');
    displayList.innerHTML = `
  ${data.drinks[0].strIngredient1 ? `<p>${data.drinks[0].strIngredient1}</p>` : ''}
  ${data.drinks[0].strIngredient2 ? `<p>${data.drinks[0].strIngredient2}</p>` : ''}
  ${data.drinks[0].strIngredient3 ? `<p>${data.drinks[0].strIngredient3}</p>` : ''}
  ${data.drinks[0].strIngredient4 ? `<p>${data.drinks[0].strIngredient4}</p>` : ''}
  `
    drinksContainer.appendChild(displayList);

  }
  catch (error) {
    console.log('Error:', error);
  }
};

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getDrink();

  }
});

ingredient.addEventListener("click", () => {
  ingredient.classList.add('hide');
  getIngredient();
});

function loadDrinkSearches() {
  const searches =
    JSON.parse(localStorage.getItem("drinkSearches")) || [];

  const list = document.getElementById("drinkSearchList");
  list.innerHTML = "";

  searches.forEach(search => {
    const p = document.createElement("p");
    p.textContent = search;
    p.classList.add("search-item");

    p.addEventListener("click", () => {
      input.value = search;
      getDrink();
    });

    list.appendChild(p);
  });
}
loadDrinkSearches();