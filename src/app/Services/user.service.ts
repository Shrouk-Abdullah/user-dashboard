import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { expand, map, shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'https://reqres.in/api';
  cache: { [url: string]: any } = {};
  allUserData: any[] = [];

  constructor() {}

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
          console.error('Error fetching users:', error);
          observer.error(error);
        });
    });
  }

  getUsers(): Observable<any[]> {
    const firstPageUrl = `${this.baseUrl}/users?page=1`;

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
      console.log('Page from cash');
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
      console.log('User from cash');
      return of(this.cache[url]);
    }

    return this.fetchData(url).pipe(tap((data) => (this.cache[url] = data)));
  }

  clearCache() {
    this.cache = {};
    this.allUserData = [];
  }
}
