import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewvideoComponent } from './viewvideo/viewvideo.component';
import { AddEditListComponent } from './add-edit-list/add-edit-list.component';

const routes: Routes = [
  {
    path:'',
    component:AddEditListComponent
  },
  {
    path:'viewvideo/:name',
    component:ViewvideoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
