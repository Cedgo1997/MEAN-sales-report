import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Components
import { SalesComponent } from './components/sales/sales.component';
import { SalesDetailsComponent } from './components/sales-details/sales-details.component';
import { AddSalesComponent } from './components/add-sales/add-sales.component';
import { EditSalesComponent } from './components/edit-sales/edit-sales.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';

// Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Ng2-charts
import { ChartsModule } from 'ng2-charts';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    SalesComponent,
    SalesDetailsComponent,
    AddSalesComponent,
    EditSalesComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ChartsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
