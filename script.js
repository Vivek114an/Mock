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
    
    let question = {
        text: questionText,
        image: questionImage ? URL.createObjectURL(questionImage) : null,
        rating: null // Rating is initially not set
    };

    questions.push(question);
    alert("Question saved!");

    // Clear form for next question
    document.getElementById('questionText').value = '';
    document.getElementById('questionImage').value = '';
    document.getElementById('imagePreview').classList.add('hidden');

    updateQuestionsList();
}

function previewImage() {
    let file = document.getElementById('questionImage').files[0];
    let preview = document.getElementById('imagePreview');
    if (file) {
        preview.src = URL.createObjectURL(file);
        preview.classList.remove('hidden');
    } else {
        preview.classList.add('hidden');
    }
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
        img.style.maxWidth = '300px';