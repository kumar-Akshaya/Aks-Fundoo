import { Component, OnInit, Inject } from '@angular/core';
import { EditLableComponent } from '../edit-lable/edit-lable.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-lable',
  templateUrl: './delete-lable.component.html',
  styleUrls: ['./delete-lable.component.scss']
})
export class DeleteLableComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<EditLableComponent>,
  ) { }
  // @Inject(MAT_DIALOG_DATA) private data: DialogData

  ngOnInit() {
  }
  cancel() {
    this.dialogRef.close();
  }
}
