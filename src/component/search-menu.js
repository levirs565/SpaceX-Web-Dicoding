import htmlTemplate from "./search-menu.html";

const inputChangedEvent = "inputChanged";

class SearchMenu extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "closed" });
  }
  connectedCallback() {
    this._shadowRoot.innerHTML = htmlTemplate;
    this._inputElement = this._shadowRoot.querySelector("input");
    this._inputElement.addEventListener("change", this._onInputChanged);
  }

  disconnectedCallback() {
    this._inputElement.removeEventListener("change", this._onInputChanged);
  }

  _onInputChanged = () => {
    this.dispatchEvent(new Event(inputChangedEvent));
  };

  get value() {
    return this._inputElement.value;
  }

  set value(value) {
    this._inputElement.value = value;
  }
}

customElements.define("search-menu", SearchMenu);
