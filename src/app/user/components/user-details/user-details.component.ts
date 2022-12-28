import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../../user';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  currentUser: User = new User();

  constructor(
    public authService: AuthService,
    public userService: UserService,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userService.getUserData(this.authService.getUserId()).subscribe((res) => {
      this.currentUser = res;
    });
  }
}
