import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/common/course';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})

export class CourseListComponent implements OnInit {

  courses: Course[] = [];
  searchMode: boolean;
  currentDepartmentId: number;
  previousDepartmentId: number = 1;

  // Le properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 20;
  theTotalElements: number = 0;

  // Le Course injection
  constructor(private courseService: CourseService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => { this.listCourses();});
  }

  /*
  // Populate the courses[] array.
  listCourses() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode) {
      this.handleSearchCourses(); 
    }
    else {
      this.courseService.getCourseList().subscribe(data => { this.courses = data;})
    }
  }// End of listCourses()
  */


  listCourses() { 
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode) {
      this.handleSearchCourses();
    }
    else {
      this.handleListCourses();
    }

    // check if 'id' parameter is available in the route parameters 
    // snapshot is the state of route at this given moment 
    // paramMap is a map of all route parameters 
    const hasDepartmentId: boolean = this.route.snapshot.paramMap.has('id'); 
    if (hasDepartmentId) { 
          // get the id value 
          // “+” convert a string value to a number  
          // get()! Tells the compiler that the returned value of get() is not null 
          this.currentDepartmentId = +this.route.snapshot.paramMap.get('id')!; 
    } 
    else { 
          // if category id is not available, default it to 1 
          this.currentDepartmentId = 1; 
    } 

    this.courseService.getCourseList(this.currentDepartmentId).subscribe( data => { this.courses = data;})
  }

  
  handleSearchCourses() {
    const term: string = this.route.snapshot.paramMap.get('keyword')!;
    console.log("the keyword should be: " + term);
    this.courseService.searchCourses(term).subscribe(data => { this.courses = data; });

    /** 
    this.courseService.getCourseListPaginate(
      this.thePageNumber -1,
      this.thePageSize,
      this.currentDepartmentId).subscribe(this.processResult());
      */

  }

  handleListCourses() {
    const hasDepartmentId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasDepartmentId) {
      this.currentDepartmentId = +this.route.snapshot.paramMap.get('id')!;

    }

    // If no department id found, default to one
    else {
      this.currentDepartmentId = 1;
    }
    /**
    if (this.previousDepartmentId != this.currentDepartmentId) {
      this.thePageNumber = 1;
    }

    this.previousDepartmentId = this.currentDepartmentId;

    
    this.courseService.getCourseListPaginate(
        this.thePageNumber - 1,
        this.thePageSize,
        this.currentDepartmentId).subscribe(this.processResult());
        */
      this.courseService.getCourseList(this.currentDepartmentId).subscribe( data => { this.courses = data; })
  } //  End of handleList Course


  /** 
  private processResult() {
    return (data: any) => {
      this.courses = data._embedded.courses;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }
  */
}//  end of CourseListComponent
