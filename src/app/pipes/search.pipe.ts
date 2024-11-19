import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(allRecipes:any[],searchKey:string): any [] {
    const result:any = []

    if (!allRecipes || searchKey=="") {
      return allRecipes
    }
    allRecipes.forEach(item=>{
      // item.name.toLowerCase().includes(searchKey.toLowerCase())
      if (item["name"].toLowerCase().includes(searchKey.toLowerCase())) {
        result.push(item)
      }
    })

    return result;
  }

}
