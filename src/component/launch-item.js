import htmlTemplate from "./launch-item.html";
import listItemStyle from "./list-item.html";
import blankRocketImage from "../assets/noun-rocket-5218335.png";

class LaunchItem extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "closed" });
  }
  render() {
    this._shadowRoot.innerHTML = listItemStyle + htmlTemplate;
    const imageElement = this._shadowRoot.querySelector("img");
    const nameElement = this._shadowRoot.querySelector("h2");
    const dateElement = this._shadowRoot.querySelector(".date");
    const stateElement = this._shadowRoot.querySelector(".state");
    const detailsElement = this._shadowRoot.querySelector(".details");

    imageElement.src = this._launch.image
      ? this._launch.image
      : blankRocketImage;
    nameElement.innerText = this._launch.name;
    dateElement.innerText = this._launch.date.format("D MMMM YYYY");
    stateElement.innerText = this._launch.state;
    detailsElement.innerText = this._launch.details;
  }

  set launch(item) {
    this._launch = item;
    this.render();
  }
}

customElements.define("launch-item", LaunchItem);
