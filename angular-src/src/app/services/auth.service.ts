import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(
    private http:Http
    //private jwtHelper:JwtHelperService
  ) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers}).pipe(map(res => res.json()));
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers}).pipe(map(res => res.json()));
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/users/profile', {headers: headers}).pipe(map(res => res.json()));
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  addBook(book){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/books/addbook', book, {headers: headers}).pipe(map(res => res.json()));
  }

  addReserve(reserve){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/reserve/reservebook', reserve, {headers: headers}).pipe(map(res => res.json()));
  }

  loggedIn(){
    if(this.authToken){
      return this.user;
    } else {
      return false;
    }
    // return this.jwtHelper.isTokenExpired();
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  getBookData(){
    return this.http.get('http://localhost:3000/books/getsomebooks').pipe(map(res => res.json()));
  }

  bookSearch(terms: Observable <string>) {
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.bookSearchEntries(term));
  }

  bookSearchEntries(term) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/books/getbooktitle?title='+term,{headers: headers}).map(res => res.json());
  }

}
