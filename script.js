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

function saveQuestions() {
    let questionText = document.getElementById('questionText').value;
    let questionImages = document.getElementById('questionImage').files;

    for (let i = 0; i < questionImages.length; i++) {
        let question = {
            text: questionText,
            image: URL.createObjectURL(questionImages[i]),
            rating: null // Rating is initially not set
        };
        questions.push(question);
    }

    alert("Questions saved!");

    // Clear form for next question
    document.getElementById('questionText').value = '';
    document.getElementById('questionImage').value = '';
    document.getElementById('imagePreviewContainer').innerHTML = '';

    updateQuestionsList();
}

function previewImage() {
    let files = document.getElementById('questionImage').files;
    let previewContainer = document.getElementById('imagePreviewContainer');
    previewContainer.innerHTML = '';

    for (let i = 0; i < files.length; i++) {
        let img = document.createElement('img');
        img.src = URL.createObjectURL(files[i]);
        previewContainer.appendChild(img);
    }
}

function updateQuestionsList() {
    let list = document.getElementById('questionsList');
    list.innerHTML = '';
    questions.forEach((q, i) => {
        let li = document.createElement('li');
        li.innerHTML = `Q${i + 1}: ${q.text} <br> <img src="${q.image}" style="max-width: 100px;">`;
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
        img.style.maxWidth = '300px';
        questionContent.appendChild(img);
    }
    
    let questionText = document.createElement('div');
    questionText.textContent = question.text;
    questionContent.appendChild(questionText);

    questionDiv.appendChild(questionContent);
    testContainer.appendChild(questionDiv);
}

function rateQuestion(rating) {
    let question = questions[currentQuestionIndex];
    question.rating = rating;
    alert(`You rated Question ${currentQuestionIndex + 1} as ${rating}`);
}

function startTimer() {
    timerInterval = setInterval(() => {
        if (remainingTime > 0) {
            remainingTime--;
            let minutes = Math.floor(remainingTime / 60);
            let seconds = remainingTime % 60;
            document.getElementById('timer').textContent = `Time Left: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        } else {
            clearInterval(timerInterval);
            alert("Time's up!");
            submitTest();
        }
    }, 1000);
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadMockTest();
    }
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadMockTest();
    }
}

function submitTest() {
    alert("Test submitted!");
    showPage(3);
}

function showResults() {
    let okList = document.getElementById('okQuestions');
    let goodList = document.getElementById('goodQuestions');
    let bestList = document.getElementById('bestQuestions');

    okList.innerHTML = '';
    goodList.innerHTML = '';
    bestList.innerHTML = '';

    questions.forEach((q, i) => {
        let li = document.createElement('li');
        li.innerHTML = `Q${i + 1}: ${q.text}`;
        
        if (q.rating === 'OK') {
            okList.appendChild(li);
        } else if (q.rating === 'Good') {
            goodList.appendChild(li);
        } else if (q.rating === 'Best') {
            bestList.appendChild(li);
        }
    });
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.container').classList.toggle('dark-mode');
}

function toggleFullScreen() {
    if (!isFullScreen) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) { // Firefox
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement