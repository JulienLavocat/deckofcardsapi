const axios = require("./axios");

class CardsAPI {

	constructor(host) {
		this.host = host;
	}

	newDeck(shuffle, opts) {
		return axios(`${this.host}/api/deck/new${shuffle ? "/shuffle" : ""}/${buildQueryParams(opts)}`);
	}

	fetchDeck(id) {
		return axios(`${this.host}/api/deck/${id}/`);
	}

	draw(deckId, count) {
		return axios(`${this.host}/api/deck/${deckId}/draw/?count=${count}`);
	}

	shuffle(deckId) {
		return axios(`${this.host}/api/deck/${deckId}/shuffle/`);
	}

	addToPile(deckId, pileName, cards) {
		return axios(`${this.host}/api/deck/${deckId}/pile/${pileName}/add/?cards=${cards}`);
	}

	listPile(deckId, pileName) {
		return axios(`${this.host}/api/deck/${deckId}/pile/${pileName}/list/`);
	}

	shufflePile(deckId, pileName) {
		return axios(`${this.host }/api/deck/${deckId}/pile/${pileName}/shuffle/`);
	}

	pileDraw(deckId, pileName, count) {
		return axios(`${this.host }/api/deck/${deckId}/pile/${pileName}/draw/?count=${count}`);
	}

	pileDrawCards(deckId, pileName, cards) {
		return axios(`${this.host }/api/deck/${deckId}/pile/${pileName}/draw/?cards=${cards}`);
	}

	pileDrawBottom(deckId, pileName, count) {
		return axios(`${this.host }/api/deck/${deckId}/pile/${pileName}/draw/bottom/?count=${count}`);
	}
}

module.exports = CardsAPI;

function buildQueryParams(opts) {
	return "?" + Object.entries(opts).map(e => e.join("=")).join("&");
}