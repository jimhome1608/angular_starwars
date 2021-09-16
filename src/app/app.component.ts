import { Component, OnInit } from '@angular/core';
import { StarWarsService } from '../star-wars.service';
import { Character } from './character';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'starwars';
  characters:Character[] = [];
  displayedColumns: string[] = ['name', 'height', 'mass', 'hair_color', 'gender'];

  swService: StarWarsService;
  subscription: any;
  loading: string = "Loading Star Wars Data.  Please wait... ";
  loaded: boolean = false;
  star_wars_page: number = 1;
  loader_gif = ".././assets/images/loader.gif"


  constructor (swService: StarWarsService) {
    this.swService = swService;
  }

  button_clicked() {
    this.star_wars_page = this.star_wars_page + 1;
    this.loaded = false;
    this.swService.fetchCharacters(this.star_wars_page);
  }

  ngOnInit() {
    this.swService.fetchCharacters(this.star_wars_page);
    this.subscription = this.swService.charactersChanged.subscribe(
      () => {
        const moreCharacters= this.swService.getCharacters();
        moreCharacters.forEach(c  => {
          this.characters.push(<Character>c);
        });
        this.loaded = true;
      }
    );
  }

}
