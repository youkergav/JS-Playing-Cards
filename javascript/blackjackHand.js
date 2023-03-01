class BlackjackHand extends HTMLElement {
    constructor() {
        super();

        this.uuid = this.uuid();
    }

    // Getter to get all cards in the hand.
    get cards() {
        return Array.from(this.querySelectorAll(".cards blackjack-card")).reverse();
    }

    connectedCallback() {
        let ul = this.appendChild(document.createElement("ul"));
        ul.classList.add("cards");
    }

    uuid() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    // Function to add a card to the hand.
    add(card, flip = true) {
        let li = this.querySelector(".cards").appendChild(document.createElement("li"));
        li.appendChild(card);

        if (flip) {
            setTimeout(function () {
                card.flip();
            }.bind(this), 250);
        }
    }

    // Function to remove all cards from the hand.
    clear() {
        this.cards.forEach((card) => {
            card.remove();
        });
    }

    // Function to get the score of the hand.
    calcScore() {
        var lowTotal = 0;
        var highTotal = 0;
        var aceCount = 0;

        // Calculate static card values.
        this.cards.forEach((card) => {
            // Skip if card is facedown.
            if (card.facedown) {
                return;
            }

            // Skip is card is an ace and add it the the counter for later.
            if (card.rank == CardData.Rank.Ace) {
                aceCount++;
                return;
            }

            lowTotal += card.rank.Value;
            highTotal += card.rank.Value;
        });

        // Calculate ace card values.
        for (var i = 0; i < aceCount; i++) {
            // For the first ace, add 11 to the high count.
            if (i == 0) {
                lowTotal += 1;
                highTotal += 11;

                continue;
            }

            lowTotal += 1;
            highTotal += 1;
        }

        // Return the high-low total based on optimal conditions.
        if (aceCount == 0 || highTotal > 21 || lowTotal == highTotal) {
            return [lowTotal];
        } else if (highTotal == 21) {
            return [highTotal];
        } else {
            return [lowTotal, highTotal]
        }
    }
}

customElements.define("blackjack-hand", BlackjackHand);