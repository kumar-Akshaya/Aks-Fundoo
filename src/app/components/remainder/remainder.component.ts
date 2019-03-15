import { Component, OnInit } from '@angular/core';
import { NoteComponent } from '../note/note.component';
import { NoteServiceService } from '../../service/note-service.service';

@Component({
  selector: 'app-remainder',
  templateUrl: './remainder.component.html',
  styleUrls: ['./remainder.component.scss']
})
export class RemainderComponent implements OnInit {
  private reminderArray: any = [];
  private date;
    private collaboratorBody:any=[];
    private addCollaborator: any = 0;
    private today = new Date();
    private tomorrow = new Date(this.today.getFullYear(), this.today.getMonth()
        , this.today.getDate() + 1)
    private dateArray = [];
    private notes = { 'id': '' };

  constructor(private notesService:NoteServiceService) { }

  ngOnInit() {
  }

  getReminders() {
    this.notesService.getReminder().subscribe(
        (data) => {
          this.reminderArray = data['data'].data;
          this.reminderArray.sort((a: any, b: any) =>
            new Date(a.reminder).getTime() - new Date(b.reminder).getTime()
          )
        })
  } 


}
