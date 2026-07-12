import React, { useState } from 'react'
import SearchBar from '../Components/SearchBar';
import useMealSearch from '../Hooks/useMealSearch';
import RecipeCard from '../Components/RecipeCard';

const Home = () => {

    const[searchTerm, setSearchTerm] = useState("");
    const {meals, loading , error} = useMealSearch(searchTerm);

  return (
    <div>
        <h1>Recipe Finder</h1>
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