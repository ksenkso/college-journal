import {Component, OnInit, ElementRef} from "@angular/core";
import {OverlayService} from "../../services/overlay.service";
import { animate, transition, state, trigger, style } from '@angular/animations'

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css'],
  animations: [
    trigger('toggle', [
      state('void', style({
        display: 'none',
        opacity: 0
      })),
      state('*', style({
        display: 'block',
        opacity: 1,
        height: '*'
      })),
      transition('void <=> *', animate('300ms ease-in-out'))
    ])
  ]
})
export class OverlayComponent implements OnInit {

  visible = false;

  constructor(private overlayService: OverlayService, private el: ElementRef) {
      overlayService.visible$.subscribe(value => {
        this.visible = !this.visible;

        //document.body.style.overflow = this.visible ? 'hidden' : 'auto';
    });
  }

  ngOnInit() {

  }


}
