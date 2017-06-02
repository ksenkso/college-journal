import {Component, OnInit, OnChanges, Input} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
//import {Student} from "../../interfaces/student";
import {Group} from "../../../../interfaces/group";
import {Router, ActivatedRoute, Params, } from "@angular/router";
import {Location} from "@angular/common";
import {GroupsService} from "../../../../services/groups.service";



@Component({
  selector: 'app-group-form',
  templateUrl: 'group-form.component.html',
  styleUrls: ['group-form.component.css']
})
export class GroupFormComponent implements OnInit, OnChanges {

  @Input() mode: string;
  @Input() group: Group;
  groupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private groupsService: GroupsService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
    console.log('mode: ', this.mode);
    this.createForm();
  }

  createForm() {
    this.groupForm = this.fb.group({
      group_id: '',
      group_name: '',
      group_number: '',
      abbreviation: '',
      year: '',
    })
  }

  log(data) {
    console.log(data);
  }

  onSubmit() {
    this.group = this.prepareSaveGroup();

    if (this.mode === 'create') {
      this.groupsService.createGroup(this.group)
        .then(this.log.bind(this))
        .then(this.revert.bind(this))
        .then(this.goBack.bind(this))
    } else {
      console.log('submit', this.group);
      this.groupsService.saveGroup(this.group)
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

  prepareSaveGroup(): Group {
    const formModel = this.groupForm.value;

    const saveGroup: Group = {
      group_id: formModel.group_id as string,
      group_name: formModel.group_name as string,
      group_number: formModel.group_number as string,
      abbreviation: formModel.abbreviation as string,
      year: formModel.year as string,
    };
    return saveGroup;
  }




  ngOnChanges() {
    this.log(this.group);
    if (!this.group) {
      this.group = <Group> {
        group_id: '',
        group_name: '',
        group_number: '',
        abbreviation: '',
        year: ''
      };
    }
    this.groupForm.reset({
      group_id: this.group.group_id as string,
      group_name: this.group.group_name as string,
      group_number: this.group.group_number as string,
      abbreviation: this.group.abbreviation as string,
      year: this.group.year as string,
    });
  }

  ngOnInit() {
    if (this.mode === 'update') {
      this.route.params
        .switchMap((params: Params) => this.groupsService.getGroup(+params['id']))
        .subscribe((group: Group) => {
          this.group = group;
          this.ngOnChanges();
        });
    } else {
      this.group = <Group> {
        group_id: '',
        group_name: '',
        group_number: '',
        abbreviation: '',
        year: ''
      };
    }

  }

}
