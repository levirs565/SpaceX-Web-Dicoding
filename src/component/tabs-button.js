import htmlTemplate from "./tabs-button.html";

const valueChangedEvent = "valueChanged";

class TabsButton extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "closed" });
  }
  _removeSelection() {
    const lastSelected = this._shadowRoot.querySelector(".selected");
    if (lastSelected) lastSelected.classList.remove("selected");
  }

  _onItemClicked = (ev) => {
    this._removeSelection();
    ev.target.classList.add("selected");
    const lastValue = this._value;
    this._value = ev.target.getAttribute("data-key");
    if (lastValue != this._value) {
      this.dispatchEvent(new Event(valueChangedEvent));
    }
  };

  render() {
    this._shadowRoot.innerHTML = htmlTemplate;
    for (const key in this._items) {
      const value = this._items[key];
      const button = document.createElement("button");
      button.setAttribute("data-key", key);
      button.innerHTML = value;
      button.addEventListener("click", this._onItemClicked);
      this._shadowRoot.appendChild(button);
    }
  }

  set items(items) {
    this._items = items;
    this.render();
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
    this._removeSelection();
    this._shadowRoot
      .querySelector(`[data-key="${value}"]`)
      .classList.add("selected");
  }
}

customElements.define("tabs-button", TabsButton);
