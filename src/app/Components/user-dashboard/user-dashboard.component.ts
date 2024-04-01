import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  users: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  filteredUsers: any[] = [];
  searchQuery: string = '';
  search: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    this.userService.getUsers().subscribe({
      next: (users: any[]) => {
        console.log('Initial data fetched:', users);

        // Concatenate arrays from all pages into a single array
        this.users = users?.reduce((acc, curr) => acc.concat(curr), []);
        this.filteredUsers = this.users;
        this.isLoading = false;
      },
      error: (error) => {
        // this.errorMessage = this.errorHandlerService.getErrorMessage(error);
        this.isLoading = false;
      },
    });
  }

  searchById(): void {
    this.filteredUsers = this.users.filter(
      (user) => user.id.toString() === this.searchQuery
    );
  }

  filterUsers(searchEvent: Event): void {
    const searchQuery = (searchEvent.target as HTMLInputElement)?.value;
    this.filteredUsers = this.users.filter((user) =>
      user.id.toString().includes(searchQuery)
    );
  }
}
