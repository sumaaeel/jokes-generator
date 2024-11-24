import { useEffect } from "react";
import { useState } from "react"

const Joke = () => {
    const [jokes, setJokes] = useState([])
    const [joke, setJoke] = useState(null)
    const [isLoading, setisLoading] = useState(false)
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const data = await fetch('https://api.sampleapis.com/jokes/goodJokes');
                const result = await data.json()
                setJokes(result);
            } catch (error) {
                console.error("error fetching jokes", error);
            } finally {
                setisLoading(false)
            }
        }
        fetchApi()
    }, []);
    const generateJoke = () => {
        if (jokes.length === 0) return alert("No Jokes Available");
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        setJoke(randomJoke)
    }

    return (
        <>
            <button onClick={generateJoke} disabled={isLoading}>{isLoading ? "Loading Jokes" : "Generate Joke"}</button>
            {joke && (
                <div>
                    <p><strong>Setup:</strong> {joke.setup}</p>
                    <p><strong>Punchline:</strong> {joke.punchline}</p>
                </div>
            )}

        </>
    )
}

export default Joke
