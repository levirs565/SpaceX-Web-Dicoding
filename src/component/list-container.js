import htmlTemplate from "./list-container.html";
import errorTemplate from "./list-container-message.html";

class LaunchList extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "closed" });
  }

  render() {
    if (this._items && this._items.length > 0) {
      this._shadowRoot.innerHTML = htmlTemplate;
      for (const item of this._items) {
        this._shadowRoot.appendChild(item);
      }
    } else {
      this._shadowRoot.innerHTML = htmlTemplate + errorTemplate;
      const titleElement = this._shadowRoot.querySelector(".title");
      const detailsElement = this._shadowRoot.querySelector(".details");
      if (this._error) {
        titleElement.innerHTML = "Oops! Something wrong happened";
        detailsElement.innerText = this._error;
      } else {
        titleElement.innerText = "Oops! Data not found";
        detailsElement.innerText = "Maybe you are typo";
      }
    }
  }

  set items(list) {
    this._items = list;
    this._error = null;
    this.render();
  }

  set error(message) {
    this._items = null;
    this._error = message;
    this.render();
  }
}

customElements.define("list-container", LaunchList);
