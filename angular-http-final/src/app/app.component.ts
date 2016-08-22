import { Component } from '@angular/core';
import { PokemonService } from './pokemon.service';
import { Pokelist } from './model/pokelist';
import { Pokemon } from './model/pokemon';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [PokemonService]
})
export class AppComponent {
  error: string;
  pokemon: Array<Pokelist>;
  retrievingUrl = false;
  retrievingList = false;
  selectedPokemon: Pokemon;

  constructor(private pokemonService: PokemonService) { }

  getList() {
    this.retrievingList = true;
    this.pokemonService.getList()
      .subscribe(
      (data) => {
        this.pokemon = data["results"];
        let i = 1;
        this.pokemon.forEach((poke) => poke.sprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + i++ + '.png');
      },
      (err) => {
        this.error = JSON.stringify(err);
      },
      () => {
        this.retrievingList = false;
      }
      );
  }

  setSelected(pokemon: any) {
    this.retrievingUrl = true;
    this.selectedPokemon = null;
    this.pokemonService.getByUrl(pokemon.url)
      .subscribe(
      (pokemon) => {
        this.selectedPokemon = pokemon;
      },
      (err) => {
        this.error = JSON.stringify(err);
      },
      () => {
        this.retrievingUrl = false;
      }
      );
  }
}
