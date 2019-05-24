
# deckofcardsapi-client

Promise-based NodeJS Client for https://deckofcardsapi.com. Supporting default instance (https://deckofcardsapi.com) or a custom one.

## Usage

Here is a basic exemple, for more detailed informations, see wiki.

```javascript

const  DeckBuilder  =  require("./lib/deckbuilder");

try {

	//Create a new shuffled deck of 52 cards
	const  deck  =  await  new  DeckBuilder().standardDeck();
	
	//Draw 5 cards from deck
	const hand = await deck.draw(5);	

	//Shuffle or reshuffle the deck
	await deck.shuffle();

	//Create a new pile nammed "discard"
	const discardPile = await deck.getPile("discard");

	//Add hand to discard pile
	await discardPile.add(hand);

	//List pile content
	console.log(await discardPile.list());
	

} catch (error) {

	console.log(error);

}

``

