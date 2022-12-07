import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/common/department';
import { CourseService } from 'src/app/services/course.service';


@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {

  departments: Department[];

  //  Le injection
  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.listDepartments();
  }

  listDepartments() {
    this.courseService.getDepartment().subscribe( data => 
      { console.log("Departments=" + JSON.stringify(data)); 
        this.departments = data;
      });
  } //  End of listDepartments

} // End of DepartmentListComponent
