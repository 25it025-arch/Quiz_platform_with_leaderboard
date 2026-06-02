const questions = [

{
question:"Which language is used for webpage structure?",
answers:["HTML","Java","Python","C++"],
correct:0
},

{
question:"Which language styles webpages?",
answers:["CSS","Java","Python","SQL"],
correct:0
},

{
question:"Which company developed JavaScript?",
answers:["Microsoft","Google","Netscape","Apple"],
correct:2
},

{
question:"What does API stand for?",
answers:[
"Application Programming Interface",
"Advanced Program Internet",
"Application Process Integration",
"Automatic Program Input"
],
correct:0
},

{
question:"Which tag creates a hyperlink?",
answers:["<p>","<a>","<div>","<img>"],
correct:1
}

];

const startScreen =
document.getElementById("start-screen");

const quizScreen =
document.getElementById("quiz-screen");

const resultScreen =
document.getElementById("result-screen");

const playerNameInput =
document.getElementById("playerName");

const questionElement =
document.getElementById("question");

const answersElement =
document.getElementById("answers");

const nextBtn =
document.getElementById("nextBtn");

const questionCount =
document.getElementById("question-count");

const finalScore =
document.getElementById("finalScore");

const leaderboardList =
document.getElementById("leaderboardList");

let currentQuestion = 0;
let score = 0;
let playerName = "";

function startQuiz(){

playerName =
playerNameInput.value.trim();

if(playerName === ""){
alert("Enter your name");
return;
}

startScreen.classList.add("hidden");
quizScreen.classList.remove("hidden");

showQuestion();

}

document
.getElementById("startBtn")
.addEventListener("click",startQuiz);

function showQuestion(){

nextBtn.style.display="none";

answersElement.innerHTML="";

let q = questions[currentQuestion];

questionCount.innerHTML =
`Question ${currentQuestion+1}
of ${questions.length}`;

questionElement.innerHTML =
q.question;

q.answers.forEach((answer,index)=>{

const btn =
document.createElement("button");

btn.classList.add("answer-btn");

btn.innerHTML = answer;

btn.addEventListener("click",()=>{

selectAnswer(index,q.correct,btn);

});

answersElement.appendChild(btn);

});

}

function selectAnswer(selected,correct,btn){

const buttons =
document.querySelectorAll(".answer-btn");

buttons.forEach(button=>{

button.disabled=true;

});

if(selected===correct){

btn.classList.add("correct");

score++;

}
else{

btn.classList.add("wrong");

buttons[correct]
.classList.add("correct");

}

nextBtn.style.display="block";

}

nextBtn.addEventListener("click",()=>{

currentQuestion++;

if(currentQuestion < questions.length){

showQuestion();

}
else{

finishQuiz();

}

});

function finishQuiz(){

quizScreen.classList.add("hidden");

resultScreen.classList.remove("hidden");

finalScore.innerHTML =

`🎉 ${playerName},
you scored ${score}
out of ${questions.length}`;

saveScore();

displayLeaderboard();

}

function saveScore(){

let leaderboard =

JSON.parse(
localStorage.getItem("leaderboard")
) || [];

leaderboard.push({

name:playerName,
score:score

});

leaderboard.sort(
(a,b)=>b.score-a.score
);

leaderboard = leaderboard.slice(0,10);

localStorage.setItem(
"leaderboard",
JSON.stringify(leaderboard)
);

}

function displayLeaderboard(){

let leaderboard =

JSON.parse(
localStorage.getItem("leaderboard")
) || [];

leaderboardList.innerHTML="";

leaderboard.forEach((player,index)=>{

leaderboardList.innerHTML +=

`
<div class="leaderboard-item">

<span>
#${index+1}
${player.name}
</span>

<span>
${player.score}
pts
</span>

</div>
`;

});

}

function restartQuiz(){

currentQuestion = 0;
score = 0;

resultScreen.classList.add("hidden");

startScreen.classList.remove("hidden");

playerNameInput.value="";

}

displayLeaderboard();
