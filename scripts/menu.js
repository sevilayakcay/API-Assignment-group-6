//alert("menu!");

const button=document.querySelector('.meal-btn');
const mainPara=document.querySelector('.main-para');
const dish_img=document.getElementById('dish_img')


button.addEventListener('click',async()=>{



  try{

    const response= await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data=await response.json();
    const strMealContent =data.meals[0].strMeal;
    const strThumb=data.meals[0].strMealThumb;
    mainPara.textContent=strMealContent;
    dish_img.src=strThumb;
    console.log(strMealContent);
    console.log(strThumb);

  }

catch(error){

  console.log('ERROR:' ,error);
  
}

});
