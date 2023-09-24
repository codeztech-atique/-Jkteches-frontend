/** @format */

import { Component, OnInit, OnDestroy, ViewChildren, Renderer2} from "@angular/core";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../auth/authentication.service";
import { HttpClient } from "@angular/common/http";
import appSettings from "../../../config/app-settings";
import { Title } from '@angular/platform-browser';

@Component({
  selector: "otp",
  templateUrl: "./otp.html",
  styleUrls: ["./otp.scss"],
})

export class OtpPage implements OnInit {
  bg = "/assets/img/login-bg/login-bg-17.jpg";
  app;
  appSettings = appSettings;
  form: any;
  

  constructor(
    private router: Router, private auth: AuthenticationService, private http: HttpClient, private titleService: Title, private renderer: Renderer2 ) {
    this.form = this.toFormGroup(this.formInput);
    this.appSettings.appEmpty = true;
    this.renderer.addClass(document.body, 'bg-white');
  }
  ngOnInit(): void {
    this.titleService.setTitle('Jkteches | Varification Page');
  }

  formInput = ["input1", "input2", "input3", "input4"];
  @ViewChildren("formRow") rows: any;

  toFormGroup(elements) {
    const group: any = {};
    elements.forEach((key) => {
      group[key] = new FormControl("", Validators.required);
    });
    return new FormGroup(group);
  }

  keyUpEvent(event, index) {
    let pos = index;
    if (event.keyCode === 8 && event.which === 8) {
      pos = index - 1;
    } else {
      pos = index + 1;
    }
    if (pos > -1 && pos < this.formInput.length) {
      this.rows._results[pos].nativeElement.focus();
    }
  }

  verifyLater() {
    this.router.navigate(['/register']);
    location.reload();
  }

  ngOnDestroy() {
    this.appSettings.appEmpty = false;
    this.renderer.removeClass(document.body, 'bg-white');
  }
}
