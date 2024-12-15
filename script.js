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
    let question =