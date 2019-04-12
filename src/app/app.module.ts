
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppMaterial } from './app.material.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ForgetComponent } from './components/forget/forget.component';
import { HttpClientModule } from '@angular/common/http';
import { ResetComponent } from './components/reset/reset.component';
import { NotecardComponent } from './components/notecard/notecard.component';
import { MaincardComponent } from './components/maincard/maincard.component';
import { NoteComponent } from './components/note/note.component';
import { IconListComponent } from './components/icon-list/icon-list.component';
import { ContentComponent } from './components/content/content.component';
import { EditLableComponent } from './components/edit-lable/edit-lable.component';
import { UpdateNoteComponent } from './components/update-note/update-note.component';
import { ArchieveComponent } from './components/archieve/archieve.component';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { SearchFilterPipe } from './pipe/search-filter.pipe';
import { TrashComponent } from './components/trash/trash.component';
import { AddArchiveComponent } from './components/add-archive/add-archive.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { RemainderComponent } from './components/remainder/remainder.component';
import { DeleteLableComponent } from './components/delete-lable/delete-lable.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EditCardComponent } from './components/edit-card/edit-card.component';
import { CollaboratorComponent } from './components/collaborator/collaborator.component';
import { AskQuestionComponent } from './components/ask-question/ask-question.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { BarRatingModule } from "ngx-bar-rating";
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { CartComponent } from './components/cart/cart.component';
import { CartLoginComponent } from './components/cart-login/cart-login.component';
import { PackServiceComponent } from './components/pack-service/pack-service.component';
import { CartSignUpComponent } from './components/cart-sign-up/cart-sign-up.component';
import { ServiceCardComponent } from './components/service-card/service-card.component';
import { ShopingCartComponent } from './components/shoping-cart/shoping-cart.component';
import { NgxUiLoaderModule } from  'ngx-ui-loader';
import { AddReminderComponent } from './components/add-reminder/add-reminder.component';
import { ImageCropComponent } from './components/image-crop/image-crop.component';
import { StarratingComponent } from './components/starrating/starrating.component';
import { LikeComponent } from './components/like/like.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ForgetComponent,
    ResetComponent,
    NotecardComponent,
    MaincardComponent,
    NoteComponent,
    IconListComponent,
    ContentComponent,
    EditLableComponent,
    UpdateNoteComponent,
    ArchieveComponent,
    SearchComponent,
    SearchFilterPipe,
    TrashComponent,
    AddArchiveComponent,
    RemainderComponent,
    DeleteLableComponent,
    EditCardComponent,
    CollaboratorComponent,
    AskQuestionComponent,
    CartComponent,
    CartLoginComponent,
    PackServiceComponent,
    CartSignUpComponent,
    ServiceCardComponent,
    ShopingCartComponent,
    AddReminderComponent,
    ImageCropComponent,
    ArchieveComponent,
    StarratingComponent,
    LikeComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // RouterModule.forRoot([]),
    HttpClientModule,
    AppMaterial,
    ImageCropperModule,
    NgxMaterialTimepickerModule.forRoot(),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot() ,
    BarRatingModule, 
    NgxUiLoaderModule,
    ImageCropperModule


  ],
  entryComponents: [
    ImageCropComponent,
    EditLableComponent,
    EditCardComponent,
    CollaboratorComponent,
    AskQuestionComponent,
    PackServiceComponent
  ],
  // exports : [
  //   EditLableComponent
  // ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
