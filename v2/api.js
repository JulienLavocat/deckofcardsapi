const axios = require("./axios");

var host = "https://deckofcardsapi.com";

function newDeck(shuffle, opts) {
	return axios(`${host}/api/deck/new${shuffle ? "/shuffle" : ""}/${buildQueryParams(opts)}`);
}

function fetchDeck(id) {
	return axios(`${host}/api/deck/${id}`);
}

function draw(deckId, count) {
	return axios(`${host}/api/deck/${deckId}/draw/?count=${count}`);
}

function shuffle(deckId) {
	return axios(`${host}/api/deck/${deckId}/shuffle/`);
}

function addToPile(deckId, pileName, cards) {
	return axios(`${host}/api/deck/${deckId}/pile/${pileName}/add/?cards=${cards}`);
}

function listPile(deckId, pileName) {
	return axios(`${host}/api/deck/${deckId}/pile/${pileName}/list`);
}

function shufflePile(deckId, pileName) {
	return axios(`${host}/api/deck/${deckId}/pile/${pileName}/shuffle`);
}

function pileDraw(deckId, pileName, count) {
	return axios(`${host}/api/deck/${deckId}/pile/${pileName}/draw/?count=${count}`);
}

function pileDrawCards(deckId, pileName, cards) {
	return axios(`${host}/api/deck/${deckId}/pile/${pileName}/draw/?cards=${cards}`);
}

function pileDrawBottom(deckId, pileName, count) {
	return axios(`${host}/api/deck/${deckId}/pile/${pileName}/draw/bottom/?count=${count}`);
}

function setApiHost(newHost) {
	host = newHost;
}

function buildQueryParams(object) {
	return "?" + Object.entries(object).map(e => e.join("=")).join("&");
}

module.exports.newDeck = newDeck;
module.exports.fetchDeck = fetchDeck;

module.exports.draw = draw;
module.exports.shuffle = shuffle;

module.exports.addToPile = addToPile;
module.exports.shufflePile = shufflePile;
module.exports.listPile = listPile;
module.exports.pileDraw = pileDraw;
module.exports.pileDrawCards = pileDrawCards;
module.exports.pileDrawBottom = pileDrawBottom;

module.exports.setApiHost = setApiHost;