import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { WordSeekComponent } from './word-seek/word-seek.component';

const routes: Routes = [
  {
    path: '', component: WordSeekComponent, pathMatch: 'full'
  }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
