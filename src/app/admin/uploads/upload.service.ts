import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Upload } from './upload'

@Injectable({
  providedIn: 'root'
})
export class UploadService {

	uploadPercent: Observable<number>;
	downloadURL: Observable<string>;
	image: string = null;
	

	constructor(private storage: AngularFireStorage, private afs: AngularFirestore) { }

	public uploadImage(event) {
		const file: any = event.target.files[0];
		const filePath: string = `images/${file.name}`
		const task: AngularFireUploadTask = this.storage.upload(filePath, file);

		// const downloadURL = task.downloadURL();

		// downloadURL.subscribe(url=>{
		// 	if(url){
		// 		console.log(url);
		// 	//wirte the url to firestore
		// 	}
		// })

		const ref: AngularFireStorageReference = this.storage.ref(filePath);
		// this.uploadPercent = task.percentageChanges();
		// console.log('Image uploaded!');
		task.snapshotChanges().pipe(
			finalize(() => this.downloadURL = ref.getDownloadURL() )
		)
		.subscribe();
	}

}
