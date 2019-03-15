import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA ,} from '@angular/material';
import { NoteComponent } from '../note/note.component';
import { CollaboratorComponent } from '../collaborator/collaborator.component';

export  interface DialogData {
  title: string;
  description: string;
  id: string;
  label: string;
}

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss']
})
export class UpdateNoteComponent implements OnInit {

  constructor() { }
  // private dialog: DialogData, public dialogRef: MatDialogRef<NoteComponent>,
  // @Inject(MAT_DIALOG_DATA) public data: DialogData, 
  ngOnInit() {
  }


  openCollaboratorPage(data) {
    // const dialogRef = this.dialog.open(CollaboratorComponent, {
    //   width: '500px',
    //   maxWidth: 'auto',
    //   data: data
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
    // this.dialogRef.close();
  }

}
