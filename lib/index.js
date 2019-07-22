const DeckBuilder = require("./deckBuilder");

module.exports = class CardsClient {

	constructor(host = "https://deckofcardsapi.com") {
		this.host = host;
		this.deckBuilder = new DeckBuilder(this.host);
	}

	createDeck() {
		return this.deckBuilder;
	}

	setHost(host) {
		this.host = host;
		this.deckBuilder.setHost(host);
	}
	getHost() {
		return this.host;
	}

}
