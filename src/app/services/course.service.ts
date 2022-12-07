import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Course } from '../common/course'; 
import { Observable } from 'rxjs'; 
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = 'http://localhost:8080/api/courses'; 
 
  // dependency injection: Inject httpClient which is part of HttpClientModule 
    constructor(private httpClient: HttpClient) { } 
   
  /* getProductList() fetches product data from REST API based on the baseUrl, converts it 
  to a Product array, and returns an Observable containing the Product array. */ 
    getCourseList(): Observable<Course[]> { 
  /* HttpClient’s get(url: string) constructs an observable that, when subscribed, causes the 
  GET request to execute on the server. It is an asynchronous method fetching data from 
  the given URL and returns GetResponse as response type. 
  pipe() combines multiple RxJS operators to compose asynchronous operations. 
  map() transforms items emitted by an Observable by applying a function to each item. 
  This map() converts JSON results from Spring Data REST to an array of Product objects. So 
  after those methods, finally an Observable containing the Product array is returned */ 
  return this.httpClient.get<GetResponse>(this.baseUrl).pipe( 
        map(response => response._embedded.products) 
  ); 
    } 
   
  } // end of ProductService class  


  /* Unwrap the product data in JSON from a REST API endpoint into a Product array 
  _embedded is an attribute at top of the JSON data from Spring Data REST 
  products is the name of an array containing products. */ 
  interface GetResponse { 
    _embedded: { products: Course[];  } 
  } 
