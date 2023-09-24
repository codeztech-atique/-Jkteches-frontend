import { Component, OnDestroy, ViewEncapsulation,ViewChild, ElementRef, OnInit } from '@angular/core';
import { CONSTANTS } from '../../config/constants';
import { SharedservicesService }  from '../../services/sharedservices.service';
import { CommonService }    from '../../services/common.service';
import { Router } from '@angular/router';
import appSettings from '../../config/app-settings';
import Swal from 'sweetalert2';
import 'lity';

@Component({
	selector: 'edit-profile',
	templateUrl: './edit-profile.component.html',
	encapsulation: ViewEncapsulation.None,
	styleUrls: ['./edit-profile.component.scss'],
	host: {
    '(document:click)': 'closeDropdownOnclickOutside($event)',
  }
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
	userBirthdateDay: any;
	userBirthdateMonth: any;
	userBirthdateYear: any;

	// Define boolean variable
	showEmoji: boolean;
	showMobileNumber: boolean;
	showHomeNumber: boolean;
	showOfficeNumber: boolean;
	showAboutMe: boolean;
	showCountry: boolean;
	showState: boolean;
	flag: boolean;
	currentTab:String= 'about';
	newPasswordValue : string = '';
	confirmPasswordValue : string = '';
	newPasswordLengthError = false;
	PasswordMatchError = false;

	constructor(private shared: SharedservicesService, private commonService: CommonService, private router: Router) {
		this.appSettings.appContentClass = 'p-0';
		this.userInfo = JSON.parse(localStorage.getItem('currentUser'));
		this.userProfilePictureURL = this.userInfo['custom:profileurl'];
		this.userProfilePictureName = this.userInfo['custom:profileurl'];
		
		if(this.userInfo['custom:name']) {
			this.userName = this.userInfo['custom:name'];
		}

		if(this.userInfo['custom:mood']) {
			this.showEmojiIcon = this.userInfo['custom:mood'];
		}

		if(this.userInfo['custom:mobile']) {
			this.userMobileNo = this.userInfo['custom:mobile'];
			this.showMobileNumber = false;
		}

		if(this.userInfo['custom:home']) {
			this.userHomeNo = this.userInfo['custom:home'];
			this.showHomeNumber = false;
		}

		if(this.userInfo['custom:office']) {
			this.userOfficeNo = this.userInfo['custom:office'];
			this.showOfficeNumber = false;
		}

		if(this.userInfo['custom:description']) {
			this.userAboutMe = this.userInfo['custom:description'];
			this.showAboutMe = false;
		}

		if(this.userInfo['custom:country']) {
			this.userCountry = this.userInfo['custom:country'];
		}

		if(this.userInfo['custom:state']) {
			this.userState = this.userInfo['custom:state'];
		}

		if(this.userInfo['custom:city']) {
			this.userCity = this.userInfo['custom:city'];
		}

		if(this.userInfo['custom:birthdate']) {
			this.userBirthdate = this.userInfo['custom:birthdate'];
			const userBirthDate = this.userBirthdate.split('/')
			this.userBirthdateDay = userBirthDate[0];
			this.userBirthdateMonth = userBirthDate[1];
			this.userBirthdateYear = userBirthDate[2];
		}

		this.showCountry = false;
		this.flag = false;
		this.keepPreviousCountryRecord = "";

		this.userProfilePictureName = this.userProfilePictureName.split('/').pop();
	}

	ngOnInit(): void {}

	ngOnDestroy() {
		this.appSettings.appContentClass = '';
	}

	selectMood() {
		if(this.showEmoji) {
			this.showEmoji = false;
		} else {
			this.showEmoji = true;
		}
	}

	addEmoji(event) {
	   this.showEmoji = false;	
       this.showEmojiIcon = event.emoji.native;
	}

	addMobileNumber() {
		if(this.showMobileNumber) {
			this.showMobileNumber = false;
		} else {
			this.showMobileNumber = true;
		}
	}

	addHomeNumber() {
		if(this.showHomeNumber) {
			this.showHomeNumber = false;
		} else {
			this.showHomeNumber = true;
		}
	}

	addOfficeNumber() {
		if(this.showOfficeNumber) {
			this.showOfficeNumber = false;
		} else {
			this.showOfficeNumber = true;
		}
	}

	addAboutMe() {
		if(this.showAboutMe) {
			this.showAboutMe = false;
		} else {
			this.showAboutMe = true;
		}
	}

	onChangeUserBio(data) {
	   this.userAboutMe = data;
	}

	onChangeCityName(data) {
		this.userCity = data;
	}

	showDropDownCountry() {
		if(!this.flag) {
			if(this.showCountry) {
				this.showCountry = false;
			} else {
				this.showCountry = true;
			}
		}
	}

	showDropDownState() {
      if(this.showState) {
		this.showState = false;
	  } else {
		this.showState = true;
	  }
	}

	keepOpenDropDownCountry() {
		this.showCountry = true;
		this.flag = true;
	}

	searchCountryName(countryName) {
		if(this.keepPreviousCountryRecord.length < countryName.length) {
			this.keepPreviousCountryRecord = countryName;
		} else {
			this.listUserCountry = this.listCountry;
		}
		this.listUserCountry = this.listUserCountry.filter((data) => { 
			data.name = data.name.toLowerCase();
			countryName = countryName.toLowerCase();
			return data.name.includes(countryName)
		});
		if(countryName == "") {
			this.listUserCountry = this.listCountry;
		}
	}

	chooseCountry(country) {
		this.userCountry = country.name;
		if(country.states.length == 0) {
			this.userState = "Others";
		} else {
			this.userState = "";
		}
		country.states.push(
			{
                "name": "Others",
                "type": null
            }
		);
		this.listUserState = country.states;
		this.userCountryFlag = country.emoji;
		this.flag = false;
		this.listUserCountry = this.listCountry;
	}

	onChangeBirthday(data) {
		if(data < 1) {
			this.userBirthdateDay = 1;
		} else if(data >= 31) {
			this.userBirthdateDay = 31;
		} else {
			this.userBirthdateDay = data;
		}
	}

	onChangeBirthMonth(data) {
		if(data < 1) {
			this.userBirthdateMonth = 1;
		} else if(data >= 12) {
			this.userBirthdateMonth = 12;
		} else {
			this.userBirthdateMonth = data;
		}
	}

	onChangeBirthYear(data) {
		if(data < 1) {
			this.userBirthdateYear = 1940;
		} else if(data < 1940) {
			this.userBirthdateYear = 1940;
		} else {
			this.userBirthdateYear = data;
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
		  	}
		})
	}

	cancelUpdate() {
		this.router.navigate([`/dashboard`]);
	}

	@ViewChild('selectStateElement') selectStateElement: ElementRef;
	@ViewChild('selectCountryElement') selectCountryElement: ElementRef;
	
	closeDropdownOnclickOutside(event: MouseEvent) {
    if (!this.selectCountryElement?.nativeElement.contains(event.target as Node)) {
      this.showCountry = false;
    }

    if (!this.selectStateElement?.nativeElement.contains(event.target as Node)) {
      this.showState = false;
    }
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
		if(!this.newPasswordLengthError && !this.PasswordMatchError ){
			const swalWithBootstrapButtons = Swal.mixin({
				customClass: {
				confirmButton: 'btn btn-success btn-width-5',
				cancelButton: 'btn btn-white btn-width-5 mr-left-5'
				},
				buttonsStyling: false
			});
		
			swalWithBootstrapButtons.fire({
				title: 'Are you sure ?',
				text: 'You wanted to change the password',
				icon: 'warning',
				showConfirmButton: true,
				showCancelButton: true,
				allowOutsideClick: false,
				cancelButtonText: 'Cancel'
			}).then( 
				()=>{
					swalWithBootstrapButtons.fire({
						title: 'Password has ben updated successfully',
						// text: 'You wanted to update the details',
						icon: 'success',
						showConfirmButton: true,
						// showCancelButton: true,
						allowOutsideClick: false,
						cancelButtonText: 'Cancel'
					})
				}
			)
		}
  }
	// Change Password functionality ends here
}