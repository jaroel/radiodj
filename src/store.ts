import {makeAutoObservable} from 'mobx';

class CounterStore {
  count = 0;
  kek = {};
  snuk = '';
  constructor() {
    makeAutoObservable(this);

    const name = 'World';
    console.log('Hello %s', name);
  }

  incCounter() {
    this.count++;
  }
}

export const counterStore = new CounterStore();
