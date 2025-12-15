//alert("drinks!");
const btnAlcoholic = document.getElementById("btn-alc");
const btnNonAlcoholic = document.getElementById("btn-non-alc");
const btnChefSpecial = document.getElementById("btn-chef-spec");
const mainContent = document.querySelector(".main-content");
const drinksContainer = document.getElementById("drinks_container");
const input = document.getElementById("input");

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
    const drinks = data.drinks.strDrink;

    const display = document.createElement("div");

    display.innerHTML = `<img src=${drinks.strDrinkThumb}>
      <p>${drinks.strDrink}</p>`;
    drinksContainer.appendChild(display);
  } catch (error) {
    console.log("Error:", error);
  }
};

const baseUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const getDrink = async () => {
  drinksContainer.innerHTML = "";
  let searchValue = input.value;
  searchValue = searchValue.trim();
  if (!searchValue) 
  return;
  const api = `${baseUrl}${searchValue}`;
  try {
    const response = await fetch(api);
    if(!response.ok){

      throw new Error ('Network response was not ok');
    }
    const data = await response.json();
    
    const display = document.createElement("div");
    display.innerHTML = `<img src='${data.drinks[0].strDrinkThumb}'
    <p>${data.drinks[0].strDrink}</p>`;
    drinksContainer.appendChild(display);
  } catch (error) {
    console.log("Error:", error);
  }
};

btnAlcoholic.addEventListener("click", getAlcoholicDrink);
btnNonAlcoholic.addEventListener("click", getNonAlcoholicDrink);
btnChefSpecial.addEventListener("click", getChefSpecial);
input.addEventListener("keyup", getDrink);
