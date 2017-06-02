import { Component, OnInit } from '@angular/core';
import {TitleService} from "../../../../services/title.service";

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.css']
})
export class GroupCreateComponent implements OnInit {

  constructor(private titleService: TitleService) { }

  ngOnInit() {

    this.titleService.setTitle('Список групп');

  }

}
