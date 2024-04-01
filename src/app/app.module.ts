import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { JsonPipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserInfoComponent } from './Components/user-info/user-info.component';
import { UserDashboardComponent } from './Components/user-dashboard/user-dashboard.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    UserInfoComponent,
    UserDashboardComponent,
    NotFoundComponent,
    AppComponent,
  ],
  imports: [
    BrowserModule,
    MatProgressSpinnerModule,
    AppRoutingModule,
    FormsModule,
    JsonPipe,
    MatIconModule,
    RouterModule,
    MatButtonModule,
  ],

  providers: [provideClientHydration(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
