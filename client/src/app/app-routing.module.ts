import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddSalesComponent } from './components/add-sales/add-sales.component';
import { EditSalesComponent } from './components/edit-sales/edit-sales.component';
import { SalesDetailsComponent } from './components/sales-details/sales-details.component';
import { SalesComponent } from './components/sales/sales.component';

const routes: Routes = [
  { path: 'sales', component: SalesComponent },
  { path: 'sales-details/:id', component: SalesDetailsComponent },
  { path: 'add-sales', component: AddSalesComponent },
  { path: 'edit-sales/:id', component: EditSalesComponent },
  { path: '', redirectTo: '/sales', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
