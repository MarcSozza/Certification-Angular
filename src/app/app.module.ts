import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SentimentComponent } from './sentiment/sentiment.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { FormComponent } from './form/form.component';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './shared/components/card/card.component';
import { ChangeComponent } from './shared/components/change/change.component';
import { ColorDirective } from './shared/directives/color.directive';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { DatePipe } from '@angular/common';
import { MonthConverterPipe } from './shared/pipe/month-converter.pipe';
import { SentimentCardComponent } from './shared/components/sentiment-card/sentiment-card.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    ErrorComponent,
    HomeComponent,
    FormComponent,
    CardComponent,
    ChangeComponent,
    ColorDirective,
    LoaderComponent,
    MonthConverterPipe,
    SentimentComponent,
    SentimentCardComponent,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
