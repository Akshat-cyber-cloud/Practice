import React from 'react'
import SearchBar from '../Components/SearchBar'
import useMealSearch from '../hooks/useMealSearch'
import { useState } from 'react'
import RecipeCard from '../Components/RecipeCard'

const Home = () => {

    const[searchTerm,setSearchTerm] = useState("");
    const {meals , loading, error} = useMealSearch(searchTerm);

  return (
    <div>
        <h1>Recipe Founder</h1>
        <SearchBar 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
        />

        <p>You Searched: {searchTerm}</p>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        {
            meals.map((meal) => (
                <RecipeCard 
                    key={meal.idMeal}
                    meal={meal}
                />
            ))
        }
    </div>
  )
}

export default Home