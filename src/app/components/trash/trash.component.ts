import { Component, OnInit, Input } from '@angular/core';
import { NoteServiceService } from '../../service/note-service.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  trashcards : any[];
  childColor : any;
  allcards : any [] ; 
  constructor( private noteService : NoteServiceService) { }

  ngOnInit() {
    this.getTrashCard();
  }
@Input() card ;
  getTrashCard(){
   
    this.noteService.getTrash().subscribe(data => {
      this.trashcards= data['data']['data'];
      this.trashcards.reverse();
      console.log("trash cards ", this.trashcards);
    },
    err =>{
      console.log(err);
    }
    )
  }

  removeNotes(){
    this.noteService.deleteNotes({
      'data' : this.trashcards
    }).subscribe(result =>{
      this.allcards = result['data']['data'];
      console.log("Delete all cards",this.allcards);
    })
  }

 

}
