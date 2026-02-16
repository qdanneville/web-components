import "./user-card.js";

class UserList extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this._users = [];
    }

    set users(value) {
        this._users = value;
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <p>Nombre d'utilisateurs: ${this._users?.length}</p>
        `;

        if (!this._users?.length) {
            this.shadowRoot.innerHTML = "<p>No users found</p>";
            return;
        }

        this._users.forEach(user => {
            const card = document.createElement("user-card");
            card.user = user;
            this.shadowRoot.appendChild(card);
        });
    }
}

customElements.define("user-list", UserList);
