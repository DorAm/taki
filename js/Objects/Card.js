// card constructor
function Card(id, color, number, action, name) {
    this.gameOwner = 1;
    this.id = id;
    this.color = color;
    this.number = number;
    this.action = action;
    this.name = name;
    this.isHidden = true;
    this.isActive = false;  // isActive FALSE means that this card obligations toward its competitor player that was handed this card were
                           // already met.
                            // TRUE means they have not been met yet and the competitor player need to respond to it.
                            // TODO: it should only be changed when the card is the leading card.
}