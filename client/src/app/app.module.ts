import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';

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

// NGRX
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { SalesEffects } from './store/effects/sales.effects';
import { appReducers } from './app.reducer';

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
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([SalesEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
