import htmlTemplate from "./radio-menu.html";

const valueChangedEvent = "valueChanged";

class RadioMenu extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "closed" });
  }
  connectedCallback() {
    this._shadowRoot.innerHTML = htmlTemplate;
    this._iconElement = this._shadowRoot.querySelector(".button-icon");
    this._iconElement.addEventListener("click", this._onButtonClick);
    this._listElement = this._shadowRoot.querySelector(".list");
    this._shadowRoot.addEventListener("click", this._onClickInside);
    this.render();
  }

  disconnectedCallback() {
    this._iconElement.removeEventListener("click", this._onButtonClick);
  }

  _onButtonClick = () => {
    this._listElement.classList.toggle("active");

    if (this._listElement.classList.contains("active")) {
      const rect = this._iconElement.getBoundingClientRect();
      this._listElement.style.right = window.innerWidth - rect.right + "px";
      this._listElement.style.top = rect.bottom + "px";

      document.addEventListener("click", this._onClickOutside);
    } else {
      this._removeClickOutsideListener();
    }
  };

  _removeClickOutsideListener() {
    document.removeEventListener("click", this._onClickOutside);
  }

  _onClickInside = (ev) => {
    ev.stopPropagation();
  };

  _onClickOutside = () => {
    this._listElement.classList.remove("active");
    this._removeClickOutsideListener();
  };

  _removeSelection() {
    const lastSelected = this._listElement.querySelector(".selected");
    if (lastSelected) lastSelected.classList.remove("selected");
  }

  _onItemClick = (ev) => {
    this._removeSelection();
    ev.target.classList.add("selected");
    const lastValue = this._value;
    this._value = ev.target.getAttribute("data-key");
    if (lastValue != this._value) {
      this.dispatchEvent(new Event(valueChangedEvent));
    }
  };

  render() {
    this._iconElement.innerText = this.getAttribute("icon");
    this._listElement.innerHTML = "";

    for (const key in this._items) {
      const value = this._items[key];
      const element = document.createElement("li");
      element.innerText = value;
      element.setAttribute("data-key", key);
      element.addEventListener("click", this._onItemClick);
      this._listElement.append(element);
    }
  }

  set items(items) {
    this._items = items;
    this.render();
  }

  set value(value) {
    this._removeSelection();
    this._value = value;
    this._listElement
      .querySelector(`[data-key="${value}"]`)
      .classList.add("selected");
  }

  get value() {
    return this._value;
  }

  static observedAttributes() {
    return ["icon"];
  }
}

customElements.define("radio-menu", RadioMenu);
