import {makeAutoObservable} from 'mobx';

export default class DeviceStore {
    constructor() {
       this._types= []
        this._brands=[]
        this._devices=[]
        this._selectedBrand={};
        this._selectedType={};
        this._page=1;
        this._totalCount=0;
        this._limit=4
        this._updateTrigger = false;
        makeAutoObservable(this)
    }
    setUpdateTrigger(bool){
        this._updateTrigger = bool;
    }
    setTypes(types){this._types = types}
    setDevices(devices){this._devices = devices}
    setBrands(brands){this._brands = brands}

    setSelectedType(type){this.setPage(1)
        this._selectedType = type}
    setSelectedBrand(brand){this.setPage(1)
        this._selectedBrand=brand}

    setPage(page){this._page=page}
    setTotalCount(total){this._totalCount=total}

    get updateTrigger(){return this._updateTrigger}
    get types(){return this._types}
    get devices(){return this._devices}
    get brands(){return this._brands}
    get selectedType(){return this._selectedType}
    get selectedBrand(){return this._selectedBrand}
    get page(){return this._page}
    get totalCount(){return this._totalCount}
    get limit(){return this._limit}

}
