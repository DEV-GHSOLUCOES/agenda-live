import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Live } from 'src/app/shared/model/live.model';
import { LiveService } from 'src/app/shared/service/live.service';

@Component({
  selector: 'app-live-list',
  templateUrl: './live-list.component.html',
  styleUrls: ['./live-list.component.css']
})
export class LiveListComponent implements OnInit {

  livesPrevious!: Live[];
  livesNext!: Live[];
  previous : boolean= false;
  next : boolean = false;

  constructor(
    public livesService: LiveService,
    public sanitizer: DomSanitizer
  ){ }

  ngOnInit(): void {
    this.getLives();
  }

getLives(){
  this.livesService.getLiveWithFlag('previous').subscribe(data => {
    this.livesPrevious =  data.content;
    console.log(this.livesPrevious);
    this.livesPrevious.forEach(live => {
      live.urlSafe =  this.sanitizer.bypassSecurityTrustResourceUrl(live.liveLink);
    });
    this.previous = true;
  });

  this.livesService.getLiveWithFlag('Next').subscribe(data => {
    this.livesNext =  data.content;
    console.log(this.livesNext);
    this.livesNext.forEach(live => {
      live.urlSafe =  this.sanitizer.bypassSecurityTrustResourceUrl(live.liveLink);
    });
    this.next = true;
  })


}

}
