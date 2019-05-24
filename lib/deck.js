const api = require("../api");
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

    //TODO - Critical: Adding error managment
    //TODO - QOL: Moving Pile-related code to it's own class

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
    async listPile(pileName) {
        try {
            const res = (await api.listPile(this.id, pileName)).data;

            if (res.success !== true)
                throw new CardError(res.error);
            if(!res.piles[pileName])
                throw new CardError("Pile does not exist");
            
            const cards = res.piles[pileName].cards;
            if (!cards)
                return [];

            return toCardArray(res.piles[pileName].cards);
        } catch (error) {
            throw error;
        }
    }
    async shufflePile(pileName) {
        try {
            const res = (await api.shufflePile(this.id, pileName)).data;

            if(res.success !== true)
                throw new CardError(res.error);
            
            return res;
        } catch (error) {
            throw error;
        }
    }
    async drawFromPile(pileName, count) {
        try {
            
            const res = (await api.pileDraw(this.id, pileName, count)).data;
            return toCardArray(res.cards);
            
        } catch (error) {
            throw error;
        }
    }
    async drawFromPileBottom(pileName, count) {
        try {
            
            const res = (await api.pileDrawBottom(this.id, pileName, count)).data;

            return toCardArray(res.cards);

        } catch (error) {
            throw error;
        }
    }
    async drawCardsFromPile(pileName, cards) {
        try {
            const res = (await api.pileDrawCards(this.id, pileName, cards)).data;
            return toCardArray(res.cards);
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