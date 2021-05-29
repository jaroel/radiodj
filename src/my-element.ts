import {css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {MobxLitElement} from '@adobe/lit-mobx';

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

import {counterStore} from './store';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
export class MyElement extends MobxLitElement {
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

        <vaadin-button @click="${counterStore.incCounter.bind(counterStore)}"
          >Button</vaadin-button
        >
        <div>Clicked ${counterStore.count} times</div>

        <slot></slot>
      </vaadin-app-layout>
    `;
  }

  foo(): string {
    return 'foo';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement;
  }
}
