import React from "react";
import { useState, useEffect } from "react";

const GitHub = () => {
    const [user, setUser] = useState(null);
    const [joke, setJoke] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const res = await fetch('https://api.github.com/users/octocat')
            console.log(res);
            const data = await res.json();
            setUser(data);
        }

        const fetchJoke = async () => {
            const sec = await fetch('https://official-joke-api.appspot.com/random_joke')
            const data = await sec.json();
            setJoke(data);
        }

        getUser()
        fetchJoke()
    }, []);

    return (
        <div>
            {user && <h1>{user.name}</h1>}
            {joke && <h1>{joke.punchline}</h1>}
        </div>
    )
}

export default GitHub;