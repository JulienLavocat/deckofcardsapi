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

module.exports = Card;