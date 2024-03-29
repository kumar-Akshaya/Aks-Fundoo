import { Component, OnInit, Input } from '@angular/core';
import { AskServiceService } from '../../service/askService/ask-service.service';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss']
})
export class LikeComponent implements OnInit {

  
  constructor(public askService: AskServiceService) { }
  liked = false;
  count = 0;
  likeObject;
  @Input()
  public set likeMessage(v: any) {
    console.log(v);
    this.likeObject = v;
    this.likeCheck(v);
  }
  /**
   * @description this method is for add label to note
   * @param card whole card object
   * @param label label data
   * @emits  emit an event for parent note for add label in display card
   * @returns nothing
   */
  likeCheck(v) {
    console.log(v);

    for (let i = 0; i < v.like.length; i++) {
      if (v.userId == v.like[i].userId && v.like[i].like) {
        this.liked = true;
      }
      if (v.like[i].like) {

        this.count++;
      }

    }
  }

  // if()

  ngOnInit() {
  }
  /**
   * @description this method is for add label to note
   * @param card whole card object
   * @param label label data
   * @emits  emit an event for parent note for add label in display card
   * @returns nothing
   */
  like() {
    this.liked = true;
    this.likeDislikeService(this.likeObject.id, true);
    this.count++;

  }
    /**
   * @description this method is for add label to note
   * @param card whole card object
   * @param label label data
   * @emits  emit an event for parent note for add label in display card
   * @returns nothing
   */
  unlike() {
    this.liked = false;
    this.likeDislikeService(this.likeObject.id, false);
    this.count--;
  }
  /**
   * @description this method is for add label to note
   * @param card whole card object
   * @param label label data
   * @emits  emit an event for parent note for add label in display card
   * @returns nothing
   */
  likeDislikeService(userId, value) {
    try {
      const body = {
        id: userId,
        like: value
      }

      this.askService.liked(body).subscribe(data => {
        console.log('data after like dislike', data);

      }, err => {
        console.log('error after like dislike', err);

      })

    } catch (error) {
      console.log('error in like component in likeDislike method');

    }

  }

}
