import htmlTemplate from "./crew-item.html";
import listItemStyle from "./list-item.html";

class LaunchItem extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "closed" });
  }
  render() {
    this._shadowRoot.innerHTML = listItemStyle + htmlTemplate;
    const imageElement = this._shadowRoot.querySelector("img");
    const nameElement = this._shadowRoot.querySelector("h2");
    const agencyElement = this._shadowRoot.querySelector(".agency");
    const stateElement = this._shadowRoot.querySelector(".state");

    imageElement.src = this._crew.image;
    nameElement.innerText = this._crew.name;
    agencyElement.innerText = this._crew.agency;
    stateElement.innerText = this._crew.state;
  }

  set crew(item) {
    this._crew = item;
    this.render();
  }
}

customElements.define("crew-item", LaunchItem);
