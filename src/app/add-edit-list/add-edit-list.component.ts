import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-list',
  templateUrl: './add-edit-list.component.html',
  styleUrls: ['./add-edit-list.component.css']
})
export class AddEditListComponent {
  title = 'frontend';
  videoForm:any
  formData =new FormData()
  serverUrl = "http://localhost:3000"
  allVideoList:any
  clickedVideoName:string = ''
  clicked:boolean =false

  constructor(
    private fb:FormBuilder,
    private httpclient:HttpClient,
    private router:Router
  ){}

  ngOnInit(){
    this.createVideoForm()
    this.getAllData()
  }


  createVideoForm(){
    this.videoForm = this.fb.group({
      video : ['', [Validators.required]],
      subtitle: ['', [Validators.required]]
    })
  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    this.formData.append('video', file);
  }

  submitForm(){
    this.formData.append('subtitle', this.videoForm.value.subtitle)
    this.httpclient.post(`${this.serverUrl}/addVideo`,this.formData).subscribe({
      next:(res:any)=>{
        this.formData.delete('video')
        this.formData.delete('subtitle')
        this.videoForm.reset()
        console.log(res)
        this.getAllData()
      },
      error:(error:any)=>{
        this.formData.delete('video')
        this.formData.delete('subtitle')
        console.log(error)
      }
    })
  }


  getAllData(){
    this.httpclient.get(`${this.serverUrl}/getAllVideos`).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.allVideoList = res?.data
      },
      error:(error:any)=>{
        console.log(error)
      }
    })
  }

   videoDetails(name:string){
    this.router.navigate(['viewvideo', name])

  }
}
