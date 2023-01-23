// Create a deck of 52 cards.
let deck = [
    new Card(CardData.Rank.Ace, CardData.Suit.Spade),
    new Card(CardData.Rank.Two, CardData.Suit.Spade),
    new Card(CardData.Rank.Three, CardData.Suit.Spade),
    new Card(CardData.Rank.Four, CardData.Suit.Spade),
    new Card(CardData.Rank.Five, CardData.Suit.Spade),
    new Card(CardData.Rank.Six, CardData.Suit.Spade),
    new Card(CardData.Rank.Seven, CardData.Suit.Spade),
    new Card(CardData.Rank.Eight, CardData.Suit.Spade),
    new Card(CardData.Rank.Nine, CardData.Suit.Spade),
    new Card(CardData.Rank.Ten, CardData.Suit.Spade),
    new Card(CardData.Rank.Jack, CardData.Suit.Spade),
    new Card(CardData.Rank.Queen, CardData.Suit.Spade),
    new Card(CardData.Rank.King, CardData.Suit.Spade),
    new Card(CardData.Rank.Ace, CardData.Suit.Heart),
    new Card(CardData.Rank.Two, CardData.Suit.Heart),
    new Card(CardData.Rank.Three, CardData.Suit.Heart),
    new Card(CardData.Rank.Four, CardData.Suit.Heart),
    new Card(CardData.Rank.Five, CardData.Suit.Heart),
    new Card(CardData.Rank.Six, CardData.Suit.Heart),
    new Card(CardData.Rank.Seven, CardData.Suit.Heart),
    new Card(CardData.Rank.Eight, CardData.Suit.Heart),
    new Card(CardData.Rank.Nine, CardData.Suit.Heart),
    new Card(CardData.Rank.Ten, CardData.Suit.Heart),
    new Card(CardData.Rank.Jack, CardData.Suit.Heart),
    new Card(CardData.Rank.Queen, CardData.Suit.Heart),
    new Card(CardData.Rank.King, CardData.Suit.Heart),
    new Card(CardData.Rank.Ace, CardData.Suit.Club),
    new Card(CardData.Rank.Two, CardData.Suit.Club),
    new Card(CardData.Rank.Three, CardData.Suit.Club),
    new Card(CardData.Rank.Four, CardData.Suit.Club),
    new Card(CardData.Rank.Five, CardData.Suit.Club),
    new Card(CardData.Rank.Six, CardData.Suit.Club),
    new Card(CardData.Rank.Seven, CardData.Suit.Club),
    new Card(CardData.Rank.Eight, CardData.Suit.Club),
    new Card(CardData.Rank.Nine, CardData.Suit.Club),
    new Card(CardData.Rank.Ten, CardData.Suit.Club),
    new Card(CardData.Rank.Jack, CardData.Suit.Club),
    new Card(CardData.Rank.Queen, CardData.Suit.Club),
    new Card(CardData.Rank.King, CardData.Suit.Club),
    new Card(CardData.Rank.Ace, CardData.Suit.Diamond),
    new Card(CardData.Rank.Two, CardData.Suit.Diamond),
    new Card(CardData.Rank.Three, CardData.Suit.Diamond),
    new Card(CardData.Rank.Four, CardData.Suit.Diamond),
    new Card(CardData.Rank.Five, CardData.Suit.Diamond),
    new Card(CardData.Rank.Six, CardData.Suit.Diamond),
    new Card(CardData.Rank.Seven, CardData.Suit.Diamond),
    new Card(CardData.Rank.Eight, CardData.Suit.Diamond),
    new Card(CardData.Rank.Nine, CardData.Suit.Diamond),
    new Card(CardData.Rank.Ten, CardData.Suit.Diamond),
    new Card(CardData.Rank.Jack, CardData.Suit.Diamond),
    new Card(CardData.Rank.Queen, CardData.Suit.Diamond),
    new Card(CardData.Rank.King, CardData.Suit.Diamond)
]

// Add the entire deck to your hand randomly, and randomly flip.
let hand = document.querySelector(".hand");
deck.sort(() => Math.random() - 0.5).forEach(card => {
    flip = (Math.floor(Math.random() * 2) == 0)
    if (flip) {
        card.flip();
    }

    element = card.element;

    element.addEventListener("click", flipCard);
    hand.appendChild(element);
});

// Function to flip cards over.
function flipCard(element) {
    deck.forEach(card => {
        if (element.currentTarget.dataset.id == card.id) {
            let newElement = card.flip();
            newElement.addEventListener("click", flipCard);
            element.currentTarget.replaceWith(newElement);

            return;
        }
    });
}