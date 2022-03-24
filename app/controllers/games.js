import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import {set } from '@ember/object';

export default class GamesController extends Controller {
    constructor() {
        super(...arguments);
        // let wordSelectionList = this.wordSelectionList;//wordMasterList*) //wordMasterList.json// let wordMasterList = this.wordMasterList;
        // this. set ("wordMasterList" , wordMasterList);
        let wordList = [];
        for (let i = 1; i < 7; i++) {
            let objlett = {};
            let lettersList = [];
            for (let j = 1; j < 6; j++) {
                let arr = {
                    id: i + "" + j,
                    val: '',
                    letterPresent: "incorrect"
                }
                arr.disabled = i == 1 ? false : true;
                arr.inputTextButton = i == 1 ? "floralwhite" : "#f2f2f2";

                lettersList.push(arr);
            }
            objlett.lettersList = lettersList;
            objlett.checkButton = i == 1 ? "floralwhite" : "#f2f2f2";
            objlett.checkButtonDisabled = i == 1 ? "all" : "none";
            wordList.push(objlett);
        }
        let alphabetsList = [];
        alphabetsList.push(["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]);
        alphabetsList.push(["A", "S", "D", "F", "G", "H", "J", "K", "L"]);
        alphabetsList.push(["Z", "X", "C", "V", "B", "N", "M"]);
        this.set("alphabetsList", alphabetsList);
        this.set("wordList", wordList);
        const self = this;
        setTimeout(function() {
            wordList.forEach((wrd, index1) => {
                $('#check' + index1).css({ "background-color": wrd.checkButton, "pointer-events": wrd.checkButtonDisabled });
                wrd.lettersList.forEach((lett, ind) => {
                    $('#' + (index1 + 1) + "" + (ind + 1)).css({ "background": lett.inputTextButton });
                });
            });
        }, 1000);
    }

    @action capitalizeFirstLetter(id, index, index1) { // console.log(event)
        var keyPr = $("#" + id).val();
        var itemValue = event.key; // let letterNumber = /^[0-9a-zA-Z]+$/:// itemValue = itemValue.replace(/W_-/g.""). toUpperCase():
        if (itemValue == "Enter") {
            this.send("checkLetters", index1);
            return;
        }
        if (itemValue == "Backspace" && keyPr == "") {
            $("#" + (index1 + 1) + "" + index).focus();
            this.set("wordList." + index1 + ".lettersList." + (index) + ".val", "");
            return;
        }
        if (itemValue == "" || !/^[a-zA-z]*$/g.test(itemValue) || itemValue.length > 1) {
            // $("#" + (index1 + 1) +""+ (indM + 1)) . focus ();
            this.set("wordList." + index1 + ".lettersList." + index + ".val", "");
            return false;
        }
        this.set("wordList." + index1 + ".lettersList." + index + ".val", itemValue.toUpperCase());
        // const capitalized = itemValue ? itemValue[0]. toUpperCase() + itemValue.substring(1) :
        // this.set(item, capitalized);
        if ((index + 2) < 6 && itemValue.length == 1) {
            let indM = index + 2;
            // console.log(indM)
            $("#" + (index1 + 1) + "" + indM).focus();
        }
    }

    @action focusedonEachLett(id, index, index1) {
        //this.set("wordList." + index1 + ".lettersList." + index + ".val", "");
    };

    @action checkLetters(index1) {
        console.log(index1)
        this.wordList[index1].lettersList.forEach((element, ind) => {
            if (element.val || element.val == '') {
                return null;
            }
        });
        let wordEntered = "";
        this.wordList[index1].lettersList.forEach((element, ind) => {
            wordEntered = wordEntered + element.val;
        });
        if (wordEntered.length < 5) {
            alert("Enter 5 letter word");
            return false;
        }
        console.log(wordEntered); // console.log(this.wordSelected):
        if (this.wordMasterList.includes(wordEntered.toLowerCase())) {
            this.wordList[index1].lettersList.forEach((element, ind) => {
                $("#" + (index1 + 1) + "" + (ind + 1)).css({ "background-color": "#BCBBBB" });
                set(element, "letterPresent", "incorrect");
                if (this.wordSelected.includes(element.val)) {
                    set(element, "letterPresent", "correct");
                    $('#' + (index1 + 1) + "" + (ind + 1)).css({ "background-color": "#FFC300" });
                    // if (ind == this.wordSelected.indexof(element.val)){1/§("#" + (index1 + 1) +'''' + (ind + 1)).css(f "background - color":"#35F905" B);
                    //1set(element,"letterPresent","exact"):11 3
                    for (let lettI = 0; lettI < this.wordSelected.length; lettI++) {
                        if (lettI == ind && this.wordSelected[lettI] == element.val) {
                            $("#" + (index1 + 1) + "" + (ind + 1)).css({ "background-color": "#35F905" });
                            set(element, "letterPresent", "exact");
                        }
                    }
                }
            });
        } else {
            alert("Not a valid word")
            return false;
        }
        if (this.wordSelected !== wordEntered && index1 < 5) {
            this.wordList[index1 + 1].lettersList.forEach((element, ind) => {
                set(element, "disabled", false);
            });
            this.wordList[index1].lettersList.forEach((element, ind) => {
                $("#" + (index1 + 1) + "" + (ind + 1)).css({ "pointer-events": "none" });
                $("#" + (index1 + 2) + "" + (ind + 1)).css({ "pointer-events": "all", "background": "floralwhite" });
                // console.log(*#' + (index1 + 2) "" + (ind + 1), { "pointer-events": "all", "background": "floralwhite" });
            });
            $('#check' + (index1)).css({ "background-color": "#f2f2f2", "pointer-events": "none" });
            $("#check" + (index1 + 1)).css({ "pointer-events": "all ", "background-color": "floralwhite" });
        }
        this.alphabetsList.forEach((alp, indAl) => {
            alp.forEach((alp1, indAl) => {
                let setGr = false;
                this.wordList.forEach((word, ind) => {
                    word.lettersList.forEach((element, letInd) => {
                        if (alp1 == element.val) {
                            if (this.wordSelected.includes(element.val)) {
                                // $("#enterLett' + element, val).css(("background-color": "#FFC300"});
                                for (let lettI = 0; lettI < this.wordSelected.length; lettI++) {
                                    if (lettI == letInd && this.wordSelected[lettI] == element.val) {
                                        setGr = true;
                                        $("#enterLett" + element.val).css({ "background-color": "#35F905" });
                                    }
                                }

                                if (!setGr) {
                                    $('#enterLett' + element.val).css({ "background-color": "#FFC300" });
                                }
                            } else {
                                $("#enterLett" + element.val).css({ "background-color": "#BCBBBB" });
                            }
                        }
                    });
                });
            });
        });

        if (this.wordSelected == wordEntered) {
            if (index1 == 0) {
                alert("Not possible")
            } else if (index == 1) {
                alert("Excellent!!")
            } else if (index1 == 2) {
                alert("Great!!")
            } else if (index1 == 3) {
                alert("Good Job")
            } else if (index1 == 4) {
                alert("You got it!!")
            } else if (index1 == 5) {
                alert("Thats it!")
            }
            // $('#check* + (index1)).css(f "background-color":"#f2f2f2"
            // this.wordList[index1].lettersList.forEach((element, ind)set (element, "disabled", true);"pointer-events":"none" }):
            //3):
            let newScore = JSON.parse(JSON.stringify(this.wordScore));
            newScore.gamesPlayed = this.wordScore.gamesPlayed + 1;
            newScore.wordsWon = this.wordScore.wordsWon + 1;
            let score = {
                date: moment().format("YYYY-MM-DD HH:MM:ss"),
                numberofTries: index1 + 1,
                wordMastered: true
            }

            let scorelist = this.wordScore.scorelist;
            scorelist.push(score);
            newScore.scorelist = scorelist;
            let totRate = 0;
            scorelist.forEach(element => {
                if (element.wordMastered) {
                    totRate = totRate + element.numberofTries
                }
            });
            newScore.rateGuess = isNaN(totRate / newScore.wordswon) ? 0 : parseInt(totRate / newScore.wordswon);
            this.set("wordScore", newScore);
            localStorage.setItem('wordScore', JSON.stringify(newScore));
            setTimeout(function() {
                $('#enterLettQ').focus();
            }, 500)
        } else {
            if (index1 == 5) {
                alert("Your word is : " + this.wordSelected);

                let newScore = JSON.parse(JSON.stringify(this.wordScore));
                newScore.gamesPlayed = this.wordScore.gamesPlayed + 1;
                newScore.wordsWon = this.wordScore.wordsWon;
                let score = {
                    date: moment().format("YYYY-MM-DD HH:MM:ss"),
                    numberofTries: 0,
                    wordMastered: false
                }

                let scorelist = this.wordScore.scorelist;
                scorelist.push(score);
                newScore.scorelist = scorelist;
                let totRate = 0;
                scorelist.forEach(element => {
                    if (element.wordMastered) {
                        totRate = totRate + element.numberofTries
                    }
                });
                newScore.rateGuess = isNaN(totRate / newScore.wordswon) ? 0 : parseInt(totRate / newScore.wordswon);
                this.set("wordScore", newScore);
                localStorage.setItem('wordScore', JSON.stringify(newScore));
                setTimeout(function() {
                    $('#enterLettQ').focus();
                }, 500)


            }
        }
        if (this.wordSelected !== wordEntered && index1 < 5) {
            setTimeout(function() {
                $('#' + (index1 + 2) + "" + "1").focus();
                console.log("#" + (index1 + 2) + "" + "1")
            }, 300);
        }
    };

    @action resetAll() {
        this.set("wordSelected", this.wordSelectionList[Math.floor(Math.random() * (this.wordSelectionList.length - 1)) + 1].toUpperCase());
        let wordList = [];
        for (let i = 1; i < 7; i++) {
            let objlett = {};
            let lettersList = [];
            for (let j = 1; j < 6; j++) {
                let arr = {
                    id: i + "" + j,
                    val: '',
                    letterPresent: "incorrect"
                }
                arr.disabled = i == 1 ? false : true;
                arr.inputTextButton = i == 1 ? "floralwhite" : "#f2f2f2";

                lettersList.push(arr);
            }
            objlett.lettersList = lettersList;
            objlett.checkButton = i == 1 ? "floralwhite" : "#f2f2f2";
            objlett.checkButtonDisabled = i == 1 ? "all" : "none";
            wordList.push(objlett);
        }
        let alphabetsList = [];
        alphabetsList.push(["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]);
        alphabetsList.push(["A", "S", "D", "F", "G", "H", "J", "K", "L"]);
        alphabetsList.push(["Z", "X", "C", "V", "B", "N", "M"]);
        this.set("alphabetsList", alphabetsList);
        this.set("wordList", wordList);
        const self = this;
        setTimeout(function() {
            wordList.forEach((wrd, index1) => {
                $('#check' + index1).css({ "background-color": wrd.checkButton, "pointer-events": wrd.checkButtonDisabled });
                wrd.lettersList.forEach((lett, ind) => {
                    $('#' + (index1 + 1) + "" + (ind + 1)).css({ "background": lett.inputTextButton });
                });
            });
        }, 1000);
    }

}