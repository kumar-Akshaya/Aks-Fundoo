/************************************************************************************************
* Execution : 1. default node cmd> dashboard.ts 
* 
* Purpose :dashboard to fundoo
* 
* @file : dashboard.ts
* @module : dashboard.ts - This is optional if expeclictly its an npm or local package
* @author : Akshaya M I <akshayakumarmi97@gmail.com>
* @since : 2-2-2019
*
*************************************************************************************************/


import { Component, OnInit, ChangeDetectorRef, Inject, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { EditLableComponent } from '../edit-lable/edit-lable.component';
import { MatSnackBar } from '@angular/material'
import { SearchService } from '../../service/searchService/search.service';
import { ViewchangeService } from '../../service/viewchange.service';
import { NoteServiceService } from '../../service/note-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ImageCropComponent } from '../image-crop/image-crop.component';
// export interface DialogData {
//   data: "akshaya"
// }
/**
 * @title Injecting data when opening a dialog
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  mobileQuery: MediaQueryList;
  message: any;
  content: any;
  Search : any;
  userName : any ;
  isClicked = false;
  titleName = '';
  labelArray : any [];
  private title = "Keep";
  private _mobileQueryListener: () => void;
  routerColor: any;
  private picture: any;
  firstName =localStorage.getItem('firstName');
  lastName = localStorage.getItem('lastName');
  email=localStorage.getItem('email');
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router,
    public dialog: MatDialog, private data: SearchService, private snackBar: MatSnackBar, private viewChange : ViewchangeService, 
    private notesService: NoteServiceService, private ngxService: NgxUiLoaderService ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit() {
    this.labelArray = [];
    this.getLabels();
    this.title=localStorage.getItem('title');
    this.ngxService.start(); // start foreground spinner of the master loader with 'default' taskId
    // Stop the foreground loading after 5s
    setTimeout(() => {
      this.ngxService.stop(); // stop foreground spinner of the master loader with 'default' taskId
    }, 3000);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  aptTitle(title) {
    this.title = title;
    localStorage.setItem('title',title)
  }
  recieveMessage($event) {
    this.message = $event;
    console.log("event data..", this.message);
  }

Logout(){
  this.router.navigate(['cart']);
  localStorage.clear();
}

  isclick() {
    return false;
  }
  openLabel() {
    console.log("Lable clicked..");
    this.titleName="Edit Lable"
    const dialogRef = this.dialog.open(EditLableComponent, {
      width: '350px',
      // data: this.content

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });

  }
  selectedFile = null;
  private image2 = localStorage.getItem('imageUrl');
  // img = environment.apiUrl + this.image2;

  onFileUpload(event) {
    this.profileCropOpen(event);
    this.selectedFile = event.path[0].files[0];
    const uploadData = new FormData();
    uploadData.append('file', this.selectedFile, this.selectedFile.name);
  }

  profileCropOpen(data): void {
    const dialogRefPic = this.dialog.open(ImageCropComponent, {
      width: '450px',
      data: data
    });
    dialogRefPic.afterClosed().subscribe(() => {
      this.data.currentMsg.subscribe(message => this.picture = message);
      if (this.picture == true) {
        this.image2 = localStorage.getItem('imageUrl');
        // this.img = environment.apiUrl + this.image2;
      }
    });
  }

  getLabels() {
    let newArray = [];
    this.notesService.getLabels()
      .subscribe(data => {
        for (var i = 0; i < data['data']['details'].length; i++) {
          if (data['data']['details'][i].isDeleted == false) {
            newArray.push(data['data']['details'][i])
          }
          else {
          }
        }
        newArray.sort(function (a, b) {
          var A = a.label.toLowerCase(), B = b.label.toLowerCase()
          if (A < B) return -1;
          if (A > B) return 1;
          return 0;
        })
        this.labelArray = newArray;
      })
  }

  @Output() deleteEvent = new EventEmitter<string>();
  openTrash(){
     this.deleteEvent.emit();
  }

  addAccount() {
    this.router.navigate(['register']);
  }

  signout() {
    this.router.navigate(['cart']);
    localStorage.clear();
  }
  alert = "Note Archieved";
  action = "undo";

 
  Note(){
    this.titleName="Note"
    this.router.navigate(['dashboard','note'])
  }

  Reminder(){
    this.titleName="Reminder";
     this.router.navigate(['dashboard','Reminder']);
  }
  // select(labels) {
  //   let label = labels.label;
  //   this.router.navigate(['home/newLabel/' + label])
  // }

  routerColorActive(label){
    this.routerColor=label;
  }

  trash(){
    this.titleName="Trash";
    this.router.navigate(['dashboard','trash'])
  }


  archieve(message: String, action: String) {
    this.titleName="Archieve"
    this.router.navigate(['dashboard', 'archive']);
    this.snackBar.open(this.alert, this.action, {
      duration: 4000
    })

  }

  // Change(){
  //   this.viewChange.onViewchange();
  // }
  

  goSearch() {
    this.router.navigate(['dashboard/Search']);
  }

  lookFor() {
    this.data.changeMessage(this.Search)
  }

  grid(){
   this.isClicked = !this.isClicked;
   this.data.changeGridMsg(this.isClicked);
  }

  // listView() {
  
  // }
  // gridView() {
  //   this.data.changeGridMsg(false);
    
  // }

  gotoCart(){
    this.router.navigate(['dashboard/shopingCart']);
  }

}
