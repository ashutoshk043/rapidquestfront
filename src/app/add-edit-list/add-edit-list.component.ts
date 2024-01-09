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
  serverUrl = "https://rapidquestbackend-production.up.railway.app"
  allVideoList:any
  clickedVideoName:string = ''
  clicked:boolean =false
  loader:boolean=false

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
    this.loader= true
    this.formData.append('subtitle', this.videoForm.value.subtitle)
    this.httpclient.post(`${this.serverUrl}/addVideo`,this.formData).subscribe({
      next:(res:any)=>{
        this.formData.delete('video')
        this.formData.delete('subtitle')
        this.videoForm.reset()
        console.log(res)
        this.getAllData()
        this.loader = false
      },
      error:(error:any)=>{
        this.formData.delete('video')
        this.formData.delete('subtitle')
        console.log(error)
        this.loader = false
      }
    })
  }


  getAllData(){
    this.loader = true
    this.httpclient.get(`${this.serverUrl}/getAllVideos`).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.allVideoList = res?.data
        this.loader = false
      },
      error:(error:any)=>{
        console.log(error)
        this.loader = false
      }
    })
  }

   videoDetails(name:string){
    this.router.navigate(['viewvideo', name])

  }

  deleteVideo(videoName:string){
    this.loader = true
    this.httpclient.delete(`${this.serverUrl}/deleteVideo/${videoName}`).subscribe({
      next:(res:any)=>{
       alert("deleted successfully..")
        this.loader = false
        window.location.reload()
      },
      error:(error:any)=>{
        console.log(error)
        this.loader = false
      }
    })
  }
}
