import { Component, OnInit } from '@angular/core';
import { CV } from '../project';
import { ProjectsService } from '../projects.service';
import { Observable } from 'rxjs';
import { AngularFirestore,
		AngularFirestoreCollection,
		AngularFirestoreDocument } from '@angular/fire/firestore';


@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent implements OnInit {

	cv: CV;

	constructor(private projectService: ProjectsService, private afs: AngularFirestore) {
		// this.cv = this.afs.collection('cv').doc('PieETsAUo5F2ky8DgIMO').valueChanges();
	}

	ngOnInit() {
		this.getCv();
	}

	getCv(): void {
		this.projectService.getCv()
		.subscribe( cv => this.cv = cv);
	}


}
