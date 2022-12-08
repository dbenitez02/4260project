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
  thePageSize: number = 15;
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

  }
 
  handleSearchCourses() {
    const term: string = this.route.snapshot.paramMap.get('keyword')!;
    console.log("the keyword should be: " + term);
    this.courseService.searchCourses(term).subscribe(data => { this.courses = data; });

  }

  handleListCourses() {
    const hasTitle: boolean = this.route.snapshot.paramMap.has('id');

    if (hasTitle) {
      this.currentDepartmentId = +this.route.snapshot.paramMap.get('id')!;

    }

    // If not title was found
    else {
      this.currentDepartmentId = 1;
    }
  

    this.previousDepartmentId = this.currentDepartmentId;

    
    this.courseService.getCourseList(this.currentDepartmentId).subscribe( data => { this.courses = data; });
  } //  End of handleList Course

  
}//  end of CourseListComponent
