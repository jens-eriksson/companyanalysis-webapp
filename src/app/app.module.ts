import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";

import { CompanyAnalysis } from '../app/app';
import { HomePage } from '../pages/home/home';
import { SignInPage } from '../pages/sign-in/sign-in';

import { FooterComponent } from '../components/footer/footer';
import { HeaderComponent } from './../components/header/header';
import { ImageModalComponent } from './../components/image-modal/image-modal';
import { AccessGuardService } from './../core/auth-guard';
import { SignInInterceptor, TokenInterceptor } from './../core/token-interceptor';

import { TruncatePipe } from '../pipe/truncatepipe';

import { AuthProvider, getAuthConfig } from './../providers/auth';
import { IndicatorProvider } from './../providers/indicator';
import { CompanyProvider } from '../providers/comany';


@NgModule({
  declarations: [
    CompanyAnalysis,
    HomePage,
    SignInPage,
    HeaderComponent,
    FooterComponent,
    ImageModalComponent,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SocialLoginModule,
    RouterModule.forRoot([
      { path: 'sign-in', component: SignInPage},
      { path: 'start', component: HomePage, canActivate: [AccessGuardService]},
      { path: '', redirectTo: 'start', pathMatch: 'full'},
      { path: '**', redirectTo: 'start', pathMatch: 'full'}
    ])
  ],
  providers: [
    IndicatorProvider,
    CompanyProvider,
    AuthProvider,
    AccessGuardService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthConfig
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SignInInterceptor,
      multi: true
    }

  ],
  bootstrap: [CompanyAnalysis]
})
export class AppModule { }