import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {

  listOfDom: string[] = ['job', 'Tour', 'Drawing', 'Fishing']

  rating: number[] = [5, 3, 2, 2, 10]

  constructor(public authService : AuthService) { }

  ngOnInit(): void {
    // console.log(this.authService.currentUserImageURL);
  }



}
