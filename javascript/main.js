const HAND = [];

const DECK = new Deck();
DECK.shuffle();

document.querySelector(".deck").addEventListener("click", dealPlayer);

// Function to flip cards over.
function flipCard(element) {
    HAND.forEach(card => {
        if (element.currentTarget.dataset.id == card.id) {
            let newElement = card.flip();

            newElement.addEventListener("click", flipCard);
            element.currentTarget.replaceWith(newElement);
 
            return;
        }
    });
}

// Function to draw a card from the deck.
function drawCard(players) {
    let deck = document.querySelector(".deck, .deck-2, .deck-1");
    let initalCardsDealt = players * 2;

    for(var i = 0; i < initalCardsDealt; i++){
        if (DECK.cards.length) {
            let card = DECK.draw();
    
            let element = card.element;
            element.addEventListener("click", flipCard);
    
            HAND.push(card);

            if (i <= 1) {
                if (i == 1) {
                    document.querySelector(".dealerhand").appendChild(element);
                    // Need to trigger flip card here to flip this first card since one card is not shown until the end
                    // element.addEventListener("click", flipCard);
                } else { document.querySelector(".dealerhand").appendChild(element); }
            } else{
                document.querySelector(".playerHands").appendChild(element);
            }
    
            let count = deck.querySelector(".count");
            count.innerText = String(DECK.cards.length).padStart(2, '0');
    
            if (DECK.cards.length === 2) {
                deck.classList.remove("deck");
                deck.classList.add("deck-2");
            } else if (DECK.cards.length === 1) {
                deck.classList.remove("deck-2");
                deck.classList.add("deck-1");
            } else if (DECK.cards.length === 0) {
                deck.classList.remove("deck-1");
                deck.classList.add("deck-0");
    
                deck.removeEventListener("click", drawCard);
            }
        }
    }
}

// Function to deal out to a player(AND the dealer) - Added Garrett
function dealPlayer() {
    var playerCount = document.querySelector("#playerCount").value;

    if (playerCount != "") { drawCard(parseInt(playerCount) + 1); } else { drawCard(4 + 1); }
}