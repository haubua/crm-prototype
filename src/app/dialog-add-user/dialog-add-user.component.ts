import { Component } from '@angular/core';
import { User } from 'src/models/user.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  user = new User();
  birthDate: Date;
  loading: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>, private firestore: AngularFirestore) {}


  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    this.loading = true;
    console.log(this.user)
    this.firestore.collection('users').add(this.user.toJSON()).then((result:any) => {
      console.log('User added', result)
     this.loading = false;
     this.dialogRef.close();
    })
  }
}