import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 
import { CourseService } from './services/course.service';

import { AppComponent } from './app.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { SectionComponent } from './components/section/section.component';


const routes: Routes = [ 
  {path: 'courses/:id', component: CourseDetailComponent},
  {path: 'courses', component: CourseListComponent}, 
  {path: 'department/:id', component: CourseListComponent},
  {path: 'department', component: CourseListComponent}, 
  {path: 'serach/:keyword', component: CourseListComponent},
  {path: '', redirectTo: '/courses', pathMatch: 'full'}, 
  {path: '**', redirectTo: '/courses', pathMatch: 'full'} 
]; 

@NgModule({
  declarations: [
    AppComponent,
    DepartmentListComponent,
    SearchBarComponent,
    CourseListComponent,
    CourseDetailComponent,
    SectionComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,

  ],
  providers: [CourseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
