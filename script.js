let questions = [];
let currentQuestion = 0;

document.getElementById('start-btn').addEventListener('click', startTest);
document.getElementById('next-btn').addEventListener('click', nextQuestion);
document.getElementById('prev-btn').addEventListener('click', prevQuestion);
document.getElementById('submit-btn').addEventListener('click', submitTest);
document.getElementById('fullscreen-btn').addEventListener('click', toggleFullScreen);
document.getElementById('upload-btn').addEventListener('click', uploadImage);

function startTest() {
    document.getElementById('start-section').style.display = 'none';
    document.getElementById('question-container').style.display = 'block';
    displayQuestion();
}

function displayQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('question-text').innerText = question.text;
    document.getElementById('image-preview').innerHTML = question.image ? `<img src="${question.image}" />` : '';
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        displayQuestion();
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
    }
}

function submitTest() {
    alert('Test submitted!');
}

function toggleFullScreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
    }
}

function uploadImage() {
    const fileInput = document.getElementById('image-upload');
    fileInput.click();
    fileInput.addEventListener('change', function () {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                questions.push({ text: 'Question ' + (questions.length + 1), image: e.target.result });
                alert('Image uploaded as a question');
            };
            reader.readAsDataURL(file);
        }
    });
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}
