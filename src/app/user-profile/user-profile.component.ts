import { Component, OnInit } from '@angular/core';
import { profileData } from 'src/app/services/profile.service';
import { Profile } from '../admin-profile/profile';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  profile:Profile;
  constructor(private profilData :profileData) { }

  ngOnInit(): void {
    this.profilData.getData().subscribe(
      (respond)=>{
        console.log(respond)

        this.profile=respond["user"]
        console.log(this.profile);
      },
      (error)=>{
        console.log(error)
      });
  }


}
