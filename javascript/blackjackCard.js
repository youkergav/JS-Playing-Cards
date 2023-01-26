class BlackjackCard extends HTMLElement {
    constructor(rank, suit, facedown = false) {
        super();

        this.uuid = this.uuid();
        this.rank = rank;
        this.suit = suit;
        this.facedown = facedown;
    }

    connectedCallback() {
        if (this.querySelector(".content")) return;

        let content = this.appendChild(document.createElement("div"));
        content.classList.add("content");
        content.classList.add(this.facedown ? "facedown" : "faceup");

        let back = content.appendChild(document.createElement("div"));
        back.classList.add("back");

        let front = content.appendChild(document.createElement("div"));
        front.classList.add("front");
        front.classList.add(this.suit.Name.toLowerCase());

        let rank = front.appendChild(document.createElement("span"));
        rank.classList.add("rank");
        rank.innerText = this.rank.Symbol;

        let suit = front.appendChild(document.createElement("span"));
        suit.classList.add("suit");
        suit.innerText = this.suit.Symbol;
    }

    uuid() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    flip() {
        this.querySelector(".content").classList.toggle("flip");
        this.facedown = !this.facedown;

        this.clickable = false;
    }
};

customElements.define("blackjack-card", BlackjackCard);