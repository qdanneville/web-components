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
  }
}

customElements.define("user-card", UserCard);
