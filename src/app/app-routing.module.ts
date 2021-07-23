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

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LoginCreateComponent},
  {path: 'showAllOffer/:page/:sizePage/:category/:searchTitle/:user', component: AllOfferComponent, canActivate: [AuthGuard]},
  {path: 'showAllOffer/:page/:sizePage/:category/:searchTitle/:user/:admin', component: AllOfferComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'showAllOffersUser', component: AllOfersUserComponent, canActivate: [AuthGuard]},
  {path: 'showAllUsers/:page/:sizePage/:username/:email/:role', component: AllUserComponent, canActivate: [AuthGuard, AdminGuard]}, 
  {path: 'detailUserEditAdmin/:id', component: UserDetailsComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'bannedOfferEditAdmin/:id', component: BannedOfferEditComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'editUser', component: UserEditComponent, canActivate: [AuthGuard]},
  {path: 'createOffer', component: CreateOfferComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'detailOffer/:id', component: DetailsOfferComponent, canActivate: [AuthGuard]},
  {path: 'detailOfferEdit/:id', component: EditDetailsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
