import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { PackServiceComponent } from '../pack-service/pack-service.component';
import { UserServiceService } from '../../service/user-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CartServiceService } from '../../service/cart-service.service';
export interface DialogData {
  majorService: string;
  minorService: string;

}
@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss']
})
export class ServiceCardComponent implements OnInit {
  majorService: any;
  minorService: any;
  serviceName: string;
  serviceDescription: string;
  servicePrice: any;
  serviceId: any;
  isClicked = false ;
  clicked = "false";
  serviceName2: any;
  serviceDescription2: any;
  serviceId2: any;
  servicePrice2: any;
  cardDetails: any;
  productID: any;
  // serviceId = localStorage.getItem('service Id');
  constructor(private router: Router, public dialog: MatDialog, private userservice: UserServiceService,
    private ngxService: NgxUiLoaderService, private cartService: CartServiceService) { }

  ngOnInit() {

    this.ngxService.start(); // start foreground spinner of the master loader with 'default' taskId
    // Stop the foreground loading after 5s
    setTimeout(() => {
      this.ngxService.stop(); // stop foreground spinner of the master loader with 'default' taskId
    }, 3000);
    this.getUserService();
    
  }

  getUserService() {
    this.userservice.service().subscribe(data => {
      console.log("userService data is here ", data);
      this.majorService = data['data']['data'][0];
      this.minorService = data['data']['data'][1];

      this.serviceName = this.majorService.name;
      this.serviceDescription = this.majorService.description;
      this.serviceId = this.majorService.id;
      this.servicePrice = this.majorService.price;

      this.serviceName2=this.minorService.name;
      this.serviceDescription2= this.minorService.description;
      this.serviceId2 =this.minorService.id;
      this.servicePrice2=this.minorService.price;
    });
    
  }

  SignIn() {
    console.log("Im clicked")
    this.router.navigate(['cartLogin']);
  }

  openServicePack(): any {
    this.isClicked = !this.isClicked;
    this.cartService.postCard({
      "productId" :this.serviceId}
      ).subscribe(data => {
      console.log("get card Details ", data);
      this.cardDetails=data['data'];
      console.log("cardDetails",this.cardDetails);
      this.productID=this.cardDetails.details.id;
      localStorage.setItem('product Id', this.productID);
      this.clicked = "true";
     localStorage.setItem('clicked',this.clicked)

    })
    console.log("isclicked changed ", this.isClicked);
    if (this.isClicked == true) {
      localStorage.clear();
      console.log("isClicked is called ");
      localStorage.setItem('service type', this.serviceName);
      localStorage.setItem('service Description', this.serviceDescription);
      localStorage.setItem('service Id', this.serviceId);
      localStorage.setItem('service price ', this.servicePrice);
    }
    const MatDialogRef = this.dialog.open(PackServiceComponent, {
      height: '30%',
      width: '600px',
      data: { majorService: this.majorService.price }
    })
    MatDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
}
