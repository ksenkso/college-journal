import { Component, OnInit } from '@angular/core';
import {GroupsService} from "../../../../services/groups.service";
import {Group} from "../../../../interfaces/group";
import {TitleService} from "../../../../services/title.service";

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  constructor(
    private groupsService: GroupsService,
    private titleService: TitleService
  ) { }

  groups: Group[] = [];

  deleteGroup(id) {
    const shouldDelete = confirm('Удалить группу?');
    if (shouldDelete) {

      this.groupsService
        .deleteGroup(id)
        .then(done => {
          if (done) {
            this.groups = this.groups.filter(group => group.group_id != id);
          }
        });
    }


  }

  ngOnInit() {

    this.titleService.setTitle('Список групп');

    this.groupsService
      .getGroups()
      .then(groups => this.groups = groups);
  }



}
