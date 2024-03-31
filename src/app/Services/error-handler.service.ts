import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  handleError(error: any) {
    throw new Error('Method not implemented.');
  }
  constructor() {}

  getErrorMessage(error: any): string {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        return 'Network error. Please check your internet connection and try again.';
      }
      return `HTTP Error: ${error.statusText} (${error.status})`;
    } else if (typeof error === 'string') {
      return error;
    } else {
      return 'An unexpected error occurred. Please try again later.';
    }
  }
}
