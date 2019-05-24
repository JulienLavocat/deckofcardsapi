const api = require("./api");
const Pile = require("./pile");
const Card = require("./card");
const CardError = require("./cardError");

class Deck {

    constructor(opts) {
        this.id = opts.deck_id;
        this.remaining = opts.remaining;
        this.shuffled = opts.shuffled;
    }

    async draw(count) {
        try {
            const res = (await api.draw(this.id, count)).data;

            if (res.success !== true)
                throw new CardError(res.error);

            this.remaining = res.remaining;

            return toCardArray(res.cards);
        } catch (error) {
            throw error;
        }
    }
    async shuffle() {
        try {
            const res = (await api.shuffle(this.id)).data;

            if (res.success !== true)
                throw new CardError(res.error);

            this.remaining = res.remaining;
            this.shuffled = true;

        } catch (error) {
            throw error;
        }
    }

    async getPile(pileName) {
        await api.addToPile(this.id, pileName, []);
        return new Pile(this.id, pileName);
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