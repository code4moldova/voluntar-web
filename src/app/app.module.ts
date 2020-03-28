import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RootStoreModule } from './root-store/root-store.module';
import { HttpClientModule } from '@angular/common/http';
import { VolunteersNewComponent } from './pages/volunteers/volunteers-new/volunteers-new.component';

@NgModule({
  declarations: [AppComponent, VolunteersNewComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    RootStoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
