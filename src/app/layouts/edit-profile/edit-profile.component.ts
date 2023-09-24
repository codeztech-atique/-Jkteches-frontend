import { Component, OnDestroy, ViewEncapsulation,ViewChild, ElementRef, OnInit } from '@angular/core';
import { SharedservicesService }  from '../../services/sharedservices.service';
import { Router } from '@angular/router';
import appSettings from '../../config/app-settings';
import Swal from 'sweetalert2';
import 'lity';
import { AuthenticationService } from '../../auth/authentication.service';


@Component({
	selector: 'edit-profile',
	templateUrl: './edit-profile.component.html',
	encapsulation: ViewEncapsulation.None,
	styleUrls: ['./edit-profile.component.scss'],
})

export class EditProfile implements OnDestroy,OnInit {
	appSettings = appSettings;
	showEmojiIcon: any;
	userInfo: any;
	userName: any;
	userProfilePictureName: any;
	userProfilePictureURL: any;
	userMobileNo: any;
	userHomeNo: any;
	userOfficeNo: any;
	userAboutMe: any;
	listUserCountry: any;
	listCountry: any;
	listUserState: any;
	listUserCity: any;
	keepPreviousCountryRecord: any; 
	userCountry: any;
	userCountryFlag: any;
	userState: any;
	userCity: any;
    userBirthdate: any;
	userBirthdateDay: number = null;
	userBirthdateMonth: number = null;
	userBirthdateYear: number = null;

	// Define boolean variable
	
	flag: boolean;
	currentTab:String= 'about';
	newPasswordValue : string = '';
	confirmPasswordValue : string = '';
	newPasswordLengthError = false;
	PasswordMatchError = false;
	showAboutMe = false;

	constructor(private shared: SharedservicesService, private auth: AuthenticationService, private router: Router) {
		this.appSettings.appContentClass = 'p-0';
		this.userInfo = JSON.parse(localStorage.getItem('currentUser'));
		this.userProfilePictureURL = this.userInfo['custom:profileurl'];
		this.userProfilePictureName = this.userInfo['custom:profileurl'];
		
		if(this.userInfo['custom:name']) {
			this.userName = this.userInfo['custom:name'];
		}

		if(this.userInfo['custom:about']) {
			this.userAboutMe = this.userInfo['custom:about'];
			this.showAboutMe = false;
		}

		if(this.userInfo['custom:dob']) {
			this.userBirthdate = this.userInfo['custom:dob'];
			const userBirthDate = this.userBirthdate.split('/')
			this.userBirthdateDay = userBirthDate[0];
			this.userBirthdateMonth = userBirthDate[1];
			this.userBirthdateYear = userBirthDate[2];
		}

		this.flag = false;
		this.keepPreviousCountryRecord = "";

		this.userProfilePictureName = this.userProfilePictureName.split('/').pop();
	}

	ngOnInit(): void {}

	ngOnDestroy() {
		this.appSettings.appContentClass = '';
	}

	
	
	onChangeUserBio(data) {
	   this.userAboutMe = data;
	}

	onChangeCityName(data) {
		this.userCity = data;
	}


	
	onInputDay(day: string) {
		// Convert the input to a number
		const parsedDay = parseInt(day, 10);

		// Check if the input is a valid day (e.g., between 1 and 31)
		if (!isNaN(parsedDay) && parsedDay >= 1 && parsedDay <= 31) {
		  this.userBirthdateDay = parsedDay;
		} else {
		  // If the input is invalid or out of range, reset the input to the original value
		  this.userBirthdateDay = null;
		}
	}

	onInputMonth(month) {
		// Convert the input to a number
		const parsedMonth = parseInt(month, 10);

		// Check if the input is a valid month (e.g., between 1 and 12)
		if (!isNaN(parsedMonth) && parsedMonth >= 1 && parsedMonth <= 12) {
		  this.userBirthdateMonth = parsedMonth;
		} else {
		  // If the input is invalid or out of range, reset the input to the original value
		  this.userBirthdateMonth = null;
		}
	}

	onInputYear(year) {
		// Convert the input to a number
		const parsedYear = parseInt(year, 10);

		// Check if the input is a valid year (e.g., between 1950 and a reasonable upper limit)
		if (!isNaN(parsedYear) && parsedYear >= 1950) {
		  this.userBirthdateYear = parsedYear;
		} else {
		  // If the input is invalid or out of range, reset the input to the original value
		  this.userBirthdateYear = null;
		}
	}

	chooseState(state) {
		this.userState = state.name;
	}

