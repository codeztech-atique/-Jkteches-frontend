import { Component, Input, Output, EventEmitter, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { SharedservicesService }    from '../../services/sharedservices.service';
import { CommonService }    from '../../services/common.service';
import { AuthenticationService } from '../../auth/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Userdetails } from '../../models/user.model';
import appSettings from '../../config/app-settings';
import { CONSTANTS } from '../../config/constants';

@Component({
	selector: 'header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
	currentUser: Userdetails;
    currentUserSubscription: Subscription;
	public _subscription: Subscription;
	unreadNotification: any;
	userProfilePictureURL: any;
	notificationData: any;
	timeAgo: any;
	logo: any;

	
	@Input() appSidebarTwo;
	@Output() appSidebarEndToggled = new EventEmitter<boolean>();
	@Output() appSidebarMobileToggled = new EventEmitter<boolean>();
	@Output() appSidebarEndMobileToggled = new EventEmitter<boolean>();
	appSettings = appSettings;

	toggleAppSidebarMobile() {
		this.appSidebarMobileToggled.emit(true);
	}

	toggleAppSidebarEnd() {
		this.appSidebarEndToggled.emit(true);
	}

	toggleAppSidebarEndMobile() {
		this.appSidebarEndMobileToggled.emit(true);
	}

	toggleAppTopMenuMobile() {
		this.appSettings.appTopMenuMobileToggled = !this.appSettings.appTopMenuMobileToggled;
	}

	toggleAppHeaderMegaMenuMobile() {
		this.appSettings.appHeaderMegaMenuMobileToggled = !this.appSettings.appHeaderMegaMenuMobileToggled;
	}

	constructor(private route: ActivatedRoute, private authenticationService: AuthenticationService, private commonService: CommonService, private shared: SharedservicesService, private elementRef: ElementRef) {
		this.logo = "../../../assets/img/logo/logo.png"
		this.currentUserSubscription = this.authenticationService.currentUser.subscribe(async user => {
			this.currentUser = user;
			this.userProfilePictureURL = this.currentUser['custom:profileurl'];
			
		});
		
		this.commonService._subjectProfile$.subscribe((profilePicURL) => {
			const userDetails = JSON.parse(localStorage.getItem('currentUser'));
			userDetails['custom:profileurl'] = profilePicURL;
			localStorage.setItem('currentUser', JSON.stringify(userDetails))
			this.userProfilePictureURL = profilePicURL;
		});
	}

	ngOnInit() {
	}

	ngOnDestroy() {
		this.appSettings.appTopMenuMobileToggled = false;
		this.appSettings.appHeaderMegaMenuMobileToggled = false;
		this._subscription.unsubscribe();
	}
	

	logout() {
		this.authenticationService.logout();
	}
}
