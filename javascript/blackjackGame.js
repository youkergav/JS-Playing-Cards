// Define global variables
let shoe = document.querySelector("blackjack-shoe");
let playerHand = document.querySelector("blackjack-hand.player");
let dealerHand = document.querySelector('blackjack-hand.dealer');
let bankroll = document.getElementById("bankroll").value;
let balance = document.getElementById("balance");
let bet = document.getElementById("bet").value;
let firstGame = true;

// Disable all buttons except the play button.
document.getElementById("hit").disabled = true;
document.getElementById("stand").disabled = true;
document.getElementById("double").disabled = true;
document.getElementById("split").disabled = true;
document.getElementById("surrender").disabled = true;

// Attach event listeners to buttons.
document.getElementById("startGame").addEventListener("click", startGame);
document.getElementById("hit").addEventListener("click", hit);
document.getElementById("stand").addEventListener("click", stand);
document.getElementById("double").addEventListener("click", double);
document.getElementById("split").addEventListener("click", split);
document.getElementById("surrender").addEventListener("click", surrender);
document.getElementById("bankroll").addEventListener("input", (event) => {
    balance.value = event.target.value;
});

function startGame() {
    if (firstGame) {
        balance.setAttribute('value', bankroll);
        shoe.shuffle(); // Shuffle the cards in the shoe.

        firstGame = false;
    }

    // Remove card for all players.
    playerHand.clear();
    dealerHand.clear();

    // Draw new hands for all players.
    setTimeout(() => { playerHand.add(shoe.draw()) }, 200);
    setTimeout(() => { playerHand.add(shoe.draw()) }, 400);
    setTimeout(() => { dealerHand.add(shoe.draw(), flip = false) }, 400);
    setTimeout(() => { dealerHand.add(shoe.draw()) }, 600);

    // Calculate initial scores for all players.
    setTimeout(() => { document.querySelector("#playerValue").innerText = playerHand.calcScore(); }, 600);
    setTimeout(() => { document.querySelector("#dealerValue").innerText = dealerHand.calcScore(); }, 1000);

    // Disable setup input, and enable game buttons.
    document.getElementById("bankroll").disabled = true;
    document.getElementById("balance").disabled = true;
    document.getElementById("hit").disabled = false;
    document.getElementById("stand").disabled = false;
    document.getElementById("double").disabled = false;
    document.getElementById("split").disabled = false;
    document.getElementById("surrender").disabled = false;
}

function hit() {
    // Add a card to the player's hand and update score. TODO: Check if there is a bust.
    playerHand.add(shoe.draw());

    setTimeout(() => { document.querySelector("#playerValue").innerText = playerHand.calcScore() }, 100);
}

function stand() {
    // Dealer hits until hand value is 17 or greater
    while (getHandValue(dealer) < 17) {
        dealer.push(getCard());
        document.getElementById("dealer").textContent = dealer.join(", ");
    }

    // Check for bust
    if (getHandValue(dealer) > 21) {
        document.getElementById("dealer").textContent = dealer.join(", ");
        endGame("Dealer busts! You win.");
        balance.value = parseInt(balance.value) + parseInt(bet.value);
        return;
    }

    // Compare hand values
    if (getHandValue(hand) > getHandValue(dealer)) {
        document.getElementById("dealer").textContent = dealer.join(", ");
        endGame("You win!");
        balance.value = parseInt(balance.value) + parseInt(bet.value);
    } else if (getHandValue(hand) < getHandValue(dealer)) {
        document.getElementById("dealer").textContent = dealer.join(", ");
        endGame("Dealer wins.");
        balance.value = parseInt(balance.value) - parseInt(bet.value);
    } else {
        document.getElementById("dealer").textContent = dealer.join(", ");
        endGame("It's a push!");
        balance.value = balance.value;
    }
}

