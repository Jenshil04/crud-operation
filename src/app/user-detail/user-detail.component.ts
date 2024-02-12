import { Component, Inject, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from '../services/user-data.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PopupService } from '../alerts/popup.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  encapsulation: ViewEncapsulation.None 
})
export class UserDetailComponent implements OnInit {
  Education = [
    { value: 'BE', viewValue: 'Engineering' },
    { value: 'Arts', viewValue: 'Arts' },
    { value: 'MBBS', viewValue: 'MBBS' },
    { value: 'Others', viewValue: 'Others' },
  ];

  userDetail: any = FormGroup;
  constructor(private fb: FormBuilder, private userdata: UserDataService, private snackbar: PopupService, private dialogRef: MatDialogRef<UserDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
  }
  ngOnInit(): void {
    this.userDetail.patchValue(this.data)
  }

  createForm() {
    this.userDetail = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      education: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      address: ['', Validators.required],
    });
  }
  // onFormSubmit() {
  //   if (this.userDetail.valid) {
  //     this.userdata.addUserDetail(this.userDetail.value).subscribe((res) => {
  //       alert('UserDetail Added Successfully');
  //       this.dialogRef.close(true);
  //     }), (error: any) => {
  //       console.log(error);
  //     }
  //   }
  // }

  onFormSubmit() {
    if (this.data) {
      if (this.userDetail.valid) {
        this.userdata.updateUserDetail(this.data.id, this.userDetail.value).subscribe((res) => {
          // alert('UserDetail update Successfully');
          this.snackbar.openSnackBar('UserDetail update Successfully')
          this.dialogRef.close(true);
        }), (error: any) => {
          console.log(error);
        }
      }
    } else {
      if (this.userDetail.valid) {
        this.userdata.addUserDetail(this.userDetail.value).subscribe((res) => {
          // alert('UserDetail Added Successfully');
          this.snackbar.openSnackBar('UserDetail Added Successfully')
          this.dialogRef.close(true);
        }), (error: any) => {
          console.log(error);
        }
      }
    }

  }

}
