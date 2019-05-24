const axios = require("axios").default;

var host = "https://deckofcardsapi.com";

function newDeck(shuffle, opts) {
    return axios.get(`${host}/api/deck/new${shuffle ? "/shuffle" : ""}/${buildQueryParams(opts)}`);
}

function fetchDeck(id) {
    return axios.get(`${host}/api/deck/${id}`);
}

function draw(deckId, count) {
    return axios.get(`${host}/api/deck/${deckId}/draw/?count=${count}`);
}

function shuffle(deckId) {
    return axios.get(`${host}/api/deck/${deckId}/shuffle/`);
}

function addToPile(deckId, pileName, cards) {
    return axios.get(`${host}/api/deck/${deckId}/pile/${pileName}/add/?cards=${cards}`);
}
function listPile(deckId, pileName) {
    return axios.get(`${host}/api/deck/${deckId}/pile/${pileName}/shuffle`);
}
function shufflePile(deckId, pileName) {

}
function pileDraw(deckId, pileName, count) {

}
function pileDrawCards(deckId, pileName, cards) {

}
function pileDrawBottom(deckId, pileName, count) {

}
function pileDrawCardsBottom(deckId, pileName, cards) {

}

function setApiHost(newHost) {
    host = newHost;
}

function buildQueryParams(object) {
    return "?" + Object.entries(object).map(e => e.join('=')).join('&');
}

module.exports.newDeck = newDeck;
module.exports.fetchDeck = fetchDeck;
module.exports.draw = draw;
module.exports.shuffle = shuffle;
module.exports.addToPile = addToPile;
module.exports.shufflePile = shufflePile;
module.exports.setApiHost = setApiHost;