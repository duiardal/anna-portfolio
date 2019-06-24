import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { ProjectsComponent } from './projects/projects.component';
import { CvComponent } from './cv/cv.component';
import { ContactComponent } from './contact/contact.component';
import { AdminModule } from  './admin/admin.module';
import { ProjectDetailComponent } from './project-detail/project-detail.component';


const routes: Routes = [
  { path: 'home',
  	component: HomeComponent,
    data: {
      animation: 'HomePage'
    }
  },
  { path: 'Projects',
  	component: ProjectsComponent,
    data: {
      animation: 'ProjectsPage'
    }
  },
  { path: 'CV',
  	component: CvComponent,
    data: {
      animation: 'CvPage'
    }
  },
  { path: 'Contact',
  	component: ContactComponent,
    data: {
      animation: 'ContactPage'
    }
  },

  { path: 'project/:id',
  	component: ProjectDetailComponent,
    data: {
      animation: 'ProjectPage'
    }
  },
  {
  	path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
  	path: 'Projects',
    redirectTo: '/projects',
    pathMatch: 'full'
  },
  {
  	path: 'CV',
    redirectTo: '/cv',
    pathMatch: 'full'
  },
  {
  	path: 'Contact',
    redirectTo: '/contact',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
