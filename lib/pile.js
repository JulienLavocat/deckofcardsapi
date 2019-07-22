const api = require("./api");
const Card = require("./card");
const CardError = require("./cardError");

class Pile {

    constructor(deckId, pileName) {
        this.id = deckId;
        this.name = pileName;
    }

    async add(cards) {
        toCardCodeArray(cards);
        try {
            const res = (await api.addToPile(this.id, this.name, cards)).data;
            return res;
        } catch (error) {
            if(error instanceof CardError)
                throw error;
            throw tranformAxiosError(error);
        }
    }
    async shuffle() {
        try {
            const res = (await api.shufflePile(this.id, this.name)).data;

            if (res.success !== true)
                throw new CardError(res.error);

            return res;

        } catch (error) {
            if(error instanceof CardError)
                throw error;
            throw tranformAxiosError(error);
        }
    }
    async list() {
        try {
            const res = (await api.listPile(this.id, this.name)).data;

            if (res.success !== true)
                throw new CardError(res.error);
            if(!res.piles[this.name])
                throw new CardError("Pile does not exist");
            
            const cards = res.piles[this.name].cards;
            if (!cards)
                return [];

            return toCardArray(res.piles[this.name].cards);
        } catch (error) {
            if(error instanceof CardError)
                throw error;
            
            console.log(error.response.data);
            

            throw tranformAxiosError(error);
        }
    }
    async draw(count) {
        try {
            
            const res = (await api.pileDraw(this.id, this.name, count)).data;
            return toCardArray(res.cards);
            
        } catch (error) {
            if(error instanceof CardError)
                throw error;
            throw tranformAxiosError(error);
        }
    }
    async drawBottom(count) {
        try {
            
            const res = (await api.pileDrawBottom(this.id, this.name, count)).data;

            return toCardArray(res.cards);

        } catch (error) {
            if(error instanceof CardError)
                throw error;
            throw tranformAxiosError(error);
        }
    }
    async drawCards(cards) {
        try {
            const res = (await api.pileDrawCards(this.id, this.name, cards)).data;
            return toCardArray(res.cards);
        } catch (error) {
            if(error instanceof CardError)
                throw error;
            throw tranformAxiosError(error);
        }
    }

}

function tranformAxiosError(err) {
    if(err.response) { //Request made but status != 2xx
        const data = err.response.data;
        if(!data.success)
            return new CardError(data.error);
    } else {
        return err;
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