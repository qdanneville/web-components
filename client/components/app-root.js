import { fetchUsers, createUser } from "../services/api.js";
import "./user-list.js";

class AppRoot extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    async connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                form {
                    margin-bottom: 2rem;
                }

                input {
                    margin-right: 0.5rem;
                    padding: 0.4rem;
                }

                button {
                    padding: 0.4rem 0.8rem;
                    cursor: pointer;
                }
            </style>

            <h1>Gestion des utilisateurs</h1>

            <form id="form">
                <input type="text" name="name" placeholder="Name" required />
                <input type="email" name="email" placeholder="Email" required />
                <button>Add User</button>
            </form>

            <user-list></user-list>
        `;

        this.userList = this.shadowRoot.querySelector("user-list");
        await this.loadUsers();

        const form = this.shadowRoot.querySelector("#form");

        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const user = {
                name: formData.get("name"),
                email: formData.get("email")
            };

            await createUser(user);
            form.reset();
            await this.loadUsers();
        });
    }

    async loadUsers() {
        const users = await fetchUsers();
        this.userList.users = users;
    }
}

customElements.define("app-root", AppRoot);
