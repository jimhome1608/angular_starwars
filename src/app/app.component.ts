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
  loading: string = "Loading";


  constructor (swService: StarWarsService) {
    this.swService = swService;
  }

  button_clicked() {
    console.log("button_clicked");
    this.characters = this.swService.getCharacters();
  }

  ngOnInit() {
    this.swService.fetchCharacters();
    this.subscription = this.swService.charactersChanged.subscribe(
      () => {
        this.characters = this.swService.getCharacters();
        this.loading = "";
      }
    );
  }

}
