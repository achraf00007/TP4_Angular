import {Injectable} from '@angular/core';
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  public productsState: any = {
    keyword: "",
    products: [],
    currentPage: 1,
    pageSize: 5,
    totalPages: 0,
    totalProducts: 0 ,
    status : "" ,
    errorMessage : ""
  }

  public authState : any = {
    isAutenticated : false ,
    username : undefined ,
    roles : undefined ,
    token : undefined

  }

  constructor() {
  }

  setProductState(state: any): void {
    this.productsState = {...this.productsState, ...state}
  }
  setAuthState(state: any): void {
    this.authState = {...this.authState, ...state}
  }
}
