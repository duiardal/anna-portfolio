import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Project } from '../project';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

	selectedProject: Project;
	projects: Project[];

	constructor(private projectService: ProjectsService) {
	}

	ngOnInit() {
		this.getProjects();
	}

	onSelect(project: Project): void {
		this.selectedProject = project;
	}

	getProjects(): void {
		this.projectService.getProjects()
			.subscribe(projects => {
				this.projects = projects;
			});
	}

}
