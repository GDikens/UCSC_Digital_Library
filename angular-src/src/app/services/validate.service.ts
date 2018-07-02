import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user){
    if(user.name == undefined || user.username == undefined || user.email == undefined || user.password == undefined){
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validateAddBook(book){
    if(book.title == undefined || book.isbn == undefined || book.pageCount == undefined || book.numberOfCopys == undefined){
      return false;
    } else {
      return true;
    }
  }

  validateBookNumberFields(book){
    var regex=/^[0-9]+$/;
    var isbn = book.isbn;
    var numberOfCopys = book.numberOfCopys;
    var pageCount = book.pageCount;
    if(isbn.match(regex) || numberOfCopys.match(regex) || pageCount.match(regex)){
      return true;
    } else {
      return false;
    }
  }

  validateReserveBook(reserve){
    if(reserve.userId == undefined || reserve.bookId == undefined || reserve.date == undefined || reserve.time == undefined){
      return false;
    } else {
      return true;
    }
  }

}
