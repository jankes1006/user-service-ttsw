import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { CreateOfferComponent } from './create-offer/create-offer.component';
import { AllOfferComponent } from './all-offer/all-offer.component';
import { LoginCreateComponent } from './login-create/login-create.component';
import { AuthGuard } from './authGuard';
import { DetailsOfferComponent } from './details-offer/details-offer.component';
import { EditDetailsComponent } from './edit-details/edit-details.component';
import { AllOfersUserComponent } from './all-ofers-user/all-ofers-user.component';

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
    AllOfersUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
