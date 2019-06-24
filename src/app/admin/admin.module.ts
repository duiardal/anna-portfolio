import { NgModule } from  '@angular/core';
import { CommonModule } from  '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectListComponent } from  './project-list/project-list.component';
import { ProjectCreateComponent } from  './project-create/project-create.component';
import { ProjectUpdateComponent } from  './project-update/project-update.component';
import { ProjectComponent } from  './project/project.component';
import { AdminRoutingModule } from  './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { AdminPageComponent } from './admin-page/admin-page.component';

@NgModule({
	declarations: [ProjectListComponent, ProjectCreateComponent, ProjectUpdateComponent, ProjectComponent, LoginComponent, AdminPageComponent],
	imports: [
		CommonModule,
		AdminRoutingModule,
		ReactiveFormsModule,
	]
})
export  class  AdminModule { }