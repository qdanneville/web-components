import "./use-card-button.js";

class UserCard extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this._user = null;
  }

  set user(value) {
    this._user = value;
    this.render();
  }

  render() {

    this.shadowRoot.innerHTML = `
    <style>
      .card {
        border: 1px solid #ccc;
        padding: 1rem;
        margin-bottom: 0.5rem;
        border-radius: 6px;
      }
    </style>
        <div class="card">
          <strong>${this._user.name}</strong>
          <p>${this._user.email}</p>
        </div>
      `;

    const card = this.shadowRoot.querySelector(".card");
    const cardButton = document.createElement("user-card-button");
    cardButton.selectedUser = this._user;
    card.appendChild(cardButton);
  }
}

customElements.define("user-card", UserCard);
