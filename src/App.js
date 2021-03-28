import { cleanup } from '@testing-library/react';
import {BrowserRouter, Link, Switch, Route} from 'react-router-dom'
import {useState} from 'react'
import 'bulma'
import {RecipeList} from './components/RecipeList';

import {HomePage} from './pages/Home';
import {LivePricePage} from './pages/LivePrice';
import {Recipe} from './components/Recipe';

const foodTypes = ["grains", "vegetables", "fruit", "dairy and alternatives", "animal products and alternatives", "sweets", "seasoning and spices", "oils", "nuts and legumes"]

const dairyTypes = ['Almond milk','Brie','Buttermilk','Butter','Cashew milk','Cheddar','Clotted Cream','Coconut milk','Condensed Milk','Cow Milk','Crème Fraîche','Double Cream','Emmental','Evaporated Milk','Feta','Goat Milk','Gouda','Ice Cream','Kefir','Mascarpone','Mozzarella','Oat Milk','Parmesan','Powdered Milk','Rice Milk','Single Cream','Sour Cream','Soy Milk','Whipped Cream','Yogurt','Coconut Milk Yogurt','Hemp Yogurt','Soy Milk Yogurt']
const oilsTypes = ['Avocado Oil','Coconut Oil','Olive Oil','Palm Oil','Peanut Oil','Rice bran Oil','Sesame Oil','Sunflower Oil','Mustard Oil']
const nutsTypes = ['Almonds','Black Beans','Cashews','Chickpeas','Hazelnuts','Kidney Beans','Lentils','Macadamia Nuts','Peanuts','Peas','Pecans','Pine Nuts','Pinto Beans','Pistachios','Soybeans','Walnuts']
const sweetsTypes = ['Chocolate Chips','Dark Chocolate','Gummies','Jam','Jelly Beans','Marshmallows','Milk Chocolate','Nutella','Sprinkles','White Chocolate']
const meatTypes = ['Beef','Chicken','Duck','Eggs','Fish','Goat','Lamb','Plant Based Chicken','Plant Based Sausages','Pork','Rabbit','Sausages','Seafood','Seitan','Tempeh','Tofu','Turkey','Veggie Burgers']

const fruitTypes = [
  'Apple', 
  'Apricot',
  'Banana',
  'Blueberry',
  'Cherry',
  'Fig',
  'Grape',
  'Grapefruit',
  'Guava',
  'Honeydew',
  'Kiwi',
  'Lemon',
  'Lime',
  'Lychee',
  'Mandarin',
  'Mango',
  'Melon',
  'Nectarine',
  'Orange',
  'Passionfruit',
  'Papaya',
  'Peach',
  'Pear',
  'Pineapple',
  'Plum',
  'Pomegranate',
  'Pomelo',
  'Raspberry',
  'Strawberry',
  'Watermelon']

const vegetableTypes = [
  'Asparagus',
  'Avocado',
  'BBQ vegies',
  'Bean',
  'Beetroot',
  'Broccoli',
  'Brussels sprouts',
  'Cabbage',
  'Capsicum',
  'Carrot',
  'Cauliflower',
  'Celery',
  'Chickpea',
  'Chinese broccoli',
  'Chinese cabbage',
  'Corn or sweet corn',
  'Cucumber',
  'Aubergine',
  'Fennel',
  'Lettuce',
  'Mushroom',
  'Onion',
  'Parsnip',
  'Peas',
  'Potato',
  'Pumpkin',
  'Radish',
  'Salsa',
  'Spinach',
  'Squash',
  'Sweet potato',
  'Tabbouleh',
  'Tomato',
  'Turnip',
  'Courgette',
]

const grainTypes = [
  'Brown rice',
  'Corn tortillas',
  'Graham crackers',
  'Oatmeal',
  'Popcorn',
  'Cereals',
  'Bread',
  'Pasta',
  'Bagel',
  'Cornmeal',
  'Crackers',
  'English muffins',
  'French bread',
  'Hamburger',
  'Hot dog buns',
  'Macaroni',
  'Noodles',
  'Pancakes',
  'Waffles',
  'Pretzels',
  'Spaghetti',
  'Flour',
]

