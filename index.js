class UICard extends HTMLElement {

    static get observedAttributes() {
        return ['firstname', 'lastname', 'email'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} has changed. New value : ${newValue}, Old value : ${oldValue}`);
        this.render();
    }

    render() {

        const firstname = this.getAttribute('firstname');
        const lastname = this.getAttribute('lastname');
        const email = this.getAttribute('email');


        this.shadowRoot.innerHTML = `
        <style>
          div {
            display:flex;
            flex-direction:column;
            align-items:center;
            
            background:white;
            padding:20px;
            border-radius:20px;
            
            color:black;
            border: 1px solid white;
            box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
          }
    
          img {
            max-width:200px;
          }
        </style>
  
        <div>
              <header>
                  <img src="https://images4.fanpop.com/image/photos/17000000/Anakin-Skywalker-anakin-skywalker-17028586-992-960.jpg" />
              </header>
              <article>
                  <p><strong>Nom : </strong>${lastname}</p>
                  <p><strong>Prénom : </strong>${firstname}</p>
                  <p><strong>Email : </strong>${email}</p>
              </article>
              <footer>
                  <ui-button name="${lastname + ' ' + firstname}" firstname="${firstname}" lastname="${lastname}" email="${email}"></ui-button>
                  <button>Mettre à jour le profil</button>
              </footer>
        </div>
      `;

        this.shadowRoot.querySelector('button').addEventListener('click', () => {
            console.log('Mettre à jour le profil');
            this.setAttribute('firstname', 'John');
            this.setAttribute('lastname', 'Doe');
            this.setAttribute('email', 'john.doe@gmail.com');
        });
    }
}

customElements.define("ui-card", UICard);

class UIButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.addEventListenerToButton();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            button {
                background-color: #222;
                color: white;
                padding: 10px 20px;
                border: none;
                cursor: pointer;
                border-radius: 5px;
            }
        </style>

        <button>Voir le profil</button>
        `;
    }

    addEventListenerToButton() {
        this.shadowRoot.querySelector('button').addEventListener('click', () => {
            console.log('button voir le profil clicked');

            const event = new CustomEvent("userSelected", {
                detail: {
                    firstname: this.getAttribute("firstname"),
                    lastname: this.getAttribute("lastname"),
                    email: this.getAttribute("email")
                },
                bubbles: true,     // important pour que l'événement remonte
                composed: true     // utile plus tard avec Shadow DOM
            });

            // Dispatch de l'événement
            this.dispatchEvent(event);
        });
    }
}

class UIAddUserButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.addEventListenerToButton();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            button {
                background-color: #007bff;
                color: white;
                padding: 10px 20px;
                border: none;
                cursor: pointer;
                border-radius: 5px;
            }
        </style>

        <button>Ajouter un utilisateur</button>
        `;
    }

    addEventListenerToButton() {
        this.shadowRoot.querySelector('button').addEventListener('click', () => {
            console.log('button ajouter un utilisateur clicked');

            const event = new CustomEvent("addUser", {
                detail: {
                    firstname: "John",
                    lastname: "Doe",
                    email: "john.doe@gmail.com"
                },
                bubbles: true,     // important pour que l'événement remonte
                composed: true     // utile plus tard avec Shadow DOM
            });

            // Dispatch de l'événement
            this.dispatchEvent(event);
        });
    }
}

customElements.define("ui-button", UIButton);
customElements.define("ui-add-user-button", UIAddUserButton);

document.addEventListener("userSelected", (event) => {
    console.log("Utilisateur sélectionné :", event.detail);
    alert("Utilisateur sélectionné : " + event.detail.firstname + " " + event.detail.lastname);
});

document.addEventListener("addUser", (event) => {
    console.log("Ajout d'un utilisateur :", event.detail);
    const newCard = document.createElement('ui-card');
    newCard.setAttribute('firstname', event.detail.firstname);
    newCard.setAttribute('lastname', event.detail.lastname);
    newCard.setAttribute('email', event.detail.email);
    document.querySelector('main').appendChild(newCard);
});