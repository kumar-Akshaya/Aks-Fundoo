import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../../service/cart-service.service';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.scss']
})
export class ShopingCartComponent implements OnInit {
  orderRes: any;
  message1: string;

  constructor(private cartService: CartServiceService, private snackBar: MatSnackBar) { }
  firstShow = true;
  secondShow = false;
  thirdShow = false;
  show = false;
  show1 = false;
  cartId = localStorage.getItem('product Id');
  price = localStorage.getItem('service price');
  type = localStorage.getItem('service type');
  description = localStorage.getItem('service Description')
  address = new FormControl('', [Validators.maxLength(100), Validators.minLength(10)]);
  ngOnInit() {
    console.log("cart id from localstorage ", this.cartId);
  }

  proceed() {
    this.show = !this.show;
    this.firstShow = false;
    this.secondShow = true;
  }

  placeOrder() {
    this.cartService.placeOrder({
      "cartId": this.cartId,
      "address": this.address.value
    }).subscribe(data => {
      this.show1 = true;
      this.secondShow = false;
      this.thirdShow = true;
      this.orderRes = data['data'];
      this.message1 = this.orderRes.message;
      this.snackBar.open(this.message1, "", {
        duration: 3000
      })
      console.log("place order responce is here ", data);
    },
      err => {
        console.log(err);
      })
  }

}
