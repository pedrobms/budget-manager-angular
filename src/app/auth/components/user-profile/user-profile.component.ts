import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth.service';
import { User } from '../../user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  currentUser: User = new User();

  constructor(public authService: AuthService, private actRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.authService.currentUser.id);
    this.authService.getUserProfile(this.authService.getUserId()).subscribe((res) => {
      this.currentUser = res;
    });
  }
}
