import {LitElement, css, html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';

import '@vaadin/vaadin-button/vaadin-button';

const backendUrl = 'http://localhost:8000';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
export class MyElement extends LitElement {
  static styles = css`

  `;

  @property()
  name = 'World';

  @state()
  private value = 0;

  constructor() {
    super();
    const eventSource = new EventSource(`${backendUrl}/sse`);
    eventSource.addEventListener('barf', () => {
      this.incCounter();
    });
  }

  incCounter() {
    this.value += 1;
  }

  decCounter() {
    this.value -= 1;
  }

  render() {
    return html`
      <h1>Hello, ${this.name}!</h1>

      <vaadin-button @click="${this.incCounter}"
        >Button</vaadin-button
      >
      <div>Clicked ${this.value} times</div>
    `;
  }
}
