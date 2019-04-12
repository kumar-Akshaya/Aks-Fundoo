/************************************************************************************************
* Execution : 1. default node cmd> dashboard.ts 
* 
* Purpose :cropering selected image 
* 
* @file : dashboard.ts
* @module : dashboard.ts - This is optional if expeclictly its an npm or local package
* @author : Akshaya M I <akshayakumarmi97@gmail.com>
* @since : 10-3-2019
*
*************************************************************************************************/

import { Component, OnInit, Inject } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { SearchService } from '../../service/searchService/search.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-image-crop',
  templateUrl: './image-crop.component.html',
  styleUrls: ['./image-crop.component.scss']
})
export class ImageCropComponent implements OnInit {
  private croppedImage: any = '';
  private imageChangedEvent: any = '';
  constructor(   private dialogRefPic: MatDialogRef<DashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private httpService: HttpService,
    private dataService: SearchService) { }

  ngOnInit() {
  }

  imageCropped(event: any) {
    this.croppedImage = event.file;
  }
  private image2 = localStorage.getItem('imageUrl');
  // img = environment.apiUrl + this.image2;

  onUpload() {
    var token = localStorage.getItem('token');
    const uploadData = new FormData();
    uploadData.append('file', this.croppedImage);
    this.httpService.httpAddImage('user/uploadProfileImage',
     uploadData, token)
     .subscribe(res => {
      // this.img = environment.apiUrl + res['status'].imageUrl;
      localStorage.setItem("imageUrl", res['status'].imageUrl);
      this.dialogRefPic.close()
      this.dataService.changeMsg(true);
    }, error => {
    })
  }
}
