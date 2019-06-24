import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from  '../../auth/auth.service';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProjectsService } from '../../projects.service';
import { Project } from '../../project';
import { UploadService } from '../uploads/upload.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {

	uploadPercent: Observable<number>;
	downloadURL: Observable<string>;
	fileObj: Observable<string>;
	resultURL: string;

	constructor(private storage: AngularFireStorage, private fb: FormBuilder, private cd: ChangeDetectorRef, private projectService: ProjectsService, private uploadService: UploadService) { }

	ngOnInit() {
		this.ResetForm();
	}

	newProjectForm = this.fb.group({
		name: [''],
		image: [''],
		description: [''],
		year: [''],
		shortDescription: ['']
	})

	onSubmit() {
		this.uploadImg();
		alert("Project uploaded!");
	}

	onFileChange(event) {
		let reader = new FileReader();

		if(event.target.files && event.target.files.length) {
			const [file] = event.target.files;
			reader.readAsDataURL(file);

			reader.onload = () => {
				this.newProjectForm.patchValue({
					image: reader.result
				});
				this.fileObj = file;

				// need to run CD since file load runs outside of zone
		        this.cd.markForCheck();
		    };
		}
	}

	ResetForm() {
		this.newProjectForm.reset();
	}  

	create(project: Project){
		this.projectService.createProjects(project);
	}

	uploadImg() {
		const file: any = this.fileObj;
		const filePath: string = `images/${file.name}`
		const task = this.storage.upload(filePath, file);
		const ref = this.storage.ref(filePath);
		this.uploadPercent = task.percentageChanges();
		task.snapshotChanges().pipe(
			finalize(() => {
        this.downloadURL = ref.getDownloadURL();
	        this.downloadURL.subscribe( dataURL => {
	        	this.resultURL = dataURL;
	        	console.log(this.resultURL);
	        	this.newProjectForm.patchValue({
					image: this.resultURL
				});
				this.create(this.newProjectForm.value);
				this.ResetForm();
	        });
	    }))
	    .subscribe();
	}
		
}