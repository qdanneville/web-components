class UICard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.firstname = this.getAttribute('firstname');
        this.lastname = this.getAttribute('lastname');
        this.email = this.getAttribute('email');

    }

    connectedCallback() {
        this.render();
    }

    render() {
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
                  <p><strong>Nom : </strong>${this.lastname}</p>
                  <p><strong>Prénom : </strong>${this.firstname}</p>
                  <p><strong>Email : </strong>${this.email}</p>
              </article>
              <footer>
                  <ui-button name="${this.lastname + ' ' + this.firstname}"></ui-button>
              </footer>
        </div>
      `;
    }
}

customElements.define("ui-card", UICard);

class UIButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.name = this.getAttribute('name');
    }

    connectedCallback() {
        this.render();
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

        this.shadowRoot.querySelector('button').addEventListener('click', () => {
            alert(`Bonjour ${this.name}`);
        });
    }
}

customElements.define("ui-button", UIButton);