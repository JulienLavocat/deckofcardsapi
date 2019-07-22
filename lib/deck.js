const CardsAPI = require("./api");
const Pile = require("./pile");
const Card = require("./card");
const CardError = require("./cardError");

class Deck {

	constructor(opts, host) {
		this.id = opts.deck_id;
		this.remaining = opts.remaining;
		this.shuffled = opts.shuffled;
		this.api = new CardsAPI(host);
	}

	async draw(count) {
		const res = (await this.api.draw(this.id, count)).data;

		if (res.success !== true)
			throw new CardError(res.error);

		this.remaining = res.remaining;

		return toCardArray(res.cards);
	}
	async shuffle() {
		const res = (await this.api.shuffle(this.id)).data;

		if (res.success !== true)
			throw new CardError(res.error);

		this.remaining = res.remaining;
		this.shuffled = true;
	}

	async getPile(pileName) {
		await this.api.addToPile(this.id, pileName, []);
		return new Pile(this.id, pileName, this.api.host);
	}
	getId() {
		return this.id;
	}
	getRemaining() {
		return this.remaining;
	}
	isShuffled() {
		return this.shuffled;
	}

}

function toCardArray(cards) {
	const result = [];
	cards.forEach(data => result.push(new Card(data.code, data.value, data.suit)));
	return result;
}

function toCardCodeArray(cards) {
	for (let i in cards)
		cards[i] = cards[i].getCode();
}

module.exports = Deck;