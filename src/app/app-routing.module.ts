import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BloodGroupFormComponent } from './bloodbank/blood-group-form/blood-group-form.component';
import { BloodbankComponent } from './bloodbank/bloodbank.component';
import { HomeComponent } from './bloodbank/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: BloodbankComponent,
    children: [
      { path: '', redirectTo: '/form', pathMatch: 'full' },
      { path: 'form', component: BloodGroupFormComponent },
      { path: 'home', component: HomeComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
