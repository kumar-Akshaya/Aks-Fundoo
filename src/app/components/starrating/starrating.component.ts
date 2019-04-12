import { Component, OnInit, Input } from '@angular/core';
import { AskServiceService } from '../../service/askService/ask-service.service';
import { rating } from '../../model/QA';

@Component({
  selector: 'app-starrating',
  templateUrl: './starrating.component.html',
  styleUrls: ['./starrating.component.scss']
})
export class StarratingComponent implements OnInit {

  public ratingModel: rating;
  constructor(public askService: AskServiceService) { }

  ngOnInit() {
  }

  rate = 0;
  object;
  count = 0;
  @Input()
  public set rateMessage(v: any) {
    console.log('message in rate', v);

    this.object = v;
    if (v.rate != undefined)
      this.rate = v.rate.length;
  }

  /**
   * @description this method is for give the rating to the user quetion or answer
   * 
   */
  giveRating() {
    this.ratingModel = new rating();
    console.log("hello");
    if (this.count != 2) {
      this.count++;
      return;
    }
    this.ratingModel.rate = JSON.stringify(this.rate);


    this.ratingModel.id = this.object.id;
    this.ratingService(this.ratingModel);

  }

  /**
   * @description this method is for call rate service 
   * @returns body
   */
  ratingService(body) {
    this.askService.rating(body).subscribe(data => {
      console.log('data after rating', data);

    }, err => {
      console.log('error after rating ', err);

    })
  }


}
