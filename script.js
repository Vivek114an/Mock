let questions = [];
let currentQuestionIndex = 0;
let timerInterval;
let remainingTime = 2400; // 40 minutes in seconds
let isFullScreen = false;

function showPage(pageNum) {
    // Hide all pages
    document.getElementById('page1').classList.add('hidden');
    document.getElementById('page2').classList.add('hidden');
    document.getElementById('page3').classList.add('hidden');

    // Show the selected page
    if (pageNum === 1) {
        document.getElementById('page1').classList.remove('hidden');
        document.getElementById('insertBtn').classList.remove('hidden');
        document.getElementById('startTestBtn').classList.remove('hidden');
        document.getElementById('showResultsBtn').classList.add('hidden');
        document.getElementById('navigationButtons').classList.add('hidden');
    } else if (pageNum === 2) {
        document.getElementById('page2').classList.remove('hidden');
        document.getElementById('insertBtn').classList.add('hidden');
        document.getElementById('showResultsBtn').classList.add('hidden');
        document.getElementById('navigationButtons').classList.remove('hidden');
        loadMockTest();
        startTimer();
    } else if (pageNum === 3) {
        document.getElementById('page3').classList.remove('hidden');
        document.getElementById('insertBtn').classList.add('hidden');
        document.getElementById('startTestBtn').classList.add('hidden');
        document.getElementById('navigationButtons').classList.add('hidden');
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

function rateQuestion(rating) {
    let currentQuestion = questions[currentQuestionIndex];
    currentQuestion.rating = rating;
    updateQuestionsList();
}

function updateQuestionsList() {
    let questionsList = document.getElementById('questionsList');
    questionsList.innerHTML = '';
    questions.forEach((question, index) => {
        let li = document.createElement('li');
        li.textContent = `${question.text} - Rating: ${question.rating || 'Not rated'}`;
        if (question.image) {
            let img = document.createElement('img');
            img.src = question.image;
            li.appendChild(img);
        }
        questionsList.appendChild(li);
    });
}

function loadMockTest() {
    let testQuestionsDiv = document.getElementById('testQuestions');
    testQuestionsDiv.innerHTML = '';
    let currentQuestion = questions[currentQuestionIndex];
    let div = document.createElement('div');
    div.textContent = currentQuestion.text;
    if (currentQuestion.image) {
        let img = document.createElement('img');
        img.src = currentQuestion.image;
        div.appendChild(img);
    }
    testQuestionsDiv.appendChild(div);
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

function submitTest() {
    alert('Test submitted!');
    showPage(3);
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function toggleFullScreen() {
    if (!isFullScreen) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) { // Firefox
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
            document.documentElement.msRequestFullscreen();
        }
        isFullScreen = true;
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
