import {Component, OnInit, OnChanges, Input} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {Location} from "@angular/common";
import {Router, ActivatedRoute, Params, } from "@angular/router";
import {Group} from "../../../../interfaces/group";
import {User} from "../../interfaces/user";
import {GroupsService} from "../../../../services/groups.service";
import {UsersService} from "../../services/users.service";


@Component({
  selector: 'app-user-form',
  templateUrl: 'users-form.component.html',
  styleUrls: ['users-form.component.css']
})
export class UsersFormComponent implements OnInit, OnChanges {

  @Input() mode: string;
  @Input() user: User;
  userForm: FormGroup;
  groups: Group[] = [];

  constructor(
    private fb: FormBuilder,
    private groupsService: GroupsService,
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
    console.log('mode: ', this.mode);
    this.createForm();
  }

  createForm() {
    this.userForm = this.fb.group({
      username: '',
      first_name: '',
      last_name: '',
      patronymic: '',
      group_id: '',
      status: '',
      email: '',
      password_hash: ''
    });
  }

  log(data) {
    console.log(data);
  }

  onSubmit() {
    this.user = this.prepareSaveUser();

    if (this.mode === 'create') {
      this.usersService.createUser(this.user)
        .then(this.log.bind(this))
        .then(this.revert.bind(this))
        .then(this.goBack.bind(this))
    } else {
      console.log('submit', this.user);
      this.usersService.saveUser(this.user)
        .then(this.log.bind(this))
        .then(this.revert.bind(this))
        .then(this.goBack.bind(this))
    }
  }

  revert() {
    this.ngOnChanges();
  }

  goBack() {
    this.location.back();
  }

  prepareSaveUser(): User {
    const formModel = this.userForm.value;

    const saveUser: User = {
      id: this.user.id,
      first_name: formModel.first_name as string,
      last_name: formModel.last_name as string,
      patronymic: formModel.patronymic as string,
      email: formModel.email as string,
      username: formModel.username as string,
      group_id: formModel.group_id as string,
      status: formModel.status as string,
      password_hash: formModel.password_hash as string
    };

    return saveUser;
  }

  ngOnChanges() {
    this.log(this.user);
    if (!this.user) {
      this.user = <User> {
        id: '',
        first_name: '',
        last_name: '',
        patronymic: '',
        email: '',
        username: '',
        group_id: '',
        status: '',
        password_hash: ''
      };
    }
    this.userForm.reset({
      first_name: this.user.first_name,
      last_name: this.user.last_name,
      patronymic: this.user.patronymic,
      email: this.user.email,
      username: this.user.username,
      group_id: this.user.group_id,
      status: this.user.status,
      password_hash: this.user.password_hash,
    });
  }

  ngOnInit() {

    this.groupsService
      .getGroups()
      .then(groups => this.groups = groups);

    if (this.mode === 'update') {
      this.route.params
        .switchMap((params: Params) => this.usersService.getUser(+params['id']))
        .subscribe((user: User) => {
          this.user = user;
          this.ngOnChanges();
        });
    } else {
      this.user = <User> {
        first_name: '',
        last_name: '',
        patronymic: '',
        email: '',
        username: '',
        group_id: '',
        status: '',
        password_hash: ''
      };
    }

  }

}
