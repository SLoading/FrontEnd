export default class Store {
  constructor(updateState, state) {
    this._updateState = updateState;
    this._state = state;
    this._callbacks = [];
  }

  get value() {
    return this._state;
  }

  update(myState) {
    this._state = this._updateState(this._state,myState);
    this._callbacks.forEach(callback => callback());
  }

  subscribe(callback) {
    this._callbacks.push(callback);
    return () => this._callbacks = this._callbacks.filter(cb => cb !== callback);
  }
}
