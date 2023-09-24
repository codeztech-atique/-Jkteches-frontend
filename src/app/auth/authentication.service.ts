import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
// import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';
import { Userdetails } from '../models/user.model';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

// Decode JWT Token
import { getDecodedAccessToken } from '../utils/index'
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Injectable({ providedIn: 'root' })
export class AuthenticationService implements OnInit  {
    private currentUserSubject: BehaviorSubject<Userdetails>;
    public currentUser: Observable<Userdetails>;

    constructor(private http: HttpClient, private socialLoginService : SocialAuthService) {
      this.currentUserSubject = new BehaviorSubject<Userdetails>(JSON.parse(localStorage.getItem('currentUser') || '{}' ));
      this.currentUser = this.currentUserSubject.asObservable();
    }
   
    
    // public uri = environment.productionurl;
    public uri = environment.url;

    // tslint:disable-next-line: contextual-lifecycle
    ngOnInit() {
    }

    public get currentUserValue(): Userdetails {
      return this.currentUserSubject.value;
    }

    login(user) {
      return this.http.post<any>(`${this.uri}/auth/login`, user)
      .pipe(map(auser => {
          // login successful if there's a jwt token in the response
          if (auser) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              const getUserDetails = getDecodedAccessToken(auser.idToken);
              getUserDetails['accessToken'] = auser.accessToken;
              getUserDetails['idToken'] = auser.idToken;
              getUserDetails['refreshToken'] = auser.refreshToken;
              getUserDetails['id'] = auser.id;
              localStorage.setItem('currentUser', JSON.stringify(getUserDetails));
              this.currentUserSubject.next(getUserDetails);
              location.reload(); // Important line, Refresh page after login --- We have to refresh all the routes
              setTimeout(() => {
                location.reload();
              }, 2000)
          }
          return auser;
      }));
    }

    signInWithGoogle(token){
      const headers = new HttpHeaders({
        'provider': 'google', 
      });

      return this.http.post<any>(`${this.uri}/auth/social/login`, token, {headers})
      .pipe(map(auser => {
          if (auser) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              const getUserDetails = getDecodedAccessToken(auser.idToken);
              getUserDetails['accessToken'] = auser.accessToken;
              getUserDetails['idToken'] = auser.idToken;
              getUserDetails['refreshToken'] = auser.refreshToken;
              getUserDetails['id'] = auser.id;
              localStorage.setItem('currentUser', JSON.stringify(getUserDetails));
              this.currentUserSubject.next(getUserDetails);
              location.reload();
              setTimeout(() => {
                location.reload();
              }, 2000)
          }
          return auser;
      }));
    }

    signInWithFB(token){
      const headers = new HttpHeaders({
        'provider': 'facebook', 
      });

      return this.http.post<any>(`${this.uri}/auth/social/login`, token, {headers})
        .pipe(map(auser => {
          if (auser) {
              const getUserDetails = getDecodedAccessToken(auser.idToken);
              getUserDetails['accessToken'] = auser.accessToken;
              getUserDetails['idToken'] = auser.idToken;
              getUserDetails['refreshToken'] = auser.refreshToken;
              getUserDetails['id'] = auser.id;
              localStorage.setItem('currentUser', JSON.stringify(getUserDetails));
              this.currentUserSubject.next(getUserDetails);
              location.reload();
              setTimeout(() => {
                location.reload();
              }, 2000)
          }
          return auser;
      }));
    }

    signUp(user){
      return this.http.post<any>(`${this.uri}/auth/register`, user)
        .pipe(map(auser => {
          // login successful if there's a jwt token in the response
          if (auser) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              const getUserDetails = getDecodedAccessToken(auser.idToken);
              getUserDetails['accessToken'] = auser.accessToken;
              getUserDetails['idToken'] = auser.idToken;
              getUserDetails['refreshToken'] = auser.refreshToken;
              getUserDetails['id'] = auser.id;
              localStorage.setItem('currentUser', JSON.stringify(getUserDetails));
              this.currentUserSubject.next(getUserDetails);
          }
          return auser;
      }));
    }

    signUpWithGoogle(token){
      const headers = new HttpHeaders({
        'provider': 'google', 
      });

      return this.http.post<any>(`${this.uri}/auth/social/register`, token, {headers})
        .pipe(map(auser => {
          if (auser) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              const getUserDetails = getDecodedAccessToken(auser.idToken);
              getUserDetails['accessToken'] = auser.accessToken;
              getUserDetails['idToken'] = auser.idToken;
              getUserDetails['refreshToken'] = auser.refreshToken;
              getUserDetails['id'] = auser.id;
              localStorage.setItem('currentUser', JSON.stringify(getUserDetails));
              this.currentUserSubject.next(getUserDetails);
              location.reload(); // Important line, Refresh page after login --- We have to refresh all the routes
              setTimeout(() => {
                location.reload();
              }, 2000)
          }
          return auser;
      }));
    }

    signUpWithFB(token){
      const headers = new HttpHeaders({
        'provider': 'facebook', 
        'deviceType': 'web'
      });

      return this.http.post<any>(`${this.uri}/auth/social/register`, token, {headers})
        .pipe(map(auser => {
          if (auser) {
              const getUserDetails = getDecodedAccessToken(auser.idToken);
              getUserDetails['accessToken'] = auser.accessToken;
              getUserDetails['idToken'] = auser.idToken;
              getUserDetails['refreshToken'] = auser.refreshToken;
              getUserDetails['id'] = auser.id;
              localStorage.setItem('currentUser', JSON.stringify(getUserDetails));
              this.currentUserSubject.next(getUserDetails);
              location.reload(); // Important line, Refresh page after login --- We have to refresh all the routes
              setTimeout(() => {
                location.reload();
              }, 2000)
          }
          return auser;
      }));
    }

    changePassword(user) {
      return this.http.post<any>(`${this.uri}/auth/changepassword`, user)
      .pipe(map(auser => {
          // login successful if there's a jwt token in the response
          if (auser) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            console.log("Password changed successfully !!!")
          }
          return auser;
      }));
    }

    verifyEmail(user) {
      return this.http.post<any>(`${this.uri}/auth/verifyemail`, user)
      .pipe(map(auser => {
          // login successful if there's a jwt token in the response
          if (auser) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            console.log("Email verified successfully.")
            location.reload(); // Important line, Refresh page after login --- We have to refresh all the routes
            setTimeout(() => {
              location.reload();
            }, 2000)
          }
          return auser;
      }));
    }

    forgotPassword(user) {
      return this.http.post<any>(`${this.uri}/auth/forgotpassword`, user)
      .pipe(map(auser => {
          // login successful if there's a jwt token in the response
          if (auser) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            console.log("Forgot password link has sent to your email.");
          }
          return auser;
      }));
    }

    logout() {
        // remove user from local storage to log user out
        console.log('Logout !!');
        const isLogout = { isLogout: true };
        localStorage.setItem('currentStatus', JSON.stringify(isLogout));
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.socialLoginService.signOut();
        // this.router.navigate(['/']);
        
        location.reload();
        setTimeout(() => {
          location.reload();
        }, 2000)
    }

    public sharedUpdatedUserDetails(data) {
      this.currentUserSubject.next(data);
    }
}
