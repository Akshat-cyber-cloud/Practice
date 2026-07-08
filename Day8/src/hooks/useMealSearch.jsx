import { useState, useEffect } from 'react'

const useMealSearch = (searchTerm) => {

    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!searchTerm) {
            setMeals([]);
            return;
        }

        async function fetchMeals() {
            setLoading(true);
            setError("");

            try {
                const response = await fetch(
                    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
                )

                const data = await response.json();

                setMeals(data.meals || [])
            } catch (err) {
                setError("Something went Wrong");
            } finally {
                setLoading(false);
            }
        }

        fetchMeals();
    }, [searchTerm]);
    return { meals, loading, error };
}

export default useMealSearch