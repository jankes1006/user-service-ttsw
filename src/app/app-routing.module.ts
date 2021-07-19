import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllOfersUserComponent } from './all-ofers-user/all-ofers-user.component';
import { AllOfferComponent } from './all-offer/all-offer.component';
import { AuthGuard } from './authGuard';
import { CreateOfferComponent } from './create-offer/create-offer.component';
import { DetailsOfferComponent } from './details-offer/details-offer.component';
import { EditDetailsComponent } from './edit-details/edit-details.component';
import { HomeComponent } from './home/home.component';
import { LoginCreateComponent } from './login-create/login-create.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LoginCreateComponent},
  {path: 'showAllOffer', component: AllOfferComponent, canActivate: [AuthGuard]},
  {path: 'showAllOffersUser', component: AllOfersUserComponent, canActivate: [AuthGuard]},
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
