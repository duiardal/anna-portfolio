import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from  '../../auth/auth.service';
import { ProjectsService } from '../../projects.service';
import { Project } from '../../project';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

	projects: Project[];

	constructor(private modalService: NgbModal, private projectService: ProjectsService, private  authService:  AuthService) { }

	ngOnInit() {
		this.projectService.getProjects().subscribe(data => {
			this.projects = data.map(a => {
				return {
					id: a.id,
					name: a.name,
					description: a.description,
					image: a.image
				} as Project;
			})
		});
	}

	delete(id: string) {
		this.projectService.deleteProject(id);
		console.log("Project " + id + " deleted");
		const modalRef = this.modalService.dismissAll();
	}

	openModal(content) {
		const modalRef = this.modalService.open(content, {centered: true});
	}

}


