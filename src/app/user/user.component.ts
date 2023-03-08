import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{
  allUsers = [];


  constructor(public dialog: MatDialog, private firestore: AngularFirestore) { }


  ngOnInit(): void {
    this.firestore.collection('users').valueChanges({idField: 'customIdName'}).subscribe((changes: any) => {
      this.allUsers = changes;
    })
  }


  openDialog() {
    const dialogRef = this.dialog.open(DialogAddUserComponent)
  }

  onNoClick(): void {

  }

}
