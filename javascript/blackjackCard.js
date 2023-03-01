class BlackjackCard extends BlackjackElement {
    // Constructor for this class.
    constructor(rank, suit, facedown = false) {
        super();

        this.dataset.uuid = this._uuid();
        this.dataset.rank = this.dataset.rank || rank?.name || "Jack";
        this.dataset.suit = this.dataset.suit || suit?.name || "Spade";

        this.dataset.facedown = this.dataset.facedown || facedown;
    }

    // Getter to get the rank of the card.
    get rank() {
        return CardData.rank[this.dataset.rank.toLowerCase()];
    }

    // Getter to get the suit of the card.
    get suit() {
        return CardData.suit[this.dataset.suit.toLowerCase()];
    }

    // Getter to get if the card is facedown (boolean).
    get facedown() {
        return ["true", "t", "yes", "y", "1"].includes(this.dataset.facedown.toLowerCase());
    }

    // Setter to update the facedown status (boolean).
    set facedown(value) {
        this.dataset.facedown = value;
    }

    // Getter to get the card's UUID.
    get uuid() {
        return this.dataset.uuid;
    }

    // Callback for when HTML element in created.
    connectedCallback() {
        if (this.querySelector(".content")) return;

        let content = this.appendChild(document.createElement("div"));
        content.classList.add("content");
        content.classList.add(this.facedown == true ? "facedown" : "faceup");

        let back = content.appendChild(document.createElement("div"));
        back.classList.add("back");

        let front = content.appendChild(document.createElement("div"));
        front.classList.add("front");
        front.classList.add(this.suit.name.toLowerCase());

        let rank = front.appendChild(document.createElement("span"));
        rank.classList.add("rank");
        rank.innerText = this.rank.symbol;

        let suit = front.appendChild(document.createElement("span"));
        suit.classList.add("suit");
        suit.innerText = this.suit.symbol;
    }

    // Function to flip the card over and update the facedown status.
    flip() {
        this.querySelector(".content").classList.toggle("flip");
        this.facedown = !this.facedown;
    }
};

customElements.define("blackjack-card", BlackjackCard); // Bind elements of <blackjack-card> to this class.