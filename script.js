let questions = [];
let currentQuestionIndex = 0;
let timerInterval;
let remainingTime = 2400; // 40 minutes in seconds

// Show the page
function showPage(pageNum) {
    // Hide all pages
    document.getElementById('page1').classList.add('hidden');
    document.getElementById('page2').classList.add('hidden');
    document.getElementById('page3').classList.add('hidden');

    // Show the selected page
    if (pageNum === 1) {
        document.getElementById('page1').classList.remove('hidden');
        document.getElementById('insertBtn').classList.remove('hidden');
        document.getElementById('startTestBtn').classList.add('hidden');
        document.getElementById('showResultsBtn').classList.add('hidden');
    } else if (pageNum === 2) {
        document.getElementById('page2').classList.remove('hidden');
        document.getElementById('insertBtn').classList.add('hidden');
        document.getElementById('startTestBtn').classList.add('hidden');
        document.getElementById('showResultsBtn').classList.add('hidden');
        loadMockTest();
        startTimer();
        document.getElementById('navigationButtons').classList.remove('hidden');
    } else if (pageNum === 3) {
        document.getElementById('page3').classList.remove('hidden');
        showResults();
    }
}

// Save questions
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
    document.getElementById('questionText').value = '';
    document.getElementById('questionImage').value = '';
    document.getElementById('imagePreviewContainer').innerHTML = '';
    updateQuestionsList();
}

// Preview image before saving
function previewImage() {
    let files = document.getElementById('questionImage').files;
    let previewContainer = document.getElementById('imagePreviewContainer');
    previewContainer.innerHTML = '';

    for (let file of files) {
        let img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        previewContainer.appendChild(img);
    }
}

// Update the list of questions
function updateQuestionsList() {
    let questionsList = document.getElementById('questionsList');
    questionsList.innerHTML = '';

    questions.forEach((question, index) => {
        let li = document.createElement('li');
        li.textContent = `Q${index + 1}: ${question.text}`;
        questionsList.appendChild(li);
    });
}

// Load mock test questions
function loadMockTest() {
    let testQuestions = document.getElementById('testQuestions');
    testQuestions.innerHTML = '';

    questions.forEach((question, index) => {
        let div = document.createElement('div');
        div.className = 'question';
        div.innerHTML = `
            <p>${question.text}</p>
            <img src="${question.image}" alt="Question Image" class="question-image">
        `;
        testQuestions.appendChild(div);
    });
}

// Start timer for the test
function startTimer() {
    timerInterval = setInterval(() => {
        remainingTime--;
        document.getElementById('timer').textContent = `Time Left: ${formatTime(remainingTime)}`;
