const CardsClient = require("../index");

describe("DeckBuilder", () => {
	const deckBuilder = new CardsClient("https://cards.thebad.xyz").createDeck();

	let savedDeckId = "";

	it("Should create a standard, shuffled Deck", async () => {
		const deck = await deckBuilder.build();

		savedDeckId = deck.getId();

		deck.isShuffled().should.equals(true);
		deck.getRemaining().should.equals(52);

	});
	it("Should create a standard, unshuffled deck", async () => {
		const deck = await deckBuilder.unshuffled().build();

		deck.isShuffled().should.equals(false);
		deck.getRemaining().should.equals(52);
	});
	it("Should create a new deck composed of 2 standard decks", async () => {
		const deck = await deckBuilder.numberOfDeck(2).build();

		deck.isShuffled().should.equals(true);
		deck.getRemaining().should.equals(104);
	});
	it("Should create a partial deck with all aces", async () => {
		const deck = await deckBuilder.from(["AS", "AH", "AC", "AD"]).build();

		deck.isShuffled().should.equals(true);
		deck.getRemaining().should.equals(4);
	})
	it("Should retrieve a valid standard deck from id", async () => {
		const deck = await deckBuilder.fromId(savedDeckId);

		deck.getId().should.equals(savedDeckId);
		deck.isShuffled().should.equals(true);
		deck.getRemaining().should.equals(52);
	});

});