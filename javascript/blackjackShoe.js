class BlackjackShoe extends HTMLElement {
    constructor(decks = 3) {
        super();

        this.dataset.decks = this.dataset.decks || decks;
        this.dataset.uuid = uuid();
    }

    // Getter to get all the cards in the shoe.
    get cards() {
        return Array.from(this.querySelectorAll("blackjack-card")).reverse();
    }

    // Getter to get the number of decks the shoe started with.
    get decks() {
        return this.dataset.decks;
    }

    // Getter to get the shoe's UUID.
    get uuid() {
        return this.dataset.uuid;
    }

    // Callback for when HTML element in created.
    connectedCallback() {
        let ul = this.appendChild(document.createElement("ul"));
        ul.classList.add("cards");

        for (let i = 0; i < this.decks; i++) {
            Object.values(CardData.Suit).forEach(suit => {
                Object.values(CardData.Rank).forEach(rank => {
                    let li = ul.insertBefore(document.createElement("li"), ul.firstChild);
                    li.appendChild(new BlackjackCard(rank, suit, true));
                });
            });
        }
    }

    // Function to shuffle the card oder in the shoe.
    shuffle() {
        // Exit if no cards in shoe.
        if (!this.cards.length) {
            return;
        }

        let ul = this.querySelector(".cards");

        for (let i = ul.children.length; i >= 0; i--) {
            ul.appendChild(ul.children[Math.random() * i | 0]);
        }
    }

    // Function to remove draw a card from the shoe.
    draw() {
        // Exit if no cards in shoe.
        if (!this.cards.length) {
            return;
        }

        let card = this.cards[0];
        let li = card.parentElement.remove();

        return card;
    }
}

customElements.define("blackjack-shoe", BlackjackShoe); // Bind elements of <blackjack-shoe> to this class.