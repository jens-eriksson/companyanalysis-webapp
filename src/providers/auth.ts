import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser, AuthServiceConfig, LoginOpt } from "angularx-social-login";
import { HttpClient } from '@angular/common/http';

let config = new AuthServiceConfig([
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("289317418030-6ti4l95qesg9s2qnpvm9ohmu5kofntkp.apps.googleusercontent.com")
    },
    {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("247230532636474")
    }
]);

const fbLoginOptions: LoginOpt = {
    scope: 'pages_messaging,pages_messaging_subscriptions,email,pages_show_list,manage_pages',
    return_scopes: true,
    enable_profile_selector: true
  }; // https://developers.facebook.com/docs/reference/javascript/FB.login/v2.11
   
  const googleLoginOptions: LoginOpt = {
    scope: 'profile email'
  }; // https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig
 

@Injectable()
export class AuthProvider {
    public currentUser: SocialUser;

    constructor(
        private authService: AuthService,
        private httpClient: HttpClient
    ) {
    }

    initilize() {
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    }

    async signInWithGoogle(): Promise<SocialUser> {
        this.currentUser = await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID, googleLoginOptions);
        let path = "auth/google?id_token=" + this.currentUser.idToken;
        try {
            let jwt = await this.httpClient.get<string>(environment.apiBaseUrl + path).toPromise();
            this.currentUser["jwt"] = jwt;
        }
        catch(err) {
            if(this.currentUser) {
                this.currentUser["jwt"] = null;
            }
            
            console.error(err);
        }
        
        localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
        return this.currentUser;
    }

    async signInWithFacebook(): Promise<SocialUser> {
        this.currentUser = await this.authService.signIn(FacebookLoginProvider.PROVIDER_ID, fbLoginOptions);
        let path = "auth/facebook?access_token=" + this.currentUser.authToken;
        try {
            let jwt = await this.httpClient.get<string>(environment.apiBaseUrl + path).toPromise();
            this.currentUser["jwt"] = jwt;
        }
        catch(err){
            if(this.currentUser) {
                this.currentUser["jwt"] = null;
            }
            console.error(err);
        }
        
        localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
        return this.currentUser;
    }

    async signOut() {
        localStorage.removeItem("currentUser");
        this.currentUser = null;
        await this.authService.signOut();
        console.log("Signed out");
    }

    isAuthenticated(): boolean {
        if (this.currentUser) {
            return true;
        }

        return false;
    }

    isAuthorized() {
        if(this.currentUser && this.currentUser["jwt"]) {
            return true;
        }
        else {
            return false;
        }
    }
}

export function getAuthConfig() {
    return config;
}