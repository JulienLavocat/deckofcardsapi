const CardsClient = require("./lib");

const client = new CardsClient();

test();

async function test() {
	try {
		const deck = await client.createDeck().fromId("rxj4xffoyla9");
		console.log(deck.id);
		deck.draw(2);

		const discard = await deck.getPile("discard");
		console.log(await discard.list());
		discard.add(await deck.draw(2));
		console.log(await discard.list());

	} catch (error) {
		console.log(error);
	}
}