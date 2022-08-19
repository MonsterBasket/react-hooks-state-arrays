import React, { useState } from "react";
import { spicyFoods, getNewSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  // const allFoods = [...foods]; //doesn't work, each time you re-render the screen it refreshes the script, so allFoods will always be blasted and match foods.
  const [filterBy, setFilterBy] = useState("All")

  const foodsToDisplay = foods.filter((food) => {
    if (filterBy === "All"){
      return true;
    }
    else{
      return food.cuisine === filterBy;
    }
  })

  function addFood() {
    if (foods.length === 5) return; //hard coded limit because getNewSpicyFood() is a dumb function.
    const newFoods = [...foods, getNewSpicyFood()];
    setFoods(newFoods);
  }

  function removeItem(id){
    setFoods(foods.filter(item => item.id !== id));
    console.log(foods.filter(item => item.id !== id))
  }

  function increaseHeat(id){
    const updatedFoods = [...foods]
    updatedFoods.find(a => a.id === id).heatLevel ++;
    setFoods(updatedFoods);
  }

  // function setFilter(e){
  //   let updatedFoods = [...allFoods];
  //   if (e.target.value !== "All"){
  //     updatedFoods = allFoods.filter(item => item.cuisine === e.target.value)
  //   }
  //     setFilterBy(updatedFoods);  
  // }
  function setFilter(e){
    setFilterBy(e.target.value);
  }

  return (
    <div>
      <button onClick={addFood}>Add New Food</button>
      <select name="filter" onChange={setFilter}>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
      <ul>{
        foodsToDisplay.map(item => <li key={item.id} id={item.id} onClick={_ => /*removeItem(item.id)*/ increaseHeat(item.id)}>{`${item.name} - ${item.cuisine} ${"🌶️".repeat(item.heatLevel)}`}</li>)
      }</ul>
    </div>
  );
}

export default SpicyFoodList;