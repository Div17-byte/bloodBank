import { Injectable } from '@angular/core';
import { bloodGroup } from './bloodGroup.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class BloodbankService {

  constructor(private _snackBar:MatSnackBar) {}

  private bloodGrpData: bloodGroup[] = [];

  getBloodGrpData() {
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

    return this.bloodGrpData;
  }

  saveBloodGrpData(data: bloodGroup[]) {
    localStorage.setItem('data', JSON.stringify(this.bloodGrpData));
  }

  showAlert(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3 * 1000,
    });
  }


  getBackgroundColor(bloodType:string) {
    if (bloodType === 'A+') return '#93C47D';
    else if (bloodType === 'B+') return '#B7B7B7';
    else if (bloodType === 'O+') return '#93C47D';
    else if (bloodType === 'AB+') return '#B7B7B7';
    else if (bloodType === 'A-') return '#38761D';
    else if (bloodType === 'B-') return '#B7B7B7';
    else if (bloodType === 'O-') return '#38761D';
    else if (bloodType === 'AB-') return '#B7B7B7';
    else return '#93C47D';
  }
}
