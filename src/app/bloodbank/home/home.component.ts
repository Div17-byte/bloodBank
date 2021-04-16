import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { BloodbankService } from '../blood-bank.service';
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
  constructor(private bldService: BloodbankService) {}

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
      this.bldService.showAlert('Please Select the Blood Group', 'Close');
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
    } else {
      this.bldService.showAlert(
        'Not enough quantity in repository! ☹',
        'Close'
      );
    }
  }
  getBackgroundColor(bloodType: string) {
    this.bldService.getBackgroundColor(bloodType);
  }
}
