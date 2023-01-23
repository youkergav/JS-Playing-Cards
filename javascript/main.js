let hand = [];

let deck = new Deck();
deck.shuffle();

document.querySelector("#deck").addEventListener("click", drawCard);

// Function to flip cards over.
function flipCard(element) {
    hand.forEach(card => {
        if (element.currentTarget.dataset.id == card.id) {
            let newElement = card.flip();

            newElement.addEventListener("click", flipCard);
            element.currentTarget.replaceWith(newElement);

            return;
        }
    });
}

function drawCard(element) {
    let card = deck.draw();

    if(card) {
        hand.push(card);

        let newElement = card.element;
        newElement.addEventListener("click", flipCard);

        document.querySelector(".hand").appendChild(newElement);
    }
}