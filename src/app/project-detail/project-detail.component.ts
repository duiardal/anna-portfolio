import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

import { Project } from '../project';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

	project: Project;
	projectTitle: string;

	constructor(
		private route: ActivatedRoute,
		private projectService: ProjectsService,
		private location: Location
    ) { }

	ngOnInit(): void {
		this.getProject();
	}

	getProject(): void {
		const id = this.route.snapshot.paramMap.get('id');
		this.projectService.getProject(id)
		.subscribe( project => this.project = project);
	}

	goBack(): void {
		this.location.back();
	}

}
