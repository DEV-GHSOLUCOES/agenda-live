import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { LiveService } from 'src/app/shared/service/live.service';

@Component({
  selector: 'app-live-form-dialog',
  templateUrl: './live-form-dialog.component.html',
  styleUrls: ['./live-form-dialog.component.css']
})
export class LiveFormDialogComponent implements OnInit {
  public liveForm!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private rest: LiveService,
    public dialogRef: MatDialogRef<LiveFormDialogComponent>
  ){}


  ngOnInit(): void {
    this.liveForm =  this.fb.group({
      liveName: ['', [Validators.required]],
      channelName: ['', [Validators.required]],
      liveDate: ['', [Validators.required]],
      liveTime: ['', [Validators.required]],
      liveLink: ['', [Validators.required]]
  });
}


createLive(){

let newdate: moment.Moment = moment.utc(this.liveForm.value.liveDate).local(); 
this.liveForm.value.liveDate = newdate.format("YYYY-MM-DD") + "T" + this.liveForm.value.liveTime;
  console.log(this.liveForm.value);
  this.rest.postLives(this.liveForm.value).subscribe(result => {});
  this.dialogRef.close(true);
  this.liveForm.reset();
  window.location.reload();
}

cancel(): void {
    this.dialogRef.close();
    this.liveForm.reset();
  }
}
