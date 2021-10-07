import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNoteComponent } from './create-note/create-note.component';
import { EditNoteComponent } from './edit-note/edit-note.component';
import { LeftChangesUnsavedGuard } from './left-changes-unsaved.guard';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: 'notes', component: NotesListComponent},
  {path: 'create-note', component: CreateNoteComponent},
  {path: 'edit-note/:id', component: EditNoteComponent, canDeactivate: [LeftChangesUnsavedGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'signup', component: SignupComponent},
  {path: '404', component: PageNotFoundComponent},
  {path: '', redirectTo: 'notes', pathMatch: 'full'},
  {path: '**', redirectTo: '404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
