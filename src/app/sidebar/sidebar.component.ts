import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
	
	items$: Observable<any[]>;
	years$: Observable<any[]>;
	public isCollapsed = true;
	constructor(db: AngularFireDatabase) {
    	this.items$ = db.list('menu-items').valueChanges();
    	this.years$ = db.list('menu-items/menu-4').valueChanges();
	}

	ngOnInit() {
	}
}
