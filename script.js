const questions = [
  {
    question: "Which HTML tag is used to define an unordered list?",
    answers: [
      { text: "ol", correct: false },
      { text: "ul", correct: true },
      { text: "li", correct: false },
      { text: "dl", correct: false },
    ]
  },
  {
    question: "Which CSS property is used to change the text color of an element?",
    answers: [  
      { text: "font-color", correct: false },
      { text: "color", correct: true },
      { text: "text-color", correct: false },
      { text: "background-color", correct: false },
    ]
  },
  {
    question: "In CSS, Which Property is used to create space between the content and the border of an element?",
    answers: [
      { text: "margin", correct: false },
      { text: "padding", correct: true },
      { text: "border-spacing", correct: false },
      { text: "spacing", correct: false },
    ]
  },
  {
    question: "What does the 'alt' attribute in the <img> tag define?",
    answers: [
      { text: "The alternative text for an image, if the image cannot be displayed.", correct: true },
      { text: "The alignment of the image.", correct: false },
      { text: "The source file of the image.", correct: false },
      { text: "The size of the image.", correct: false },
    ]
  },
  {
    question: "What of the following is the correct way to apply a CSS class to an HTML element?",
    answers: [
      { text: "div id='example'", correct: false },
      { text: "div class='example'", correct: true },
      { text: "div style='example'", correct: false },
      { text: "div css='example'", correct: false },
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const header = document.getElementById("playscore");



let currentQuestionIndex = 0;
let score = 0;
let play = 1;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  play = 1;
  nextButton.innerHTML = "NEXT";
  showQuestion();
}

function showQuestion() {
    resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    header.innerHTML= `${play} / ${questions.length}`;
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
        button.dataset.correct = answer.correct;
    }
    button.addEventListener("click" , selectAnswer);
  });
}



function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedbtn = e.target;
    const iscorrect = selectedbtn.dataset.correct==="true";
    if(iscorrect){
        selectedbtn.classList.add("correct");
        score++;
        play++;
    }else{
        selectedbtn.classList.add("incorrect");
        play++;
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}


function showscore(){
    resetState();
    if(score>2){
      questionElement.innerHTML=`You Scored ${score} Out of ${questions.length}! you passed this test`;
    }else{
      questionElement.innerHTML=`You Scored ${score} Out of ${questions.length}! you fail this test`;

    }
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex == questions.length - 1){
    showQuestion();
    // nextButton.innerHTML="Submit"
  }else if(currentQuestionIndex<questions.length){
    showQuestion();
  }else{
    showscore();
  }
}



nextButton.addEventListener("click" , ()=>{
      if(currentQuestionIndex< questions.length){
        handleNextButton();
      }else{
        startQuiz();
      }
})

 

startQuiz();