import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgetComponent } from './components/forget/forget.component';
import { ResetComponent } from './components/reset/reset.component';
import { NoteComponent } from './components/note/note.component';
import { ContentComponent } from './components/content/content.component';
import { TrashComponent } from './components/trash/trash.component';
import { SearchComponent } from './components/search/search.component';
import { ArchieveComponent } from './components/archieve/archieve.component';
import { MaincardComponent } from './components/maincard/maincard.component';
import { AskQuestionComponent } from './components/ask-question/ask-question.component';
import { CartComponent } from './components/cart/cart.component';
import { CartLoginComponent } from './components/cart-login/cart-login.component';
import { CartSignUpComponent } from './components/cart-sign-up/cart-sign-up.component';
import { ShopingCartComponent } from './components/shoping-cart/shoping-cart.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CartComponent
  },
  {
   path:'cart',
   component : CartComponent
  }, {
    path: 'cartLogin',
    component: CartLoginComponent
  },
  {
    path : 'cartSignUp',
    component : CartSignUpComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'resetpassword/:token',
    component: ResetComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo:'content',
        pathMatch:'full'
      },

      {
        path: 'note',
        component: NoteComponent
      },
      {
        path: 'content',
        component: ContentComponent
      },
      {
        path: 'trash',
        component: TrashComponent
      },
      {
        path: 'Search',
        component: SearchComponent
      },
      {
        path: 'archive',
        component: ArchieveComponent
      },
      {
        path: 'askQue/:noteId',
        component: AskQuestionComponent
      },
      {
        path: 'shopingCart',
        component : ShopingCartComponent
      }
    ]

  },
  {
    path: 'forget',
    component: ForgetComponent
  },
  {
    path: 'resetpassword/:token',
    component: ResetComponent
  },
  // {path: '**', redirectTo: 'login'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
