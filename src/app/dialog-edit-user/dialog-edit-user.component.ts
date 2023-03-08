import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {
  userID = '';
  currentUser: User;
  birthDate: Date;
  loading: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.birthDate = new Date(this.currentUser.birthDate)
  }

  saveUser() {
    this.loading = true;
    this.firestore.collection('users').doc(this.userID).update(this.currentUser.toJSON()).then(() => {
      this.loading = false;
      this.dialogRef.close();
    })
  }

}
