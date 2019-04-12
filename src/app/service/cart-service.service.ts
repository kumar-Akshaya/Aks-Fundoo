import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  constructor(private httpService : HttpService) { }

  postCard(body: any ){
    return this.httpService.postJSON1('productcarts/AddToCart',body);
  }
  placeOrder(body : any ){
    return this.httpService.postJSON('productcarts/placeOrder', body);
  }
}
