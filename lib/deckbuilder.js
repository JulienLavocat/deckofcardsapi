const CardsAPI = require("./api");
const Deck = require("./deck");
const CardError = require("./cardError");

class DeckBuilder {

	constructor(host) {
		this.host = host;
		this.shuffle = true;
		this.opts = {};
		this.api = new CardsAPI(host);
	}

	unshuffled() {
		this.shuffle = false;
		return this;
	}
	from(cards) {
		this.opts.cards = cards;
		return this;
	}
	numberOfDeck(count) {
		this.opts.deck_count = count;
		return this;
	}

	async fromId(id) {
		const res = (await this.api.fetchDeck(id)).data;

		if (res.success !== true)
			throw new CardError(res.error);

		this.reset();

		return new Deck(res, this.host);
	}

	async build() {
		const res = (await this.api.newDeck(this.shuffle, this.opts)).data;
		if (res.success !== true)
			throw new CardError(res.error);

		this.reset();

		return new Deck(res, this.host);
	}

	setHost(host) {
		this.host = host;
	}

	reset() {
		this.shuffle = true;
		this.opts = {};
	}
}

module.exports = DeckBuilder;