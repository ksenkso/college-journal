import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../services/users.service";
import {User} from "../../interfaces/user";
import {TitleService} from "../../../../services/title.service";
import {GroupsService} from "../../../../services/groups.service";
import {Group} from "../../../../interfaces/group";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(
    private userService: UsersService,
    private titleService: TitleService,
    private groupsService: GroupsService
  ) { }

  users: User[] = [];
  groups: Group[] = [];

  deleteUser(id) {
    const shouldDelete = confirm('Удалить пользователя?');

    if (shouldDelete) {
      this.userService
        .deleteUser(id)
        .then(() => {
          this.users = this.users.filter(user => user.id != id);
        });
    }

  }

  ngOnInit() {

    this.titleService.setTitle('Список пользователей');

    this.groupsService
      .getGroups()
      .then(groups => this.groups = groups);

    this.userService
      .getUsers()
      .then(users => this.users = users);
  }

}
