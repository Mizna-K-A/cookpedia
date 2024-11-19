import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-recipes',
  standalone: true,
  imports: [HeaderComponent,RouterLink],
  templateUrl: './view-recipes.component.html',
  styleUrl: './view-recipes.component.css'
})
export class ViewRecipesComponent {
  
  // @Input() id!:string
  id:string = ""
  recipe:any = {}
  allRelatedRecipes:any = []
  constructor(private api:ApiService,private activatedRoute:ActivatedRoute){

  }

  ngOnInit(){
    // console.log(this.id);
    this.activatedRoute.params.subscribe((res:any)=>{
      this.id = res.id
      this.getARecipe(this.id)
    })
    // this.getARecipe(this.id)
  }

  getARecipe(id:string){
    this.api.viewRecipeAPI(id).subscribe((res:any)=>{
        this.recipe = res
        console.log(this.recipe);
        this.getAllRelatedRecipes(res.cuisine)
    })
  }

  getAllRelatedRecipes(cuisine:string){
    this.api.getRelatedRecipeAPI(cuisine).subscribe((res:any)=>{
      if (res.length>1) {
        this.allRelatedRecipes = res.filter((item:any)=>item.name!=this.recipe.name)
        console.log(this.allRelatedRecipes);
      }
    })
  }

}
