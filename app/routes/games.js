import Route from '@ember/routing/route';
import { hash } from "rsvp";

export default class GamesRoute extends Route {

    init() {
        super.init(...arguments);
    };

    model() {

        return hash({
            wordSelectionList: fetch("api/wordSelectionList.json")
                .then(function(res) { return res.json() }),
            wordMasterList: fetch('api/wordMasterList.json')
                .then(function(res) { return res.json() }),

            // wordSelectionList: ["hello", "adieu", "stomp"],
            // .then(function(res) { return res.json() }),
            // wordMasterList: ["hello", "adieu", "stomp"]
            // .then(function(res) { return res.json() }),
        });
    }

    setupController(controller, model) {
        console.log(model)
        controller.set('wordSelectionList', model.wordSelectionList);
        controller.set('wordMasterList', model.wordMasterList);
        controller.set("wordSelected", model.wordSelectionList[Math.floor(Math.random() * (model.wordSelectionList.length - 1)) + 1].toUpperCase());
        console.log(model.wordSelectionList[Math.floor(Math.random() * (model.wordSelectionList.length - 1)) + 1].toUpperCase());
        // if (localStorage.getItem('queryList*)){
        //this.set ("queryList", JSON.parse (localStorage.getItem (' queryList')));
        // console.log("localStorage.getItem", localStorage):
        if (localStorage.getItem('wordScore')) {
            console.log("localStorage.getItem", JSON.parse(localStorage.getItem('wordScore')));
        } else {
            let score = {
                date: moment().format('YY-MM-DD HH:MM:ss'),
                numberOfTries: 0,
                wordMastered: false
            }
            let scorelist = [];
            scorelist.push(score)
            let wordScore = {};
            wordScore.scorelist = scorelist;
            wordScore.gamesPlayed = 0;
            wordScore.wordsWon = 0;
            wordScore.rateGuess = 0;
            wordScore.name = "Player";
            localStorage.setItem('wordScore', JSON.stringify(wordScore));
            controller.set("wordScore", JSON.parse(localStorage.getItem('wordScore')));
        }
    }

}