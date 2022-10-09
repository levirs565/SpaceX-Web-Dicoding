import htmlTemplate from "./app-bar.html";

const refreshEvent = "refresh";

class AppBar extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "closed" });
  }

  connectedCallback() {
    this._shadowRoot.innerHTML = htmlTemplate;

    this._sortRadioMenu = this._shadowRoot.getElementById("radio-menu");
    this._tabs = this._shadowRoot.getElementById("tabs");
    this._searchMenu = this._shadowRoot.getElementById("search");

    this._tabs.addEventListener("valueChanged", this._onTabChanged);
    this._sortRadioMenu.addEventListener(
      "valueChanged",
      this._onSortRadioChanged
    );
    this._searchMenu.addEventListener(
      "inputChanged",
      this._onSearchInputChanged
    );
  }

  _onTabChanged = () => {
    const { items, selected } = this._onConfigureSortRadio();
    this._sortRadioMenu.items = items;
    this._sortRadioMenu.value = selected;
    this._searchMenu.value = "";
    this.dispatchEvent(new Event(refreshEvent));
  };

  _onSortRadioChanged = () => {
    this.dispatchEvent(new Event(refreshEvent));
  };

  _onSearchInputChanged = () => {
    this.dispatchEvent(new Event(refreshEvent));
  };

  set onConfigureSortRadio(callback) {
    this._onConfigureSortRadio = callback;
  }

  configureTab(items, selected) {
    this._tabs.items = items;
    this._tabs.value = selected;
    this._onTabChanged();
  }

  get sortBy() {
    return this._sortRadioMenu.value;
  }

  get selectedTab() {
    return this._tabs.value;
  }

  get searchBy() {
    return this._searchMenu.value.trim();
  }
}

customElements.define("app-bar", AppBar);
