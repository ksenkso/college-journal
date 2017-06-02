import { Component, OnInit } from '@angular/core';
import { animate, transition, trigger, style, state } from '@angular/animations';
import {MenuService} from "../../services/menu.service";
import {MenuItem} from "../../interfaces/menu-item";
import {OverlayService} from "../../services/overlay.service";




@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],

  animations: [
    trigger('visible', [
      state('void', style({
        transform: 'translateX(-100%)',
      })),
      state('*', style({
        transform: 'translateX(0%)'
      })),
      transition('void <=> *', animate('300ms ease-in-out'))
    ])
  ]
})
export class MenuComponent implements OnInit {

  menu: Array<MenuItem>;
  visible: boolean = false;
  constructor(
    private menuService: MenuService,
    private overlayService: OverlayService
  ) {
    menuService.visible$.subscribe(value => {
      this.visible = !this.visible;
      console.log('test');
      this.overlayService.toggle();
    })
  }

  ngOnInit() {

    this.menuService.getMenu().then(menu => this.menu = menu);
  }

  toggle() {
    this.menuService.toggle();
  }

}
