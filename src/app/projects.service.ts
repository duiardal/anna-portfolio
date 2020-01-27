import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';

import { Project, CV } from './project';

import {
	AngularFirestore,
	AngularFirestoreCollection,
	AngularFirestoreDocument } from '@angular/fire/firestore';


@Injectable({
	providedIn: 'root'
})

export class ProjectsService {

	projectsCollection: AngularFirestoreCollection<Project>;
	projects: Observable<Project[]>;
	project: Observable<Project>;

	cacheProjects: Observable<Project[]>;

	cvCollection: AngularFirestoreCollection<CV>;
	cv: Observable<CV>;

	carouselImagesCollection: AngularFirestoreCollection<CV>;
	carouselImages: AngularFirestoreCollection<CV>;

	constructor(private afs: AngularFirestore) {
		this.projectsCollection = this.afs.collection<Project>('projects', ref => ref.orderBy('order', 'asc'));
		this.cvCollection = this.afs.collection<CV>('cv');
		this.carouselImagesCollection = this.afs.collection<CV>('carouselImages', ref => ref.orderBy('order', 'asc'));
	}

	/* För att HÄMTA projekt */

	getProjects(): Observable<Project[]> {
		if (!this.cacheProjects) {
			this.cacheProjects = this.projectsCollection.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data() as Project;
				const id = a.payload.doc.id;
				return { id, ...data };
				})
			),
			publishReplay(1), // this tells Rx to cache the latest emitted
	        refCount()  // and this tells Rx to keep the Observable alive as long as there are any Subscribers;
	        );
		}
		
		return this.cacheProjects;
		// return this.projectsCollection.snapshotChanges().pipe(
		// map(actions => actions.map(a => {
		// 	const data = a.payload.doc.data() as Project;
		// 	const id = a.payload.doc.id;
		// 	return { id, ...data };
		// 	})
		// ),
		// publishReplay(1), // this tells Rx to cache the latest emitted
  //       refCount())  // and this tells Rx to keep the Observable alive as long as there are any Subscribers;
	}

	// Clear configs
    clearCache() {
        this.cacheProjects = null;
    }

	getCarouselImages(): Observable<CV[]> {
		return this.carouselImagesCollection.snapshotChanges().pipe(
		map(actions => actions.map(a => {
			const data = a.payload.doc.data() as CV;
			const id = a.payload.doc.id;
			return { id, ...data };
			}))
		);
	}

	getProject(id: string): Observable<Project>  {
		return this.afs.doc(`projects/${id}`).snapshotChanges().pipe(
		map(snap => {
			const data = snap.payload.data() as Project;
			const id = snap.payload.id;
			return { id, ...data };
    	}));
	}

	getCv(): Observable<CV>  {
		return this.cvCollection.doc('IqQhkHKZiaNVcEYwPLHE').snapshotChanges().pipe(
		map(snap => {
			const data = snap.payload.data() as CV;
			const id = snap.payload.id;
			return { id, ...data };
    	}));
	}

	/* För att GÖRA ETT NYTT projekt */

	createProjects(project: Project) {
		return this.afs.collection<Project>('projects').add(project);
	}

	/* För att TA BORT ett projekt */

	deleteProject(projectId: string) {
		return this.afs.doc('projects/' + projectId).delete();
	}
	
}
