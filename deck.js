const api = require("./api");

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
    async addToPile(pileName, cards) {
        toCardCodeArray(cards);
        try {
            const res = (await api.addToPile(this.id, pileName, cards)).data;
            return res;
        } catch (error) {
            throw error;
        }
    }
    async shufflePile(pileName) {
        try {
            const res = (await api.shufflePile(this.id, pileName)).data;

            if (res.success !== true)
                throw new CardError(res.error);

            return res;

        } catch (error) {
            throw error;
        }
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

class DeckBuilder {

    constructor(host = "https://deckofcardsapi.com") {
        this.host = host;
        this.shuffle = true;
        this.opts = {};
    }

    unshuffled() {
        this.shuffle = false;
        return this;
    }
    ofCards(cards) {
        this.opts.cards = cards;
        return this;
    }
    numberOfDeck(count) {
        this.opts.deck_count = count;
        return this;
    }

    standardDeck(host = "https://deckofcardsapi.com") {
        return this.build();
    }

    async fromId(id) {
        try {
            const res = (await api.fetchDeck(id)).data;

            if (res.success !== true)
                throw new CardError(res.error);

            return new Deck(res);
        } catch (error) {
            throw error;
        }
    }

    async build() {
        try {
            const res = (await api.newDeck(this.shuffle, this.opts)).data;
            if (res.success !== true)
                throw new CardError(res.error);
            return new Deck(res);
        } catch (error) {
            throw error;
        }


    }
}

class Card {
    constructor(code, value, suit) {
        this.code = code;
        this.value = value;
        this.suit = suit;
    }

    getCode() {
        return this.code;
    }
    getValue() {
        return this.value;
    }
    getSuit() {
        return this.suit;
    }

    getPNG() {
        return `https://deckofcardsapi.com/static/img/${this.code}.png`;
    }

    getSVG() {
        return `https://deckofcardsapi.com/static/img/${this.code}.svg`;
    }
}

class CardError extends Error {

    constructor(msg) {
        super(msg);
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
module.exports.DeckBuilder = DeckBuilder;