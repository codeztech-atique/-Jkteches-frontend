import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router }    from '@angular/router';
import { NgForm }    from '@angular/forms';
import appSettings from '../../../config/app-settings';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'change-password',
	templateUrl: './change-password.html',
  styleUrls: ['./change-password.scss']
})

export class ChangePassword implements OnInit, OnDestroy {
  bg = '/assets/img/login-bg/login-bg-17.jpg';
  appSettings = appSettings;
  email: any;
  password: any;
  confirmPassword : any;
  isInvalidPassword = false;
  isInvalidConfirmPassword = false;
  isPasswordMatch = false;
  isDisabled: boolean;

  ngOnInit(): void {
    this.titleService.setTitle('JKteches | Change Password Page');
  }

  constructor(private router: Router, private renderer: Renderer2, private titleService: Title) {
    this.appSettings.appEmpty = true;
    this.isDisabled = true;
    this.renderer.addClass(document.body, 'bg-white');
  }

  ngOnDestroy() {
    this.appSettings.appEmpty = false;
    this.renderer.removeClass(document.body, 'bg-white');
  }

  checkpw(e) {
    this.password = e;
    const password = document.getElementById('password');
    const passwordRedgcpattern = /^.{6,}$/;

    if (password != null) {
      if(this.password.match(passwordRedgcpattern)) {
        // ✅ Add class
        password.classList.remove('is-invalid');
        password.classList.add('is-valid');
        this.isInvalidPassword = false;
        
      } else {
        // ✅ Remove class
        password.classList.remove('is-valid');
        password.classList.add('is-invalid');
        this.isInvalidPassword = true;
        this.isDisabled = true;
      }
    }
  }

  checkConfirmpw(e) {
    this.confirmPassword = e;
    const password = document.getElementById('confirmPassword');
    const passwordRedgcpattern = /^.{6,}$/;

    if (password != null) {
      if(this.password.match(passwordRedgcpattern)) {
        // ✅ Add class
        password.classList.remove('is-invalid');
        password.classList.add('is-valid');
        this.isInvalidConfirmPassword = false;
      } else {
        // ✅ Remove class
        password.classList.remove('is-valid');
        password.classList.add('is-invalid');
        this.isInvalidConfirmPassword = true;
        this.isDisabled = true;
      }
    }
  }


  @ViewChild('passwordMatchErr') passwordMatchErr :ElementRef; 
  verifyNewAndConfirmPass(field:string, value:string){
		this[field] = value;
    if(field == 'confirmPassword' && this.password !== this.confirmPassword){
      // this.passwordMatchErr.nativeElement.style['display']= "block"; 
      this.isPasswordMatch = false;
      this.isDisabled = false;
    } else {
      // this.passwordMatchErr.nativeElement.style['display']= "none"; 
      this.isPasswordMatch = true;
      this.isDisabled = true;
    }
	}
  
  showPassword = {
    newPassword : false,
    confirmPassword: false
  }

  togglePasswordVisibility (fieldName : string) {
    this.showPassword[fieldName] = !this.showPassword[fieldName]
  }
}