	confirmSubmit() {
		const swalWithBootstrapButtons = Swal.mixin({
		  customClass: {
			confirmButton: 'btn btn-success btn-width-5',
			cancelButton: 'btn btn-white btn-width-5 mr-left-5'
		  },
		  buttonsStyling: false
		});
  
		swalWithBootstrapButtons.fire({
		  title: 'Are you sure ?',
		  text: 'You wanted to update the details',
		  icon: 'warning',
		  showConfirmButton: true,
		  showCancelButton: true,
		  allowOutsideClick: false,
		  cancelButtonText: 'Cancel'
		}).then((res) => {
		    if(res.value) {
				swalWithBootstrapButtons.fire({
					title: "Updating Details",
					imageUrl: "../../../assets/img/extra/loading.gif",
					imageWidth: 80,
					text: 'Please wait',
					showConfirmButton: false,
					showCancelButton: false,
					allowOutsideClick: false,
				});
				this.updateProfile();
		  	}
		})
	}

	addAboutMe() {
		if(this.showAboutMe) {
			this.showAboutMe = false;
		} else {
			this.showAboutMe = true;
		}
	}

	updateProfile() {
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
			  confirmButton: 'btn btn-success btn-width-5',
			  cancelButton: 'btn btn-white btn-width-5 mr-left-5'
			},
			buttonsStyling: false
		});

		this.userBirthdate = this.userBirthdateDay+"/"+this.userBirthdateMonth+"/"+this.userBirthdateYear;
		
		const data = {
			email: this.userInfo['email'],
			about: this.userAboutMe,
			dob: this.userBirthdate, 
		}

		this.shared.updateProfile(data).subscribe({
			next: async(response) => {
			  const responseData = JSON.parse(JSON.stringify(response));

              this.userInfo['custom:about'] = this.userAboutMe;
			  this.userInfo['custom:dob'] = this.userBirthdate;
			  
			  localStorage.setItem('currentUser', JSON.stringify(this.userInfo));
			 
			  swalWithBootstrapButtons.fire(
				'Success!',
				'You successfully updated profile details.',
				'success'
			  )

			  this.router.navigate([`/dashboard`]);
			},
			error: (error) => {
				console.log(error);
				swalWithBootstrapButtons.fire({
					title: 'Error !',
					text: 'Update failed',
					icon: 'error',
					showConfirmButton: false,
					showCancelButton: true,
					allowOutsideClick: false,
					cancelButtonText: 'Cancel'
				})
			}
		});
	}

	cancelUpdate() {
		this.router.navigate([`/dashboard`]);
	}


	changeTab(tab:string){
		this.currentTab=tab;
	}

	// Change Password functionality starts here

	varifyNewAndConfirmPass(field:string, value:string){
		this[field] = value;
		if(this.newPasswordValue.length < 6){
			this.newPasswordLengthError = true;
			this.PasswordMatchError = false;
		} else if(this.newPasswordValue !== this.confirmPasswordValue ){
			this.PasswordMatchError = true;
			this.newPasswordLengthError = false;
		} else {
			this.newPasswordLengthError = false;
			this.PasswordMatchError = false;
		}
	}

	showPassword :any = {
		newPassword : false,
		reenterPassword : false
	}

	togglePasswordVisibility(fieldName: string): void {
      this.showPassword[fieldName] = !this.showPassword[fieldName]
  	}

	changePasswordSubmit() {
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
			confirmButton: 'btn btn-success btn-width-5',
			cancelButton: 'btn btn-white btn-width-5 mr-left-5'
			},
			buttonsStyling: false
		});

		if(!this.newPasswordLengthError && !this.PasswordMatchError && this.newPasswordValue && this.confirmPasswordValue){
			swalWithBootstrapButtons.fire({
				title: 'Are you sure ?',
				text: 'You wanted to change the password',
				icon: 'warning',
				showConfirmButton: true,
				showCancelButton: true,
				allowOutsideClick: false,
				cancelButtonText: 'Cancel'
			}).then((res) => {
					if (res.value) {
						swalWithBootstrapButtons.fire(
							'Success!',
							'Password has been updated successfully.',
							'success'
						)
						this.updatePassword();
				    }
				}
			)
		} else {
			swalWithBootstrapButtons.fire({
				title: 'Error !',
				text: "Password and confirm password does not match !!!",
				icon: 'error',
				showConfirmButton: false,
				showCancelButton: true,
				allowOutsideClick: false,
				cancelButtonText: 'Cancel'
			})
		}
  }

  updatePassword() {
	const data = {
		email: this.userInfo['email'],
		password: this.newPasswordValue,
		newpassword: this.confirmPasswordValue
	}
	this.auth.changePassword(data)
      // .pipe(first())
      .subscribe({
        error: (e) => {
          console.log("Error is password update !!!")
        },
        complete: () => {
          console.log("Password successfully changed !!!")
        }
    })
  }
}