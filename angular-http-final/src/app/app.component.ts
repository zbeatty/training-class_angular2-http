import { Component } from '@angular/core';
import { PokemonService } from './pokemon.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [PokemonService]
})
export class AppComponent {
  error: string;
  pokemon: Array<any>;
  retrievingUrl = false;
  retrievingList = false;
  selectedPokemon: any;

  constructor(private pokemonService: PokemonService) { }

  getList() {
    this.retrievingList = true;
    this.pokemonService.getList()
      .subscribe(
      (data) => {
        this.pokemon = data["results"];
        let i = 1;
        this.pokemon.forEach((poke) => poke.sprite = 'http://pokeapi.co/media/sprites/pokemon/' + i++ + '.png');
        this.retrievingList = false;
      },
      (err) => {
        this.error = JSON.stringify(err);
      },
      () => {

      }
      );
  }

  setSelected(pokemon: any) {
    this.retrievingUrl = true;
    console.log('pokemon', pokemon);
    this.pokemonService.getByUrl(pokemon.url)
      .subscribe(
      (pokemon) => { 
        this.selectedPokemon = pokemon; 
        console.log('selectedPokemon2', this.selectedPokemon);
        this.retrievingUrl = false;
      }
      
      );
    console.log('selectedPokemon', this.selectedPokemon);
  }
}
