let questions = [];
let currentQuestionIndex = 0;
let timerInterval;
let remainingTime = 2400; // 40 minutes in seconds
let isFullScreen = false;

function showPage(pageNum) {
    document.getElementById('page1').classList.add('hidden');
    document.getElementById('page2').classList.add('hidden');
    document.getElementById('page3').classList.add('hidden');
    
    if (pageNum === 1) {
        document.getElementById('page1').classList.remove('hidden');
    } else if (pageNum === 2) {
        document.getElementById('page2').classList.remove('hidden');
        loadMockTest();
        startTimer();
        hideButtonsForTest();
    } else if (pageNum === 3) {
        document.getElementById('page3').classList.remove('hidden');
        showResults();
    }
}

function saveQuestion() {
    let questionText = document.getElementById('questionText').value;
    let questionImage = document.getElementById('questionImage').files[0];
    let optionA = document.getElementById('optionA').value;
    let optionB = document.getElementById('optionB').value;
    let optionC = document.getElementById('optionC').value;
    let optionD = document.getElementById('optionD').value;

    let question = {
        text: questionText,
        image: questionImage ? URL.createObjectURL(questionImage) : null,
        options: [optionA, optionB, optionC, optionD],
        answer: null // Answer is initially not set
    };

    questions.push(question);
    alert("Question saved!");

    // Clear form for next question
    document.getElementById('questionText').value = '';
    document.getElementById('optionA').value = '';
    document.getElementById('optionB').value = '';
    document.getElementById('optionC').value = '';
    document.getElementById('optionD').value = '';

    updateQuestionsList();
}

function updateQuestionsList() {
    let list = document.getElementById('questionsList');
    list.innerHTML = '';
    questions.forEach((q, i) => {
        let li = document.createElement('li');
        li.textContent = `Q${i + 1}: ${q.text}`;
        list.appendChild(li);
    });
}

function loadMockTest() {
    let testContainer = document.getElementById('testQuestions');
    testContainer.innerHTML = '';

    let question = questions[currentQuestionIndex];
    let questionDiv = document.createElement('div');
    
    let questionContent = document.createElement('div');
    if (question.image) {
        let img = document.createElement('img');
        img.src = question.image;
        questionContent.appendChild(img);
    } else {
        questionContent.textContent = question.text;
    }
    questionDiv.appendChild(questionContent);
    
    let optionsDiv = document.createElement('div');
    question.options.forEach((option, i) => {
        let label = document.createElement('label');
        let input = document.createElement('input');
        input.type = 'radio';
        input.name = 'question' + currentQuestionIndex;
        input.value = option;
        label.appendChild(input);
        label.append(option);
        optionsDiv.appendChild(label);
    });

    questionDiv.appendChild(optionsDiv);
    testContainer.appendChild(questionDiv);
}

function startTimer() {
    timerInterval = setInterval(() => {
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            submitTest();
        } else {
            remainingTime--;
            updateTimerDisplay();
        }
    }, 1000);
}

function updateTimerDisplay() {
    let minutes = Math.floor(remainingTime / 60);
    let seconds = remainingTime % 60;
    document.getElementById('timer').textContent = `Time Left: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function submitTest() {
    clearInterval(timerInterval);

    questions.forEach((question, index) => {
        let selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption) {
            question.answer = selectedOption.value;
        }
    });
    
    showPage(3);
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadMockTest();
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadMockTest();
    }
}

function showResults() {
    let resultContainer = document.getElementById('results');
    resultContainer.innerHTML = '';

    questions.forEach((question, index) => {
        let resultText = document.createElement('div');
        resultText.textContent = `Q${index + 1}: ${question.text} - Your answer: ${question.answer || 'Not Attempted'}`;
        resultContainer.appendChild(resultText);
    });
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function toggleFullScreen() {
    if (!isFullScreen) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        }
        isFullScreen = true;
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        isFullScreen = false;
    }
}

function hideButtonsForTest() {
    document.querySelector('button[onclick="showPage(1)"]').style.display = 'none';
    document.querySelector('button[onclick="showPage(2)"]').style.display = 'none';
    document.querySelector('button[onclick="showPage(3)"]').style.display = 'none';
}