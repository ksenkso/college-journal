import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';




import { AppComponent } from './components/app/app.component';
import {RoutingModule} from "./routing.module";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import { OverlayComponent } from './components/overlay/overlay.component';
import {OverlayService} from "./services/overlay.service";
import { MenuComponent } from './components/menu/menu.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HeaderComponent } from './components/header/header.component';
import {MenuService} from "./services/menu.service";
import {TitleService} from "./services/title.service";


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    OverlayComponent,
    MenuComponent,
    NotFoundComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    OverlayService,
    MenuService,
    TitleService],

  bootstrap: [AppComponent]
})
export class AppModule { }
