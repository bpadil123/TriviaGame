// var correctAnswer = 0;
// var inCorrectAnswer = 0;
// var unAnswered = 0;
// var counter = 5;
var questions = ["Who said,-When you play the game of thrones, you wine or you die?- "]
var answer1=["3","7","5", "6"]
var answer2 = ["Cersei", "Little Finger", "Tyrion","Varys"]
$(document).ready(function () {
            console.log("document loaded");

            $("#start").click(function () {
                    console.log("click-worked");
                    $("#start").hide();
                    $("div").text("How many kindoms are in all of Westeros?")
       

                    for (var i = 0; i<=answer1.length; i++){
                        $(".1stans").text(answer1[i]);                    }
                  


                    });

            });