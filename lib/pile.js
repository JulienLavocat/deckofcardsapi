const Card = require("./card");
const CardError = require("./cardError");
const CardsAPI = require("./api");

class Pile {

	constructor(deckId, pileName, host) {
		this.id = deckId;
		this.name = pileName;
		this.api = new CardsAPI(host);
	}

	async add(cards) {
		toCardCodeArray(cards);
		const res = (await this.api.addToPile(this.id, this.name, cards)).data;
		return res;
	}
	async shuffle() {
		const res = (await this.api.shufflePile(this.id, this.name)).data;

		if (res.success !== true)
			throw new CardError(res.error);

		return res;
	}
	async list() {
		const res = (await this.api.listPile(this.id, this.name)).data;
		if (res.success !== true)
			throw new CardError(res.error);
		if (!res.piles[this.name])
			throw new CardError("Pile does not exist");

		const cards = res.piles[this.name].cards;
		if (!cards)
			return [];

		return toCardArray(res.piles[this.name].cards);
	}
	async draw(count) {
		const res = (await this.api.pileDraw(this.id, this.name, count)).data;
		return toCardArray(res.cards);
	}
	async drawBottom(count) {
		const res = (await this.api.pileDrawBottom(this.id, this.name, count)).data;
		return toCardArray(res.cards);
	}
	async drawCards(cards) {
		const res = (await this.api.pileDrawCards(this.id, this.name, cards)).data;
		return toCardArray(res.cards);
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

module.exports = Pile;