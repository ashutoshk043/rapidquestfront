import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viewvideo',
  templateUrl: './viewvideo.component.html',
  styleUrls: ['./viewvideo.component.css']
})
export class ViewvideoComponent {
  video:string=''
  serverUrl:string='https://rapidquestbackend-production.up.railway.app'

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe((params:any) => {
        this.video = params.name
      }
    );
  }

}
