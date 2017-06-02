import { Component, OnInit } from '@angular/core';
import {MenuService} from "../../services/menu.service";
import {TitleService} from "../../services/title.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],

})
export class HeaderComponent implements OnInit {

  title: string = 'Панель управления';

  constructor(
    private menuService: MenuService,
    private titleService: TitleService
  ) { }

  ngOnInit() {
    this.titleService.title$.subscribe(newTitle => this.title = newTitle);
  }

  toggleMenu(): void {
    this.menuService.toggle();
    console.log('hello');
  }

}
