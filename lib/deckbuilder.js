const api = require("../api");
const Deck = require("./deck");
const CardError = require("./cardError");

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

module.exports = DeckBuilder;