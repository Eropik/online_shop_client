import {makeAutoObservable} from 'mobx';

export default class BasketStore {
    constructor() {
       this._devices=[];
        this._boughtDevices=[];
        this._basketId = {};
        this._updateTrigger = false;
        makeAutoObservable(this)
    }


    setBoughtDevices(devices){
        this._boughtDevices = devices;
    }
    setUpdateTrigger(bool){ this._updateTrigger = bool;   }
    setBasketId(basketId){
        this._basketId = basketId;
    }
    setDevices(devices){
        this._devices = devices;
    }
   get updateTrigger(){return this._updateTrigger}
    get devices(){return this._devices}
    get boughtDevices(){return this._boughtDevices}
    get basketId(){return this._basketId}

}


