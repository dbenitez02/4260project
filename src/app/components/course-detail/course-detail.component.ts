import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/common/course';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  
  // Grabs course details
  course: Course = new Course();

  //  Le injection
  constructor(private courseService: CourseService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => { this.getCourseDetail() });
  }

  getCourseDetail() {
    const currentCourseId: number = +this.route.snapshot.paramMap.get('id')!;
    console.log("course id: " + currentCourseId);

    this.courseService.getCourse(currentCourseId).subscribe(data => { this.course = data; });
  }
}
