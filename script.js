body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f9;
    color: #333;
    margin: 0;
    padding: 20px;
    transition: background-color 0.3s, color 0.3s;
}

body.dark-mode {
    background-color: #333;
    color: #f4f4f9;
}

.container {
    max-width: 1000px;
    margin: auto;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s;
}

.container.dark-mode {
    background: #444;
    box-shadow: 0 4px 10px rgba(255, 255, 255, 0.1);
}

h1, h2 {
    text-align: center;
}

input {
    display: block;
    margin: 10px 0;
    padding: 8px;
    width: 100%;
}

button {
    padding: 10px 20px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background: #0056b3;
}

.hidden {
    display: none;
}

#timer {
    text-align: center;
    font-size: 20px;
    margin-bottom: 20px;
    color: red;
}

#testQuestions {
    margin-top: 20px;
    background: #f1f1f1;
    padding: 20px;
    border-radius: 8px;
}

#testQuestions div {
    margin-bottom: 20px;
    font-size: 18px;
}

#testQuestions label {
    font-size: 16px;
}

#navigationButtons {
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: flex;
    justify-content: space-between;
    width: 300px;
}

#navigationButtons button {
    width: 90px;
}

#results {
    margin-top: 20px;
    font-size: 18px;
}

#questionsList {
    margin-top: 20px;
}

#questionsList li {
    margin-bottom: 10px;
}

button.toggle {
    background: #28a745;
}

button.toggle:hover {
    background: #218838;
}

button.toggle.dark-mode {
    background: #ffc107;
}

button.toggle.dark-mode:hover {
    background: #e0a800;
}

#darkModeBtn, #fullScreenBtn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    margin-top: 10px;
}