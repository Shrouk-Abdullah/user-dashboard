import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import {
  catchError,
  expand,
  map,
  shareReplay,
  takeWhile,
  tap,
  toArray,
} from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'https://reqres.in/api';
  cache: { [url: string]: any } = {};
  allUserData: any[] = [];

  constructor(private errorHandler: ErrorHandlerService) {}

  fetchData(url: string): Observable<any> {
    return new Observable<any>((observer) => {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          observer.next(data);
          observer.complete();
        })
        .catch((error) => {
          this.errorHandler.handleError(error); // Handle error using ErrorHandlerService
          observer.error(error);
        });
    });
  }

  getUsers(): Observable<any[]> {
    const firstPageUrl = `${this.baseUrl}/users?page=1`;
    let dataCollected = false; // Flag to track whether data has been collected

    return this.fetchPage(firstPageUrl).pipe(
      expand((data) => {
        this.cache[firstPageUrl] = data;
        if (this.allUserData.length < data.total) {
          this.allUserData.push(...data.data);
        }

        if (data.page < data.total_pages) {
          return this.fetchPage(`${this.baseUrl}/users?page=${data.page + 1}`);
        } else {
          return EMPTY;
        }
      }),
      map(() => this.allUserData.slice()),
      shareReplay(1)
    );
  }

  fetchPage(url: string): Observable<any> {
    if (this.cache[url]) {
      return of(this.cache[url]);
    }
    return this.fetchData(url).pipe(
      expand((data) => {
        if (data.page < data.total_pages) {
          return this.fetchData(`${this.baseUrl}/users?page=${data.page + 1}`);
        } else {
          return EMPTY;
        }
      })
    );
  }

  getUserById(id: number): Observable<any> {
    const url = `${this.baseUrl}/users/${id}`;

    if (this.cache[url]) {
      console.log('from cash');
      return of(this.cache[url]);
    }

    return this.fetchData(url).pipe(tap((data) => (this.cache[url] = data)));
  }

  clearCache() {
    this.cache = {};
    this.allUserData = [];
  }
}

// const userService = new UserService();

// userService.getUsers().subscribe((users: any[]) => {
//   console.log('Initial data fetched:', users);

//   userService.getUsers().subscribe((cachedUsers: any[]) => {
//     console.log('Data from cache:', cachedUsers);

//     userService.clearCache(); // Assuming you have a method to clear the cache

//     userService.getUsers().subscribe((freshUsers: any[]) => {
//       console.log('Fresh data fetched:', freshUsers);
//     });
//   });
// });
// private fetchAndCache(url: string): Observable<any> {
//   const allUserData: any[] = [];
// this.cache[url] = data.data;
// this.allUserData.push(...data.data);
//   return new Observable<any>((observer: Observer<any>) => {
//     const fetchPage = (url: string) => {
//       fetch(url)
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error('Network response was not ok');
//           }
//           return response.json();
//         })
//         .then((data) => {
//           this.cache[url] = data.data;
//           allUserData.push(...data.data);
//           observer.next(allUserData);
//           if (data.page < data.total_pages) {
//             fetchPage(`${this.baseUrl}/users?page=${data.page + 1}`);
//           } else {
//             observer.complete();
//           }
//         })
//         .catch((error) => {
//           observer.error(error);
//         });
//     };
//   });
// }

// private getCachedOrFetch(url: string): Observable<any> {
//   if (this.cache[url]) {
//     return new Observable<any>((observer: Observer<any>) => {
//       observer.next(this.cache[url]); // Return cached data if available
//       observer.complete();
//     });
//   } else {
//     return this.fetchAndCache(url); // Fetch data if not cached
//   }
// }

// getUsers(): Observable<any[]> {
//   const firstPageUrl = `${this.baseUrl}/users?page=1`;
//   return new Observable<any[]>((observer) => {
//     this.fetchData = (url: string) => {
//       fetch(url)
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error('Network response was not ok');
//           }
//           return response.json();
//         })
//         .then((data) => {
//           const allUserData = data.data;
//           observer.next(allUserData);

//           if (data.page < data.total_pages) {
//             fetchData(`${this.baseUrl}/users?page=${data.page + 1}`);
//           } else {
//             observer.complete();
//           }
//         })
//         .catch((error) => {
//           observer.error(error);
//         });
//     };

//     console.log(this.fetchData(firstPageUrl));
//     this.fetchData(firstPageUrl);
//   }).pipe(
//     expand((data) => {
//       console.log(data, 'mlm;');
//       // Check for more pages
//       if (data.page < data.total_pages) {
//         return this.fetchData(`${this.baseUrl}/users?page=${data.page + 1}`);
//       } else {
//         return EMPTY;
//       }
//     }),
//     map((data) => data.data),
//     takeWhile((data) => data.length > 0), // Stop when no more data
//     toArray(), // Collect all data into a single array
//     shareReplay(1) // Cache the final result for subsequent subscriptions
//   );
// }
