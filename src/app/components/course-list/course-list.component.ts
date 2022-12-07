import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/common/course';
@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses: Course[];

  // Le Course injection
  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.listCourses();
  }

  // Populate the courses[] array.
  listCourses() {
    this.courseService.getCourseList().subscribe(data => { this.courses = data});
  }

}
