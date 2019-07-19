import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatRadioModule,
  MatButtonModule, MatTabsModule, MatTableModule,
  MatFormFieldModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { InvestmentformComponent } from './investmentform/investmentform.component';
import { LinechartComponent } from './linechart/linechart.component';
import { TableComponent } from './table/table.component';
import { ChartsModule, BaseChartDirective } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    InvestmentformComponent,
    LinechartComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    ChartsModule,
    BaseChartDirective
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
