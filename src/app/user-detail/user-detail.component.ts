import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  userID = '';
  currentUser: User = new User();

  constructor(private route:ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) { }

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


  editUser() {
      const dialogRef = this.dialog.open(DialogEditUserComponent)
    }

}
