import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions = {}
  selected = new Date()
  isSideBarOpen:boolean = true
  userCount:number = 0
  recipeCount:number = 0
  downloadCount:number = 0
  requestCount:number = 0

  constructor(private api:ApiService,private router:Router){
    this.chartOptions = {
      chart :{
        type : 'bar'
      },
      title:{
        text: 'Analysis of Download Recipe Based on Cuisine',
        align:'left'
      },
      xAxis:{
        type:'category'
      },
      yAxis:{
        title:{
          text:"Total Download Recipe Count"
        }
      },
      legend:{
        enabled:false
      },
      credits:{
        enabled:false
      },
      series:[
        {
          name:"Cuisine",
          colorByPoint:true,
          type:'bar',
          data:[
            {
              name:'Italian',
              y:4
            },
            {
              name:'Asian',
              y:2
            },
            {
              name:'Mexiacan',
              y:1
            },
            {
              name:'Indian',
              y:3
            },
          ]

        }
      ]

    }
  }
  
  ngOnInit(){
    this.getUserCount()
    this.getRecipeCount()
    this.getDownloadCount()
    this.getRequestCount()
  }

  logout(){
    sessionStorage.clear()
    this.router.navigateByUrl("/")
  }

  menuBtnClick(){
    this.isSideBarOpen = !this.isSideBarOpen
  }

  getUserCount(){
    this.api.getAllUsersAPI().subscribe((res:any)=>{
      this.userCount = res.length
    })
  }

  getRecipeCount(){
    this.api.getAllRecipesAPI().subscribe((res:any)=>{
      this.recipeCount = res.length
    })
  }

  getDownloadCount(){
    this.api.getAllDownloadsAPI().subscribe((res:any)=>{
      this.downloadCount = res.map((item:any)=>item.count).reduce(((a:any,b:any)=>a+b))
    })
  }

  getRequestCount(){
    this.api.getAllTestimonyAPI().subscribe((res:any)=>{
      this.requestCount = res.filter((item:any)=>item.status=="Pending").length
    })
  }
}
