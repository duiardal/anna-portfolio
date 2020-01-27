import { Component, OnInit } from '@angular/core';
import { Project, CV } from '../project';
import { ProjectsService } from '../projects.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent implements OnInit {
	selectedProject: Project;
	projects: Project[];

	carouselImages: CV[];

  constructor(private projectService: ProjectsService, config: NgbCarouselConfig) {
    config.interval = 3000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
    config.showNavigationArrows = false;
    config.showNavigationIndicators = false;
  }

	ngOnInit() {
		this.getProjects();
		this.getCarouselImages();
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

	getCarouselImages(): void {
		this.projectService.getCarouselImages()
			.subscribe(carouselImages => {
				this.carouselImages = carouselImages;
			});
	}



}