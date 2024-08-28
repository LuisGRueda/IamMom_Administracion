import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
 loguser:any;
  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem('token')!=null)
    {
     this.loguser=localStorage.getItem('token');
     const visible:any=document.querySelector('#footer'); 
     visible.style.display='block'; 
    }
    else{
      const visible:any=document.querySelector('#footer'); 
       visible.style.display='none'; 
    }
  }
  

}
