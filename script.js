let questions = [];

function showPage(pageNum) {
    document.getElementById('page1').classList.add('hidden');
    document.getElementById('page2').classList.add('hidden');
    document.getElementById('page3').classList.add('hidden');
    
    if (pageNum === 1) {
        document.getElementById('page1').classList.remove('hidden');
    } else if (pageNum === 2) {
        document.getElementById('page2').classList.remove('hidden');
        loadMockTest();
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
}

function loadMockTest() {
    let testContainer = document.getElementById('testQuestions');
    testContainer.innerHTML = '';

    questions.forEach((question, index) => {
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
            input.name = 'question' + index;
            input.value = option;
            label.appendChild(input);
            label.append(option);
            optionsDiv.appendChild(label);
        });

        questionDiv.appendChild(optionsDiv);
        testContainer.appendChild(questionDiv);
    });
}

function submitTest() {
    questions.forEach((question, index) => {
        let selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption) {
            question.answer = selectedOption.value;
        }
    });
    showPage(3);
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
