class Card {
    constructor(rank, suit, faceup = true) {
        this.id = this.uuid();
        this.rank = rank;
        this.suit = suit;
        this.faceup = faceup;
    }

    get element() {
        let card = document.createElement("div");

        card.classList.add("card")
        card.dataset.id = this.id;

        if (this.faceup) {
            let content = document.createElement("div");
            content.classList.add("content");
            content.classList.add(this.suit.Name.toLowerCase());

            let rank = document.createElement("span");
            rank.classList.add("rank");
            rank.innerText = this.rank.Symbol;
            content.appendChild(rank);

            let suit = document.createElement("span");
            suit.classList.add("suit");
            suit.innerText = this.suit.Symbol
            content.appendChild(suit);

            card.appendChild(content);
        } else {
            let content = document.createElement("div");
            content.classList.add("content");
            content.classList.add("back");

            card.appendChild(content);
        }

        return card;
    }

    flip() {
        this.faceup = !this.faceup;
        return this.element;
    }

    uuid() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }
}

const CardData = {
    Rank: {
        Ace: {
            Symbol: "A",
            Value: 1
        },
        Two: {
            Symbol: "2",
            Value: 2
        },
        Three: {
            Symbol: "3",
            Value: 3
        },
        Four: {
            Symbol: "4",
            Value: 4
        },
        Five: {
            Symbol: "5",
            Value: 5
        },
        Six: {
            Symbol: "6",
            Value: 6
        },
        Seven: {
            Symbol: "7",
            Value: 7
        },
        Eight: {
            Symbol: "8",
            Value: 8
        },
        Nine: {
            Symbol: "9",
            Value: 9
        },
        Ten: {
            Symbol: "10",
            Value: 9
        },
        Jack: {
            Symbol: "J",
            Value: 11
        },
        Queen: {
            Symbol: "Q",
            Value: 12
        },
        King: {
            Symbol: "K",
            Value: 13
        }
    },

    Suit: {
        Spade: {
            Name: "Spade",
            Symbol: "\u2660"
        },
        Heart: {
            Name: "Heart",
            Symbol: "\u2665"
        },
        Club: {
            Name: "Club",
            Symbol: "\u2663"
        },
        Diamond: {
            Name: "Diamond",
            Symbol: "\u2666"
        }
    }
}