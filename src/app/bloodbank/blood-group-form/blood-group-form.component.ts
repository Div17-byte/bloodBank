import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { bloodGroup } from '../bloodGroup.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-blood-group-form',
  templateUrl: './blood-group-form.component.html',
  styleUrls: ['./blood-group-form.component.css'],
})
export class BloodGroupFormComponent implements OnInit {
  bloodGrpData: bloodGroup[] = [];
  data: any;
  constructor(private router: Router, private _snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3 * 1000,
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('data') !== null) {
      this.bloodGrpData = JSON.parse(localStorage.getItem('data')!);
    } else {
      this.bloodGrpData = [
        { bloodGroup: 'A+', quantity: 0 },
        { bloodGroup: 'B+', quantity: 0 },
        { bloodGroup: 'O+', quantity: 0 },
        { bloodGroup: 'AB+', quantity: 0 },
        { bloodGroup: 'A-', quantity: 0 },
        { bloodGroup: 'B-', quantity: 0 },
        { bloodGroup: 'O-', quantity: 0 },
        { bloodGroup: 'AB-', quantity: 0 },
      ];
    }
    console.log(this.bloodGrpData);
  }
  onSubmitForm() {
    this.openSnackBar('Data Saved', 'close');
    localStorage.setItem('data', JSON.stringify(this.bloodGrpData));
    this.router.navigate(['/home']);
  }

  getBackgroundColor(bloodGrp: any) {
    if (bloodGrp === 'A+') return '#93C47D';
    else if (bloodGrp === 'B+') return '#B7B7B7';
    else if (bloodGrp === 'O+') return '#93C47D';
    else if (bloodGrp === 'AB+') return '#B7B7B7';
    else if (bloodGrp === 'A-') return '#38761D';
    else if (bloodGrp === 'B-') return '#B7B7B7';
    else if (bloodGrp === 'O-') return '#38761D';
    else if (bloodGrp === 'AB-') return '#B7B7B7';
    else return '#93C47D';
  }
}
