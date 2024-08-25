import React, { useState } from 'react';
import './App.css'; // Import CSS 


// the main function of react
function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Check if inp is valid JSON
            const parsedInput = JSON.parse(jsonInput);

            if (!Array.isArray(parsedInput.data)) {
                throw new Error("Invalid JSON structure: 'data' should be an array.");
            }

            // Call the backend API 
            const res = await fetch('http://localhost:5000/bfhl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(parsedInput),
            });

            const data = await res.json();
            setResponse(data);
            setError(null); 
        } catch (err) {
            setError(`Invalid JSON input: ${err.message}`);
            setResponse(null); 
        }
    };

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const renderResponse = () => {
        if (!response) return null;

        switch (selectedOption) {
            case 'Alphabets':
                return <div className="response-item">Alphabets: {JSON.stringify(response.alphabets)}</div>;
            case 'Numbers':
                return <div className="response-item">Numbers: {JSON.stringify(response.numbers)}</div>;
            case 'Highest lowercase alphabet':
                return <div className="response-item">Highest Lowercase Alphabet: {JSON.stringify(response.highest_lowercase_alphabet)}</div>;
            default:
                return null;
        }
    };

    return (
        <div className="app-container">
            <h1>BFHL Challenge</h1>
            <form className="input-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='Enter JSON'
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                />
                <button type="submit" className="submit-button">Submit</button>
            </form>
            {error && <div className="error-message">{error}</div>}
            {response && (
                <div className="response-container">
                    <label htmlFor="options" className="dropdown-label">Select what to display:</label>
                    <select id="options" value={selectedOption} onChange={handleOptionChange} className="dropdown">
                        <option value="">--Select--</option>
                        <option value="Alphabets">Alphabets</option>
                        <option value="Numbers">Numbers</option>
                        <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
                    </select>
                    <div className="response-display">{renderResponse()}</div>
                </div>
            )}
        </div>
    );
}

export default App;