function double() {
    // if (hitCount < 1) {
    // Add a card to player's hand
    hand.push(getCard());
    document.getElementById("hand").textContent = hand.join(", ");

    // Check for bust
    if (getHandValue(hand) > 21) {
        document.getElementById("dealer").textContent = dealer.join(", ");
        endGame("You bust! Dealer wins.");
        balance.value = parseInt(balance.value) - (parseInt(bet.value) * 2);
        return;
    }

    // Dealer hits until hand value is 17 or greater
    while (getHandValue(dealer) < 17) {
        dealer.push(getCard());
        document.getElementById("dealer").textContent = dealer.join(", ");
    }

    // Check for bust
    if (getHandValue(dealer) > 21) {
        document.getElementById("dealer").textContent = dealer.join(", ");
        endGame("Dealer busts! You Win.");
        balance.value = parseInt(balance.value) + (parseInt(bet.value) * 2);
        return;
    } else {
        document.getElementById("dealer").textContent = dealer.join(", ");
        endGame("Dealer wins! You lose.");
        balance.value = parseInt(balance.value) - (parseInt(bet.value) * 2);
    }
}

function split() {
    // Check if player has two cards of the same rank
    if (hand.length !== 2 || hand[0] !== hand[1]) {
        alert("You can only split with two cards of the same rank.");
        return;
    }

    // Deduct balance for second hand
    // balance.value = parseInt(balance.value) - (parseInt(bet.value) * 2)

    // Create second hand and move second card to it
    let secondHand = [hand.pop()];
    document.getElementById("hand").textContent = hand.join(", ");
    document.getElementById("secondHand").textContent = secondHand.join(", ");

    // Deal a new card to each hand
    hand.push(getCard());
    secondHand.push(getCard());
    document.getElementById("hand").textContent = hand.join(", ");
    document.getElementById("secondHand").textContent = secondHand.join(", ");

    // Play out each hand separately
    playHand(hand);
    playHand(secondHand);
}

function playHand(hand) {
    // Keep hitting until player stands or busts
    while (true) {
        let action = prompt(`Your hand: ${hand.join(", ")}. Hit or Stand?`);
        if (action === "hit") {
            hand.push(getCard());
            document.getElementById("hand").textContent = hand.join(", ");
            if (getHandValue(hand) > 21) {
                alert("You bust! Dealer wins.");
                balance.value = parseInt(balance.value) - parseInt(bet.value);
                return;
            }
        } else if (action === "stand") {
            break;
        } else {
            alert("Invalid action. Please enter 'hit' or 'stand'.");
        }
    }

    // Dealer hits until hand value is 17 or greater
    while (getHandValue(dealer) < 17) {
        dealer.push(getCard());
        document.getElementById("dealer").textContent = dealer.join(", ");
    }

    // Check for bust
    if (getHandValue(dealer) > 21) {
        document.getElementById("dealer").textContent = dealer.join(", ");
        alert("Dealer busts! You win.");
        balance.value = parseInt(balance.value) + parseInt(bet.value);
        return;
    } else if (getHandValue(hand) > getHandValue(dealer)) {
        document.getElementById("dealer").textContent = dealer.join(", ");
        alert("You win!");
        balance.value = parseInt(balance.value) + parseInt(bet.value);
    } else if (getHandValue(hand) < getHandValue(dealer)) {
        document.getElementById("dealer").textContent = dealer.join(", ");
        alert("Dealer wins.");
        balance.value = parseInt(balance.value) - parseInt(bet.value);
    } else {
        document.getElementById("dealer").textContent = dealer.join(", ");
        alert("It's a push!");
        balance.value = parseInt(balance.value);
    }
}

function surrender() {
    // Player forfeits half of their bet
    document.getElementById("dealer").textContent = dealer.join(", ");
    endGame("You surrendered! Dealer wins.");
    balance.value = parseInt(balance.value) - (parseInt(bet.value) / 2);
}

function endGame(message) {
    // Display result message
    alert(message);

    // Update balance and display new total
    document.getElementById("balance").value = balance.value;

    // Disable buttons
    document.getElementById("hit").disabled = true;
    document.getElementById("stand").disabled = true;
    document.getElementById("double").disabled = true;
    document.getElementById("split").disabled = true;
    document.getElementById("surrender").disabled = true;
}