import { Component, ViewChild,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserDataService } from './services/user-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PopupService } from './alerts/popup.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'crud-operation';

  displayedColumns: string[] = ['id','firstName', 'lastName', 'email', 'dob', 'gender', 'education', 'mobileNumber', 'address','action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public dialog: MatDialog, private userdata: UserDataService, private snackbar:PopupService) {
    this.dataSource = new MatTableDataSource<any>();
   }
  ngOnInit() {
    this.getUserData()
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserDetailComponent);
    dialogRef.afterClosed().subscribe((val:any)=>{
      if(val){
        this.getUserData()
      }
    })
  }

  getUserData() {
    this.userdata.getUserDetail().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, (err) => {
      console.log(err);
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  } 
  deleteUserData(id:any){
    this.userdata.deleteUserDetail(id).subscribe((res)=>{
      // alert('UserDetail Deleted Successfully')
      this.snackbar.openSnackBar('UserDetail Deleted Successfully')
    },(err)=>{
      console.log(err);
      
    })
  }
  OpenEditForm(data: any): void {
    const dialogRef = this.dialog.open(UserDetailComponent, { data });
    dialogRef.afterClosed().subscribe((val: any) => {
      if (val) {
        this.getUserData()
      }
    })
  }
}
