import {LitElement, css, html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';

import {createStore, createEvent} from 'effector-logger';

import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-app-layout/vaadin-app-layout';
import '@vaadin/vaadin-app-layout/vaadin-drawer-toggle';
import '@vaadin/vaadin-tabs/vaadin-tabs';
import '@vaadin/vaadin-tabs/vaadin-tab';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-icons/vaadin-icons';

import '@vaadin/vaadin-lumo-styles/color';
import '@vaadin/vaadin-lumo-styles/typography';
import '@vaadin/vaadin-lumo-styles/sizing';
import '@vaadin/vaadin-lumo-styles/spacing';
import '@vaadin/vaadin-lumo-styles/style';

const increment = createEvent();
const decrement = createEvent();
const resetCounter = createEvent();

const counter = createStore(0)
  .on(increment, state => state + 1)
  .on(decrement, state => state - 1)
  .reset(resetCounter);

interface MyDataInterface {
  data: {kek: string}
}

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
    h1,
    h2 {
      margin: 0 var(--lumo-space-s);
      font-size: var(--lumo-font-size-l);
      font-family: var(--lumo-font-family);
    }

    h2 {
      align-self: center;
    }

    iron-icon {
      padding: 0.25rem;
      box-sizing: border-box !important;
      margin: 0 4px;
      width: var(--lumo-icon-size-m);
      height: var(--lumo-icon-size-m);
    }
  `;

  @property()
  name = 'World';

  @state()
  private value = 0;

  constructor() {
    super();
    counter.watch(state => {
      this.value = state;
    });

    const eventSource = new EventSource(`${backendUrl}/sse`);
    eventSource.addEventListener('barf', this.parseMyEvent);
    // EventSource.addEventListener('message', console.log);
  }

  parseMyEvent(event_: Event) {
    console.log(event_);
    const messageEvent = (event_ as MessageEvent); // <== This line is Important!!
    const data: MyDataInterface = JSON.parse(messageEvent.data);
    console.log(data);
    increment();
  }

  render() {
    return html`
      <vaadin-app-layout primary-section="drawer">
        <vaadin-vertical-layout slot="navbar">
          <vaadin-horizontal-layout>
            <vaadin-drawer-toggle></vaadin-drawer-toggle>
            <h2>Orders</h2>
          </vaadin-horizontal-layout>
          <vaadin-tabs>
            <vaadin-tab>
              <a tabindex="-1" target="_self">All</a>
            </vaadin-tab>
            <vaadin-tab>
              <a tabindex="-1" target="_self">Open</a>
            </vaadin-tab>
            <vaadin-tab>
              <a tabindex="-1" target="_self">Completed</a>
            </vaadin-tab>
            <vaadin-tab>
              <a tabindex="-1" target="_self">Cancelled</a>
            </vaadin-tab>
          </vaadin-tabs>
        </vaadin-vertical-layout>

        <h1 slot="drawer">MyApp</h1>

        <vaadin-tabs slot="drawer" selected="1" orientation="vertical">
          <vaadin-tab>
            <a tabindex="-1" target="_self">
              <iron-icon icon="vaadin:dashboard"></iron-icon>
              Dashboards
            </a>
          </vaadin-tab>
          <vaadin-tab>
            <a tabindex="-1" target="_self">
              <iron-icon icon="vaadin:cart"></iron-icon>
              Orders
            </a>
          </vaadin-tab>
          <vaadin-tab>
            <a tabindex="-1" target="_self">
              <iron-icon icon="vaadin:user-heart"></iron-icon>
              Customers
            </a>
          </vaadin-tab>
          <vaadin-tab>
            <a tabindex="-1" target="_self">
              <iron-icon icon="vaadin:package"></iron-icon>
              Products
            </a>
          </vaadin-tab>
          <vaadin-tab>
            <a tabindex="-1" target="_self">
              <iron-icon icon="vaadin:records"></iron-icon>
              Documents
            </a>
          </vaadin-tab>
          <vaadin-tab>
            <a tabindex="-1" target="_self">
              <iron-icon icon="vaadin:list"></iron-icon>
              Tasks
            </a>
          </vaadin-tab>
          <vaadin-tab>
            <a tabindex="-1" target="_self">
              <iron-icon icon="vaadin:chart"></iron-icon>
              Analytics
            </a>
          </vaadin-tab>
        </vaadin-tabs>

        <h1>Hello, ${this.name}!</h1>

        <vaadin-button @click="${this.incrementDing}"
          >Button</vaadin-button
        >
        <div>Clicked ${this.value} times</div>

        <slot></slot>
      </vaadin-app-layout>
    `;
  }

  incrementDing() {
    increment();
  }

  foo(): string {
    return 'foo';
  }
}
