import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Course } from '../common/course'; 
import { Observable } from 'rxjs'; 
import { map } from 'rxjs/operators';
import { Department } from '../common/department';


@Injectable({
  providedIn: 'root'
})


export class CourseService {
  private baseUrl = 'http://localhost:8080/api/courses'; 

  // REST API endpoint for department
  private departmentURL = 'http://localhost:8080/api/department';
 
  // dependency injection: Inject httpClient which is part of HttpClientModule 
  constructor(private httpClient: HttpClient) { }
  
  getCourseList(departmentId: number):Observable<Course[]> {
    const searchUrl = `${this.baseUrl}/search/findByDepartmentId?id=${departmentId}`; 
    return this.httpClient.get<GetResponseCourses>(searchUrl).pipe(map(response => response._embedded.courses));
  }

  getCourse(courseId: number): Observable<Course> {
    const courseURL = `${this.baseUrl}/${courseId}`;

    return this.httpClient.get<Course>(courseURL);
  } // End of getCourse

  getDepartment():Observable<Department[]> {
    return this.httpClient.get<GetResponseDepartment>(this.departmentURL).pipe(
      map(repsonse => repsonse._embedded.department));
  }

  getCourseListPaginate(
    thePage: number,
    thePageSize: number,
    theDepartmentId: number): Observable<GetResponseCourses> {
      // http://localhost:8080/api/courses/search/findbyId?id=1&page=0&size=20
      const url = `${this.baseUrl}/search/findByDepartmentId` 
      + `?id=${theDepartmentId}&page=${thePage}&size=${thePageSize}`;
    
        return this.httpClient.get<GetResponseCourses>(url);
    } //  End getCourseListPaginate()

  /**
   * 
   * @param keyword 
   * @returns an object
   */
  searchCourses(keyword: string): Observable<Course[]> {
    const searchURL = `${this.baseUrl}/search/findByTitleContaining?title=${keyword}`;
    console.log("From course service search url: " + searchURL);
    return this.httpClient.get<GetResponseCourses>(searchURL).pipe(map(response => response._embedded.courses));
  } // End of searchCourses()
  
} // end of ProductService class  


  /* Unwrap the product data in JSON from a REST API endpoint into a Product array 
  _embedded is an attribute at top of the JSON data from Spring Data REST 
  products is the name of an array containing products. */ 
  /**
  interface GetResponseCourses { 
    _embedded: { courses: Course[];  },
    page: {
      size: number,
      totalElements: number,
      totalPages: number,
      number: number,
    } 
  } //  End of GetResponseCourses
  */

  interface GetResponseDepartment { 
    _embedded: { department: Department[]; }
  } // End of getResponseDepartment

  interface GetResponseCourses {
    _embedded: { courses: Course[]; }
  }