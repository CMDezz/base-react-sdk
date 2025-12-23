class SavvySDKComp extends HTMLDivElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    if (!this.shadowRoot!.innerHTML) {
      this.shadowRoot!.innerHTML = `<slot></slot>`;
    }
  }
}

customElements.define('savvy-sdk-comp', SavvySDKComp, {
  extends: 'div',
});
