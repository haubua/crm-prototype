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
  currentUser: User = new User();
  birthDate: Date;
  loading: boolean = false;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialogRef: MatDialogRef<DialogEditUserComponent>) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.userID = paramMap.get('id');
      console.log(this.userID)
      this.getUser();
    })
  }


  getUser() {
    this.firestore.collection('users').doc(this.userID).valueChanges().subscribe((user: any) => {
      this.currentUser = new User(user);
      console.log(this.currentUser)
    })
  }

  saveUser() {
    this.currentUser.birthDate = this.birthDate.getTime();
    this.loading = true;
    this.firestore.collection('users').doc(this.userID).valueChanges(this.currentUser.toJSON())
    this.loading = false;
    this.dialogRef.close();
  }

}