const seasoningAndSpices = ['bouillon', 'salt', 'pepper', 'paprika', 'ground ginger', 'sesame', 'seedcream of tartarchili sauce', 'soya sauce', 'apple cider', 'hoisin sauce', 'liquid smoke', 
'rice wine', 'vegetable bouillon', 'poppy seed', 'pintos', 'fish stock', 'rose water', 'champagne vinegar', 'bbq rub', 'jamaican jerk spice', 'accent seasoning', 'pickling spice', 'mustard powder', 'mango powder', 'adobo seasoning', 'kasuri methi', 'caribbean jerk seasoning', 'brine', 'matcha powder', 'cassia']


function App() {

  const [json, setJson] = useState(null)

  function generateCheckboxes(inputs) {
    var newInputs = inputs.map(i => {
      return (<div>
                <input type="checkbox" id={i} name={i} value={i} /> 
                <label for={i}> {i} </label>
              </div>);
    });
    return <div> {newInputs} </div>
  }

  function generateJson() {
    if (json == null) {
      return <div></div>
    }

    const recipes = json.hits
    .sort((hitLeft, hitRight) => hitLeft.recipe.ingredients.length - hitRight.recipe.ingredients.length)
    .map(hit => {
      return <Recipe recipe = {hit.recipe}/>
    });

    return <RecipeList recipes = {recipes} />
  }

  function handleQuery() {
    var allKeywords = fruitTypes.concat(vegetableTypes, grainTypes, seasoningAndSpices, dairyTypes, oilsTypes, nutsTypes, sweetsTypes, meatTypes).filter(keyword => {return document.getElementById(keyword).checked});
    var YOUR_APP_ID = "b8f5078d"
    var YOUR_APP_KEY = "8b94e495d9c68eb626acbe907659aacc"

    const recipeNumberField = document.getElementById("recipeNumber");
    var recipeNumber = 10;
    console.log(recipeNumberField.value)
    if (recipeNumberField.value != "") {
      recipeNumber = recipeNumberField.value
    }

    var query = "https://api.edamam.com/search?q=" + allKeywords.reduce((acc, cur) => acc + " " + cur, "").replaceAll(" ", "+") + `&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}` + `&from=0&to=${recipeNumber}`;
    fetch(query).then(res => res.json()).then(res => setJson(res))
  }
  
  return (
  <div>
    <h1 class = "is-size-1">
      Welcome to *Ready Recipies*</h1>
    <h2 class = "is-size-2"> 
      Please select the desired meal type and ingredients from below 
    </h2>
    <br/>
    <div class = "columns">
      <div class = "column has-background-danger-light">
        <h4 class = "is-size-4"> Fruits </h4>
        {generateCheckboxes(fruitTypes)}
      </div>
      <div class = "column has-background-danger-light">
        <h4 class = "is-size-4"> Vegetables </h4>
        {generateCheckboxes(vegetableTypes)}
      </div>
      <div class = "column has-background-danger-light">
        <h4 class = "is-size-4"> Grains </h4>
        {generateCheckboxes(grainTypes)}
      </div>
      <div class = "column has-background-danger-light">
        <h4 class = "is-size-4"> Seasonings and Spices </h4>
        {generateCheckboxes(seasoningAndSpices)}
      </div>

      <div class = "column has-background-danger-light">
        <h4 class = "is-size-4"> Dairy Types </h4>
        {generateCheckboxes(dairyTypes)}
      </div>
      <div class = "column has-background-danger-light">
        <h4 class = "is-size-4"> Oils Types </h4>
        {generateCheckboxes(oilsTypes)}
      </div>
      <div class = "column has-background-danger-light">
        <h4 class = "is-size-4"> Nuts Types </h4>
        {generateCheckboxes(nutsTypes)}
      </div>
      <div class = "column has-background-danger-light">
        <h4 class = "is-size-4"> Sweet Types </h4>
        {generateCheckboxes(sweetsTypes)}
      </div>
      <div class = "column has-background-danger-light">
        <h4 class = "is-size-4"> Meat Types </h4>
        {generateCheckboxes(meatTypes)}
      </div>
    </div>
    <label for="recipeNumber"> Number of results: </label>
    <input type="number" id="recipeNumber" name="recipeNumber"/>
    <button onClick = {handleQuery} > Submit </button>
    {generateJson()}
  </div>
  )
}

export default App;
