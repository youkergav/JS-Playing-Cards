class BlackjackShoe extends HTMLElement {
    constructor(decks = 3) {
        super();

        this.uuid = this.uuid();
        this.decks = decks;
        this.clickable = true;
    }

    get cards() {
        return Array.from(this.querySelectorAll("blackjack-card")).reverse();
    }

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

        this.addEventListener("click", this.draw.bind(this));
    }

    uuid() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    shuffle() {
        let ul = this.querySelector(".cards");

        for (let i = ul.children.length; i >= 0; i--) {
            ul.appendChild(ul.children[Math.random() * i | 0]);
        }
    }

    draw() {
        if (!this.clickable) return;
        if (!this.cards.length) return;

        let card = this.cards[0];
        let li = card.parentElement;

        this.parentElement.appendChild(card);
        li.remove();

        setTimeout(function () {
            card.flip();
        }.bind(this), 250);
    }
}

customElements.define("blackjack-shoe", BlackjackShoe);