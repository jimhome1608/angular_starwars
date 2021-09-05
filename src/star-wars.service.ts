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
    this.httpClient.get('http://swapi.dev/api/people/')
      .subscribe(
        (data:any) => {
          const extractedChars = data.results;
          const chars = extractedChars.map((char:any) => {
            return {name: char.name};
          });
          this.characters = chars;
          this.charactersChanged.next();
        }
      );
  }
}
