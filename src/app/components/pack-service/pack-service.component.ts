import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { DialogData } from '../service-card/service-card.component';

@Component({
  selector: 'app-pack-service',
  templateUrl: './pack-service.component.html',
  styleUrls: ['./pack-service.component.scss']
})
export class PackServiceComponent implements OnInit {
majorService : any;
minorService : any ;
  constructor(public dialogRef: MatDialogRef<PackServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private router:Router) { 
     
    }

  ngOnInit() {
  }

  remove(){
    this.dialogRef.close();
  }

  checkOut(){
    this.router.navigate(['cartSignUp']);
    this.dialogRef.close();
    
  }
}
