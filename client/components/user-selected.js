class UserSelected extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        document.addEventListener("userSelected", (event) => {
            this._user = event.detail.user;
            this.render();
        });
    }

    set user(value) {
        this._user = value;
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .user-selected {
                    border: 1px solid red;
                    padding: 1rem;
                    margin-bottom: 0.5rem;
                    border-radius: 6px;
                }
            </style>

            <div class="user-selected">
                <h4>Modification de l'utilisateur</h4><br />
                <strong>${this._user.name}</strong><br />
                <p>${this._user.email}</p>
            </div>
        `;
    }
}

customElements.define("user-selected", UserSelected);