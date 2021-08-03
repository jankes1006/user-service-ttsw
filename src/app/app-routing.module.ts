import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllOfersUserComponent } from './all-ofers-user/all-ofers-user.component';
import { AllOfferComponent } from './all-offer/all-offer.component';
import { AuthGuard } from './Guard/authGuard';
import { CreateOfferComponent } from './create-offer/create-offer.component';
import { DetailsOfferComponent } from './details-offer/details-offer.component';
import { EditDetailsComponent } from './edit-details/edit-details.component';
import { HomeComponent } from './home/home.component';
import { LoginCreateComponent } from './login-create/login-create.component';
import { AllUserComponent } from './all-user/all-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AdminGuard } from './Guard/adminGuard';
import { UserEditComponent } from './user-edit/user-edit.component';
import { BannedOfferEditComponent } from './banned-offer-edit/banned-offer-edit.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { LinearChartComponent } from './linear-chart/linear-chart.component';
import { CommentAndMarkListComponent } from './comment-and-mark-list/comment-and-mark-list.component';
import { CommentAndMarkComponent } from './comment-and-mark/comment-and-mark.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LoginCreateComponent},
  {path: 'forgotPassword', component: ForgotPasswordComponent},
  {path: 'showAllOffer/:page/:sizePage/:category/:searchTitle/:user/:sort', component: AllOfferComponent, canActivate: [AuthGuard]},
  {path: 'showAllOffer/:page/:sizePage/:category/:searchTitle/:user/:sort/:admin', component: AllOfferComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'showAllOffersUser', component: AllOfersUserComponent, canActivate: [AuthGuard]},
  {path: 'showAllUsers/:page/:sizePage/:username/:email/:role/:sort', component: AllUserComponent, canActivate: [AuthGuard, AdminGuard]}, 
  {path: 'detailUser/:id/:role', component: UserDetailsComponent, canActivate: [AuthGuard]},
  {path: 'bannedOfferEditAdmin/:id', component: BannedOfferEditComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'editUser', component: UserEditComponent, canActivate: [AuthGuard]},
  {path: 'createOffer', component: CreateOfferComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'detailOffer/:id', component: DetailsOfferComponent, canActivate: [AuthGuard]},
  {path: 'detailOffer/:id/:unregisteredUser', component: DetailsOfferComponent, canActivate: []},
  {path: 'detailOfferEdit/:id', component: EditDetailsComponent, canActivate: [AuthGuard]},
  {path: 'allOffersToComment/:page/:size/:title/:sort', component: CommentAndMarkListComponent, canActivate: [AuthGuard]},
  {path: 'commentOffer/:id', component: CommentAndMarkComponent, canActivate: [AuthGuard]},
  {path: 'statistic/:id/:typeStatistic/:title', component: LinearChartComponent, canActivate: [AuthGuard]},
  {path: 'setPassword/:token', component: SetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
