import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { Location } from '@angular/common';
import { User } from '../../Models/user';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss',
})
export class UserInfoComponent implements OnInit {
  userId!: number;
  user!: User;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private userService: UserService
  ) // private location: Location
  {}

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    this.loadUser();
  }

  loadUser() {
    this.isLoading = true;
    this.userService.getUserById(this.userId).subscribe({
      next: (response) => {
        this.user = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching user:', error);
        this.isLoading = false;
      },
    });
  }
  goBack() {
    console.log('Navigating back...');
    // this.location.back();
  }
}
