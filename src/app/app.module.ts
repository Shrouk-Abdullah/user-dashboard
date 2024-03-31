import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  NgbPaginationModule,
  NgbAlertModule,
} from '@ng-bootstrap/ng-bootstrap';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { Router } from '@angular/router';

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
    MatButtonToggleModule,
    MatCardModule,
    JsonPipe,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatTabsModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    MatButtonModule,
    MatTooltipModule,
  ],

  providers: [provideClientHydration(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
