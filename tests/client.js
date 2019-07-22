const CardsClient = require("../index");

require("chai").should();

describe("CardsClient", () => {

	it("Should create a valid default CardsClient", (done) => {
		const cc = new CardsClient();

		cc.getHost().should.equals("https://deckofcardsapi.com");
		cc.createDeck().host.should.equals("https://deckofcardsapi.com");

		done();
	});

	it("Should create a valid CardsClient with custom instance", (done) => {
		const testHost = "https://example.com"
		const cc = new CardsClient(testHost);

		cc.getHost().should.equals(testHost);
		cc.createDeck().host.should.equals(testHost);

		done();
	});

	it("Should be able to set a new instance to use", (done) => {

		const cc = new CardsClient();
		const testHost = "https://example.com";
		
		cc.setHost(testHost);

		cc.getHost().should.equals(testHost);
		cc.createDeck().host.should.equals(testHost);

		done();
	});

});