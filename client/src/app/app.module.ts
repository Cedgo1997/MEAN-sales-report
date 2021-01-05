import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SalesComponent } from './components/sales/sales.component';
import { SalesDetailsComponent } from './components/sales-details/sales-details.component';
import { AddSalesComponent } from './components/add-sales/add-sales.component';
import { EditSalesComponent } from './components/edit-sales/edit-sales.component';

@NgModule({
  declarations: [
    AppComponent,
    SalesComponent,
    SalesDetailsComponent,
    AddSalesComponent,
    EditSalesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
