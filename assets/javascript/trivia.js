var questions = [{
    question: "What is the Baratheon family seat?",
    choices: ["Dragonstone", "Storm's End", "Winterfell", "Riverrun"],
    correctAnswer: 1
}, {
    question: "Which family rules the north?",
    choices: ["Lannisters", "Freys", "Starks", "Tullys"],
    correctAnswer: 2
}, {
    question: "Who was the last Targaryen king?",
    choices: ["Aegon V", "Aerys II", "Maegor I", "Jaehaerys II"],
    correctAnswer: 1
}, {
    question: "Which family rules the Vale?",
    choices: ["Arryns", "Targaryens", "Tyrell", "Martell"],
    correctAnswer: 0
}, {
    question: "Which of these cities is in Essos?",
    choices: ["Bravos", "Winterfell", "White Harbor", "Oldtown"],
    correctAnswer: 0
}, {
    question: "Which family rules over Riverrun?",
    choices: ["Arryns", "Baratheons", "Starks", "Tullys"],
    correctAnswer: 3
}, {
    question: 'Where is the "Gift"?',
    choices: ["King's Landing", "The land north of the Twins", "Just south of the Wall", "All of Westeros"],
    correctAnswer: 2
}, {
    question: "Who has not been a Hand of the King?",
    choices: ["Eddard Stark", "Robert Baratheon", "Tywin Lannister", "Jon Arryn"],
    correctAnswer: 1
}, {
    question: "Which of these cities is in Westeros?",
    choices: ["Winterfell", "Bravos", "Mereen", "Lys"],
    correctAnswer: 0
}, {
    question: "What is the Lannister family sigil?",
    choices: ["Stag", "Dragon", "Direwolf", "Lion"],
    correctAnswer: 3
}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;
var timeLeft = 90;
var intervalId;

$(document).ready(function () {
    runTimer();
    // Gets the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

    // Click net question for next question
    $(this).find(".nextButton").on("click", function () {
        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } else {
                $(document).find(".quizMessage").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++; // Since we have already displayed the first question on DOM ready
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                }
            }
        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

});
// Very simple countdown that will end the quiz when the time runs out
function runTimer() {
      intervalId = setInterval(decrement, 1000);
    }
function decrement() {
      timeLeft--;
      $(".timeLeft").html("Time left: " + timeLeft);
      if (timeLeft === 0) {
        stop();
        alert("Out of Time!");
        displayScore();
        $(document).find(".nextButton").text("Play Again?");
        quizOver = true;
      }
    }
function stop() {  
      clearInterval(intervalId);
    }   
// This displays the current question AND the choices
function displayCurrentQuestion() {

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    timeLeft = 90
    hideScore();
    runTimer();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}