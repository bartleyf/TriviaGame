var questions = [{
    question: "In which 'Indiana Jones' movie does the character Dr. Elsa Schneider appear?",
    choices: ["The Last Crusade ", "Raiders of the Lost Ark ", "the Temple of Doom", "Kingdom of the Crystal Skull"],
    correctAnswer: 0
}, {
    question: "What type of animal is Indy scared of?",
    choices: ["Dogs", "Snakes", "Cats", "Ants"],
    correctAnswer: 1
}, {
    question: "What kind of dog does Indy have as a boy?",
    choices: ["Husky", "German Shepard", "Basset Hound", "Didn't have a dog"],
    correctAnswer: 0
}, {
    question: "Upon coming back from the First World War, Which university did he study at?",
    choices: ["Univeristy of Texas", "THE Ohio State", "Texas State", "University of Chicago"],
    correctAnswer: 3
}, {
    question: "In 'The Temple of Doom', How many Shankara stones fall to the bottom of the ravine?",
    choices: ["2", "5", "1", "0"],
    correctAnswer: 0
},{
    question: "In 'Raiders Of the Lost Ark' what two weapons did Indy carry with him at all times?",
    choices: ["No Weapons", "A 1911 pistol and knife", "A bullwhip and pistol ", "A Sword"],
    correctAnswer: 2
},{
    question: "In which 'Indiana Jones' movie does someone try to kill Indy?",
    choices: ["The Last Crusade", "Raiders Of The Lost Ark", "The Temple Of Doom", "All Of Them"],
    correctAnswer: 3
},{
    question: "The making of the 'Indiana Jones' movies saw the collaboration of Steven Spielberg with which other spectacular director?",
    choices: ["George Lucas", "Martin Scorsese", "Stanley Kubrick", "James Cameron"],
    correctAnswer: 0
}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function () {

    // Display the first question
    displayCurrentQuestion();
    $(this).find("#quizMessage").hide();

    // On clicking next, display the next question
    $(this).on("click", function () {

        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find("#quizMessage").text("Please select an answer");
                $(document).find("#quizMessage").show();
            } else {
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $(document).find("#quizMessage").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++; // Since we have already displayed the first question on DOM ready
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    quizOver = true;
                }
            }
        } else { // quiz is over
            quizOver = false;
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

});

// This displays the current question AND the choices
function displayCurrentQuestion() {

    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find("#quizContainer > #question");
    var choiceList = $(document).find("#quizContainer > #choiceList");
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

function timer(){
    currentQuestion++;
    setTimeout(timerExpired, 30000);
    console.log(timer);
  }

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find("#quizContainer > #result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find("#quizContainer > #result").show();
}

function hideScore() {
    $(document).find("#result").hide();
}