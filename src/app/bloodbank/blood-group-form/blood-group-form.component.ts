import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { bloodGroup } from '../bloodGroup.model';
import { BloodbankService } from '../blood-bank.service';

@Component({
  selector: 'app-blood-group-form',
  templateUrl: './blood-group-form.component.html',
  styleUrls: ['./blood-group-form.component.css'],
})
export class BloodGroupFormComponent implements OnInit {
  bloodGrpData: bloodGroup[] = [];
  data: any;
  constructor(private router: Router, private bldService: BloodbankService) {}

  ngOnInit(): void {
    this.bloodGrpData = this.bldService.getBloodGrpData();
  }

  onSubmitForm() {
    this.bldService.showAlert('Data Saved', 'close');
    this.bldService.saveBloodGrpData(this.bloodGrpData);
    this.router.navigate(['/home']);
  }

  getBackgroundColor(bloodGrp: string) {
    this.bldService.getBackgroundColor(bloodGrp);
  }
}
