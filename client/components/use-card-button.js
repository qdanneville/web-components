class UserCardButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    async connectedCallback() {
        this.addEventListenerToButton();
    }

    set selectedUser(value) {
        this._selectedUser = value;
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .user-card-button {
                    border: 1px solid #ccc;
                    padding: 1rem;
                    margin-bottom: 0.5rem;
                    border-radius: 6px;
                }
            </style>
            <button class="user-card-button">Select User</button>
        `;
    }

    addEventListenerToButton() {

        const button = this.shadowRoot.querySelector(".user-card-button");


        button.addEventListener("click", () => {
            const event = new CustomEvent("userSelected", {
                detail: {
                    user: this._selectedUser
                },
                bubbles: true,
                composed: true
            });

            this.dispatchEvent(event);
        });
    }
}

customElements.define("user-card-button", UserCardButton);