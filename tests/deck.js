require("chai").should();

const CardsClient = require("../index");

describe("Deck", () => {
	const client = new CardsClient("https://cards.thebad.xyz");

	it("Should correctly draw between 1-6 cards", async () => {

		const deck = await client.createDeck().unshuffled().build();
		deck.isShuffled().should.equals(false);

		const amount = Math.floor(Math.random() * 6) + 1;
		const hand = await deck.draw(amount);
		
		hand.length.should.equals(amount);
		deck.getRemaining().should.equals(52 - amount);

	});

	/**
	 * This can result in a false negative with a probability of a 0.0000023
	 */
	it("Should shuffle the deck", async () => {
		
		const deck = await client.createDeck().unshuffled().build();
		deck.isShuffled().should.equals(false);

		let hand = await deck.draw(6);

		const validationCards = ["AS", "2S", "3S", "4S", "5S", "6S"];
		for(let i in validationCards)
			hand[i].code.should.equals(validationCards[i]);


		await deck.shuffle();
		deck.isShuffled().should.equals(true);
		deck.getRemaining().should.equals(52);

		hand = await deck.draw(6);

		let isShuffled = false;
		for(let i in validationCards)
			if(hand[i].code !== validationCards[i]) isShuffled = true;
		
		isShuffled.should.equals(true);
	});

	it("Should create a new pile", async () => {
		const deck = await client.createDeck().build();

		const pile = deck.getPile("testPile");

	});
});

function beginTests(deck) {
	it("Should return a likely-valid deck id", async () => {
		
	});
	it("Should return the remaining cards in the deck", async () => {
		
	});
	it("Should say if the deck is valid", async () => {
		
	});
}