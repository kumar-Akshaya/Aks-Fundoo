import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../service/http.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { UserServiceService } from '../../service/user-service.service';
@Component({
  selector: 'app-cart-sign-up',
  templateUrl: './cart-sign-up.component.html',
  styleUrls: ['./cart-sign-up.component.scss']
})
export class CartSignUpComponent implements OnInit {
  hide = true;
  message = '';
   selected: '';
   model: any;
   responce: any;
   message1='';
   majorService : any;
   minorService : any;
   serviceSelected = localStorage.getItem('product Id'); 
   service = localStorage.getItem('service type')
  firstname = new FormControl('', [Validators.required]);
  lastname = new FormControl('', [Validators.required])
  username = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  confirm = new FormControl('', [Validators.required]);
  serviceName: any;
  serviceDescription: any;
  serviceId: any;
  servicePrice: any;
  serviceName2: any;
  serviceDescription2: any;
  serviceId2: any;
  servicePrice2: any;

  constructor(private router : Router, private userService : UserServiceService, private httpService : HttpService, ) {
   }

  ngOnInit() {
    this.getService();
  }
 
  getService(){
    this.userService.service().subscribe(data=>{
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
    })
  }

  showCart(){
   this.router.navigate(['cart']);
  }


  register() { 
    try {
      this.model = {
        "firstName": this.firstname.value,
        "lastName": this.lastname.value,
        "phoneNumber": '',
        "imageUrl": '',
        "service": this.service,
        "email": this.username.value,
        "confirm": this.confirm.value,
        "cardId": '',
        "password": this.password.value,
      }
      console.log("Fields" , this.model); 
      if (this.firstname.value == '' || this.lastname.value == '' || this.username.value == '' || this.password.value == '' || this.confirm.value == '' || this.service == '') {
        this.message = "Fields are missing";
         console.log("Fields are missing");
        return;
      }
      else {

        this.httpService.postRequest('/user/userSignUp', this.model).subscribe(data => {

          this.responce=data;
           this.message1=this.responce.message;
          console.log(data);
          // this.router.navigate(['login']);
        },
          err => {
            alert('Something went wrong ')
          })
      }
    }
    catch (err) {
      this.message="Something bad happened"
    }
     
  }

  SignIn(){
    this.router.navigate(['cartLogin'])
  }
}
