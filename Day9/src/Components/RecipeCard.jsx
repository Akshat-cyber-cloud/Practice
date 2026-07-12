import React from 'react'

const RecipeCard = ({meal}) => {
  return (
    <div>
        <img 
            src={meal.strMealThumb}
            alt={meal.strMeal}
            width="200"
        />

        <h2>{meal.strMeal}</h2>
        <p>{meal.strCategory}</p>
    </div>
  )
}

export default RecipeCard