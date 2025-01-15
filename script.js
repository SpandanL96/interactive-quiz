const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');


// Make an array of objects that stores question, choices of question and answer
const quiz = [
    {
        question: "Q. What is the capital of Australia?",
        choices: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        answer: "Canberra"
    },
    {
        question: "Q.Which country has won the most FIFA World Cups?",
        choices: ["Germany", "Brazil", "Italy", "Portugal"],
        answer: "Brazil"
    },
    {
        question: "Q. Who is the first cricketer to score 100 international centuries?",
        choices: ["Ricky Ponting", "Jacques Kallis", "Virat Kohli", "Sachin Tendulkar"],
        answer: "Sachin Tendulkar"
    },
    {
        question: "Q. What does 'IPO' stand for in finance?",
        choices: ["Initial Public Option", "International Profit Order", "Initial Public Offering", "Investment Portfolio Option"],
        answer: "Initial Public Offering"
    },
    {
        question: "Q. What is the official currency of Japan?",
        choices: ["Yuan", "Yen", "Won", "Rupee"],
        answer: "Yen"
    },
    {
        question: "Q.Who holds the record for the most Grand Slam titles in men's tennis (as of 2025)?",
        choices: ["Novak Djokovic", "Rafael Nadal", "Roger Federer", "Pete Sampras"],
        answer: "Novak Djokovic"
    },
    {
        question: "Q. Which tournament is considered the oldest tennis championship?",
        choices: ["US Open", "French Open", "Wimbledon", "Australian Open"],
        answer: "Wimbledon"
    },
    {
        question: "Q. Which team has won the most IPL titles?",
        choices: ["Royal Challengers Bangalore", "Mumbai Indians", "Kolkata Knight Riders", "Delhi Capitals"],  
        answer: "Mumbai Indians"
    },
    {
        question: "Q. Who is the leading run-scorer in IPL history?",
        choices: ["Rohit Sharma", "Suresh Raina", "Virat Kohli", "David Warner"],
        answer: "Virat Kohli"
    },
    {
        question: "Q. Which movie won the Academy Award for Best Picture in 2023?",
        choices: ["Everything Everywhere All At Once", "Avatar: The Way of Water", "Top Gun: Maverick", "The Banshees of Inisherin"],
        answer: "Everything Everywhere All At Once"
    },
    {
        question: "Q. Who directed the movie 'Inception'?",
        choices: ["Quentin Tarantino", "Christopher Nolan", "James Cameron", "Steven Spielberg"],
        answer: "Christopher Nolan"
    },
    {
        question: "Q. Which player has won the most Ballon d'Or awards?",
        choices: ["Cristiano Ronaldo", "Lionel Messi", "Zinedine Zidane", "pele"],
        answer: "Lionel Messi"
    },
    {
        question: "Q. What is the tallest mountain in the world?",
        choices: ["K2", "Kangchenjunga", "Lhotse", "Mount Everest"],
        answer: "Mount Everest"
    },
    {
        question: "Q. Which country hosted the 2022 FIFA World Cup?",
        choices: ["Qatar", "Russia", "Brazil", "South Africa"],
        answer: "Qatar"
    },
    {
        question: "Q. Which team won the first ICC Cricket World Cup in 1975?",
        choices: ["Australia", "West Indies", "England", "India"],
        answer: "West Indies"
    }
];

// Making Variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;

// Arrow Function to Show Questions
const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = "";
    for (let i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            if (choiceDiv.classList.contains('selected')) {
                choiceDiv.classList.remove('selected');
            }
            else {
                choiceDiv.classList.add('selected');
            }
        });
    }

    if(currentQuestionIndex < quiz.length){
        startTimer();
    }
}

// Function to check answers
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
        // alert("Correct Answer!");
        displayAlert("Correct Answer!");
        score++;
    }
    else {
        // alert("Wrong answer");
        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
    }
    timeLeft = 15;
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    }
    else {
        stopTimer();
        showScore();
    }
}

// Function to show score
const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz!");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
}

// Function to Show Alert
const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(()=>{
        alert.style.display = "none";
    }, 2000);
}

// Function to Start Timer
const startTimer = () => {
    clearInterval(timerID); // Check for any exist timers
    timer.textContent = timeLeft;

    const countDown = ()=>{
        timeLeft--;
        timer.textContent = timeLeft;
        if(timeLeft === 0){
            const confirmUser = confirm("Time Up!!! Do you want to play the quiz again");
            if(confirmUser){
                timeLeft = 15;
                startQuiz();
            }
            else{
                startBtn.style.display = "block";
                container.style.display = "none";
                return;
            }
        }
    }
    timerID = setInterval(countDown, 1000);
}

// Function to Stop Timer
const stopTimer = () =>{
    clearInterval(timerID);
}

// Function to shuffle question
const shuffleQuestions = () =>{
    for(let i=quiz.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}

// Function to Start Quiz
const startQuiz = () =>{
    timeLeft = 15;
    timer.style.display = "flex";
    shuffleQuestions();
}

// Adding Event Listener to Start Button
startBtn.addEventListener('click', ()=>{
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});

nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === "Next") {
        // alert("Select your answer");
        displayAlert("Select your answer");
        return;
    }
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        startQuiz();
    }
    else {
        checkAnswer();
    }
});
