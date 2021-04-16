import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { bloodGroup } from '../bloodGroup.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  bloodGroupIndex = -1;
  bloodType = '';
  checkOutHistory: bloodGroup[] = [];
  bloodGroupSelected = false;
  bloodGrpData: bloodGroup[] = [];
  bloodGrpAvailable: bloodGroup[] = [];
  dataNotFound = false;
  numOfBottels = Array(20);

  bucket: bloodGroup[] = [];
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2 * 1000,
    });
  }

  ngOnInit(): void {
    if (!localStorage.getItem('data')) {
      this.dataNotFound = true;
      return;
    } else {
      this.bloodGrpData = JSON.parse(localStorage.getItem('data')!);
    }
  }

  getDate() {
    return Date.now();
  }

  drop(event: CdkDragDrop<bloodGroup[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      console.log(event.item.dropContainer.data);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      let foundIndex = this.bloodGrpData.findIndex(
        (el) => el.bloodGroup === 'data.bloodGroup'
      );
      console.log('FoundIndex', foundIndex);
    }
    this.bloodGroupIndex = -1;
  }

  checkout() {
    this.bucket.forEach((el, index) => {
      if (el.bloodGroup === this.bloodGrpData[index].bloodGroup) {
        this.bloodGrpData[index].quantity -= el.quantity;
      }
    });
    this.checkOutHistory.push(...this.bucket);
    console.log(this.checkOutHistory);

    this.bucket = [];
  }

  checkBloodGroups(event: any) {
    console.log(this.bloodType, event.value);
    if (!this.bloodGroupSelected) {
      this.openSnackBar('Please Select the Blood Group', 'Close');
      return;
    }

    this.bloodGroupIndex = this.bloodGrpData.findIndex(
      (el) => el.bloodGroup === this.bloodType && event.value <= el.quantity
    );

    if (this.bloodGroupIndex > -1) {
      const blData = [{ ...this.bloodGrpData[this.bloodGroupIndex] }];
      blData.forEach((el) => {
        el.quantity = event.value;
      });
      this.bloodGrpAvailable.push(...blData);
      console.log(blData);
    }
    console.log(this.bloodGroupIndex);
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
