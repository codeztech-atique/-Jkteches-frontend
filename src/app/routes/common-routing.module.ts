import { NgModule }                            from '@angular/core';
import { RouterModule, Routes }                from '@angular/router';

// Callback Component 

// User Login / Register
import { LoginPage }                         from '../components/common/login/login';
import { RegisterPage }                      from '../components/common/register/register';
import { ForgotPassword }                    from '../components/common/forgot-password/forgot-password';
import { ChangePassword }                    from '../components/common/change-Password/change-password';
import { OtpPage }                           from '../components/common/otp/otp';  


const commonRoutes: Routes = [
  // Common Routes
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: LoginPage }, 
  { path: 'forgot-password', component: ForgotPassword },
  { path: 'change-password', component: ChangePassword },
  { path: 'register', component: RegisterPage },
  { path: 'otp', component: OtpPage }, 
];

@NgModule({
  imports: [RouterModule.forChild(commonRoutes)],
  exports: [RouterModule]
})


export class CommonRoutingModule { }
