"use strict";

function App() {
    const [lyricSnippet, setLyricSnippet] = React.useState('');
    const [userGuess, setUserGuess] = React.useState('');
    const [result, setResult] = React.useState('');
    const [isDarkMode, setIsDarkMode] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);  // Fixed this

    const generateLyricSnippet = async () => {
        setIsLoading(true);  // Disable buttons
        try {
            const response = await fetch(`${window.location.origin}/api/generate`);
            const data = await response.json();
            setLyricSnippet(data.snippet);
            localStorage.setItem('correctSongTitle', data["song_title"]);
            setUserGuess('');  // Clear previous guess
            setResult('');
        } catch (error) {
            setResult("Failed to generate lyric snippet.");
        }
        setIsLoading(false);  // Enable buttons
    };

    const checkAnswer = () => {
        const correctTitle = localStorage.getItem('correctSongTitle');
        if (correctTitle === null) {
            setResult("Please click on Generate Lyric Snippet first!");
            setLyricSnippet('');
            setUserGuess('');
            return;
        }
    
        const formattedGuess = userGuess.trim().toLowerCase();
        const formattedTitle = correctTitle.trim().toLowerCase();
    
        if (formattedGuess === formattedTitle) {
            setResult("Correct!");
            localStorage.clear();
        } else {
            setResult(`Wrong! The correct title was '${correctTitle}'.`);
            localStorage.clear();
        }
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        if (isDarkMode) {
            document.body.classList.add("light-mode");
        } else {
            document.body.classList.remove("light-mode");
        }
    };

    return (
        <div className="app-poster-container">
            <div className="app-container">
                <h1 style={{ padding: "10px 10px" }}>Lyric <span style={{ color: "#ff6f61"}}>Match</span></h1>
                <button
                    className={`toggle-btn ${isDarkMode ? "dark" : "light"}`}
                    onClick={toggleDarkMode}
                >
                    {isDarkMode ? "☀️" : "🌘"}
                </button>
                <button className="btn generate-button" onClick={generateLyricSnippet} disabled={isLoading}>
                    {isLoading ? "Loading..." : "Generate Lyric Snippet"}
                </button>
                <div 
                    style={{
                        margin: "5px",
                        padding: "15px 20px",
                        fontSize: "16px"
                    }}
                    className="lyric-snippet">{lyricSnippet}</div>
                <input
                    style={{
                        margin: "5px",
                        padding: "7px 20px",
                        fontSize: "16px"
                    }}
                    type="text"
                    className="guess-input"
                    placeholder="Enter your guess..."
                    value={userGuess}
                    onChange={(e) => setUserGuess(e.target.value)}
                />
                <button className="btn check-button" onClick={checkAnswer} disabled={isLoading || !lyricSnippet}>
                    Check Answer
                </button>
                <div 
                    style={{
                        margin: "5px",
                        padding: "10px 20px",
                        fontSize: "16px"
                    }}
                    className="result-display">{result}</div>
            </div>
            <div className="poster-container">
                <img src="music-poster.jpg" alt="Music Poster" />
            </div>
        </div>
    );    
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
