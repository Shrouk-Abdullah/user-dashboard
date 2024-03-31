import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { UserDashboardComponent } from './Components/user-dashboard/user-dashboard.component';
import { UserInfoComponent } from './Components/user-info/user-info.component';

export const routes: Routes = [
  { path: '', component: UserDashboardComponent },
  { path: 'user/:id', component: UserInfoComponent },
  { path: '**', component: NotFoundComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
