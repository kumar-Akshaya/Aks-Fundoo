import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../service/http.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-cart-login',
  templateUrl: './cart-login.component.html',
  styleUrls: ['./cart-login.component.scss']
})
export class CartLoginComponent implements OnInit {
  model : any;
  response : any ;
  message = '';
  isClicked = false;
  isSelected = false;
   selectedService =localStorage.getItem('service type');
   isChoosed = localStorage.getItem('clicked');
  constructor(private http : HttpService,private router : Router,private ngxService: NgxUiLoaderService  ) { }

  ngOnInit() {
    this.ngxService.start(); // start foreground spinner of the master loader with 'default' taskId
    // Stop the foreground loading after 3s
    setTimeout(() => {
      this.ngxService.stop(); // stop foreground spinner of the master loader with 'default' taskId
    }, 5000);
    this.userInformation();
   console.log(" localStorage isChoosed ",this.isChoosed) ;
  }

  hide = true;
  email = new FormControl('',[Validators.required, Validators.email]);
  password = new FormControl('',[Validators.required,]);

  userInformation(){
    var service =localStorage.getItem('service type');
    var serviceprice = localStorage.getItem('service price');
    var serviceId = localStorage.getItem('service Id');
    var serviceDes= localStorage.getItem('service Description');
  }
  

  Login(){
    this.model = {
      "email" : this.email.value,
      "password" : this.password.value
    };
    console.log("user input model", this.model);
    if(this.email.value== '' || this.password.value== ''){
      this.message="Field cannot be empty";
    }
else{

   this.http.postRequest('user/login', this.model).subscribe(data =>{
     this.response = data;
     localStorage.setItem('token', this.response.id);
      localStorage.setItem('firstName', this.response.firstName);
      localStorage.setItem('lastName',this.response.lastName);
      localStorage.setItem('email', this.response.email);
      localStorage.setItem('image',this.response.imageUrl);
      localStorage.setItem('userId',this.response.userId);
      var token=localStorage.getItem('token');
      console.log("token id ",token );

    if(token != this.response.id){
      this.message="User not found";
      return;
    }

    else{
    this.router.navigate(['dashboard']);
    }
   },
   err =>{
     alert("Sorry, Something Went Wrong");
   })
  
  }
}

  Forgot(){
  this.router.navigate(['forget']);
  }

  Create(){
    this.router.navigate(['cart']);
  }

}
