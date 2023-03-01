class BlackjackHand extends BlackjackElement {
    // Constructor for this class.
    constructor() {
        super();

        this.dataset.uuid = this._uuid();
    }

    // Getter to get all cards in the hand.
    get cards() {
        return this.querySelectorAll(".cards blackjack-card");
    }

    // Getter to get the shoe's UUID.
    get uuid() {
        return this.dataset.uuid;
    }

    // Callback for when HTML element in created.
    connectedCallback() {
        let ul = this.appendChild(document.createElement("ul"));
        ul.classList.add("cards");
    }

    // Function to add a card to the hand.
    add(card, flip = true) {
        // Exit if card is not passed in.
        if (!card) {
            return;
        }

        let li = this.querySelector(".cards").appendChild(document.createElement("li"));
        li.appendChild(card);

        // TODO: Why is setTimeout needed?
        if (flip) {
            setTimeout(function () {
                card.flip();
            }.bind(this), 250);
        }
    }

    // Function to remove all cards from the hand.
    clear() {
        this.cards.forEach((card) => {
            card.parentElement.remove();
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

            // Skip if the card is an ace and add it the the counter for later.
            if (card.rank == CardData.rank.ace) {
                aceCount++;
                return;
            }

            lowTotal += card.rank.value;
            highTotal += card.rank.value;
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

customElements.define("blackjack-hand", BlackjackHand); // Bind elements of <blackjack-hand> to this class.