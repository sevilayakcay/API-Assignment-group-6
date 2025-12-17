//alert("drinks!");
const btnAlcoholic = document.getElementById("btn-alc");
const btnNonAlcoholic = document.getElementById("btn-non-alc");
const btnChefSpecial = document.getElementById("btn-chef-spec");
const mainContent = document.querySelector(".main-content");
const drinksContainer = document.getElementById("drinks_container");
const input = document.getElementById("input");
const ingredient = document.getElementById("ingredient");
const searchHistory=document.getElementById('search_history');
const clearIcon=document.getElementById('clear_icon');

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


  const p =document.createElement('p');
  p.innerHTML=   localStorage.getItem('searchItem');
  searchHistory.appendChild(p);
  drinksContainer.innerHTML = "";
  let searchValue = input.value;
  searchValue = searchValue.trim();
  localStorage.setItem('searchItem',input.value);
  localStorage.getItem('searchItem');
  console.log(localStorage.getItem('searchItem'));
 
  if (!searchValue) return;
  const api = `${baseUrl}${searchValue}`;
  try {
    const response = await fetch(api);
    if (!response.ok) {
      throw new Error("Network response was not ok");
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

// const getIngredient()

btnAlcoholic.addEventListener("click", getAlcoholicDrink);
btnNonAlcoholic.addEventListener("click", getNonAlcoholicDrink);
btnChefSpecial.addEventListener("click", () => {
  ingredient.classList.remove("hide");
  getChefSpecial();
});

const getIngredient = async () => {
  // drinksContainer.innerHTML = "";

  try{

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

  if(!ingredient){

    return;
  }

  const displayList=document.createElement('div');
  displayList.innerHTML=`
  ${data.drinks[0].strIngredient1 ? `<p>${data.drinks[0].strIngredient1}</p>`:''}
  ${data.drinks[0].strIngredient2 ? `<p>${data.drinks[0].strIngredient2}</p>`:''}
  ${data.drinks[0].strIngredient3 ? `<p>${data.drinks[0].strIngredient3}</p>`:''}
  ${data.drinks[0].strIngredient4 ? `<p>${data.drinks[0].strIngredient4}</p>`:''}
  `

  
  drinksContainer.appendChild(displayList);

  }
  
  catch(error){

    console.log('Error:',error);
  }

};
input.addEventListener("keyup", getDrink);
ingredient.addEventListener("click",()=>{

ingredient.classList.add('hide');
  getIngredient();

} );


// const updateClearIcon=()=>{

// if(searchHistory.children.length>0){

//     clearIcon.classList.add('show');
//   }
//   else{

//     clearIcon.classList.remove('show');
//   }
// }

const clearLocalStorage=()=>{

  searchHistory.innerHTML='';
  localStorage.removeItem('searchItem');


  
  
  
  
}

clearIcon.addEventListener('click',()=>{

  console.log('clicked');

  clearLocalStorage();
  
  
})
