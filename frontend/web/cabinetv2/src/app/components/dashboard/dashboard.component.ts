import { Component, OnInit } from '@angular/core';
import {OverlayService} from "../../services/overlay.service";
import {TitleService} from "../../services/title.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private overlayService: OverlayService,
    private titleService: TitleService
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Панель управления");
  }

  toggle() {
    this.overlayService.toggle();
  }

}
