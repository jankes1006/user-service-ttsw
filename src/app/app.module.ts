import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { CreateOfferComponent } from './create-offer/create-offer.component';
import { AllOfferComponent } from './all-offer/all-offer.component';
import { LoginCreateComponent } from './login-create/login-create.component';
import { AuthGuard } from './Guard/authGuard';
import { DetailsOfferComponent } from './details-offer/details-offer.component';
import { EditDetailsComponent } from './edit-details/edit-details.component';
import { AllOfersUserComponent } from './all-ofers-user/all-ofers-user.component';
import { AllUserComponent } from './all-user/all-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AdminGuard } from './Guard/adminGuard';
import { UserEditComponent } from './user-edit/user-edit.component';
import { AllOfferAdminComponent } from './all-offer-admin/all-offer-admin.component';
import { BannedOfferEditComponent } from './banned-offer-edit/banned-offer-edit.component';
import { FooterComponent } from './footer/footer.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SetPasswordComponent } from './set-password/set-password.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HomeComponent,
    LoginComponent,
    CreateOfferComponent,
    AllOfferComponent,
    LoginCreateComponent,
    DetailsOfferComponent,
    EditDetailsComponent,
    AllOfersUserComponent,
    AllUserComponent,
    UserDetailsComponent,
    UserEditComponent,
    AllOfferAdminComponent,
    BannedOfferEditComponent,
    FooterComponent,
    ForgotPasswordComponent,
    SetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
