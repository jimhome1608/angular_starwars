import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character } from './app/character';
import { Subject } from 'rxjs';


@Injectable()
export class StarWarsService {
  private characters:Character[] = [];

  httpClient: HttpClient;
  charactersChanged = new Subject<void>();

  constructor(private http: HttpClient)
  {
    this.httpClient = http
  }

  getCharacters() {
    return this.characters;
  }

  fetchCharacters() {
    this.httpClient.get('https://swapi.dev/api/people/')
      .subscribe(
        (data:any) => {
          const extractedChars = data.results;
          const chars = extractedChars.map((char:any) => {
            return {name: char.name, height: char.height, mass: char.mass, hair_color: char.hair_color, gender: char.gender };
          });
          this.characters = chars;
          console.log(chars);
          this.charactersChanged.next();
          this.characters.forEach(char => {
            if ((<Character>char).name == "Luke Skywalker")
            (<Character>char).image_url = "./assets/images/luke_skywalker.png";
          });
          this.charactersChanged.next();
        }
      );
  }
}
