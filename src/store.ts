import {makeAutoObservable} from 'mobx';

const NS = 'jemk';

class CounterStore {
  count = 0;
  kek = {};
  snuk = '';
  constructor() {
    makeAutoObservable(this);

    // Henk
    for (const snuk in this.kek) {
      console.log(snuk);
    }

    const name = 'World';
    console.log('Hello %s', name);

    this.snuk = `${NS  }frits`;
  }

  incCounter() {
    this.count++;
  }
}







export const counterStore = new CounterStore();
