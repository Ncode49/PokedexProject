// url pokemon/1 or pokemon/bulbasaur by id or by name
export interface PokemonDTO {
  id: number
  name: string
  abilities: Array<AbilityDTO>
  base_experience: number
  location_area_encounters: string
  forms: Array<FormDTO>
  game_indices: Array<GameIndiceDTO>
  height: number
  held_items: []
  is_default: boolean
  moves: []
  order: number
  species: {
    name: string
    url: string
  }
  sprites: SpritesDTO
  stats: Array<StatDTO>
  weight: number
  types: Array<TypeDTO>
}

export interface TypeDTO {
  slot: number
  type: {
    name: string
    url: string
  }
}

export interface StatDTO {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

export interface SpritesDTO {
  back_default: string
  back_female: string
  back_shiny: string
  back_shiny_female: string
  front_default: string
  front_female: string
  front_shiny: string
  front_shiny_female: string
}

export interface AbilityDTO {
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
  slot: number
}

export interface FormDTO {
  name: string
  url: string
}

export interface GameIndiceDTO {
  game_index: number
  version: {
    name: string
    url: string
  }
}

// url https://pokeapi.co/api/v2/pokemon/
export interface PokemonPageDTO {
  count: number
  next: string
  previous: string
  results: Array<PokemonSimpleDTO>
}

export interface PokemonSimpleDTO {
  name: string
  url: string
}

// url type/i
export interface PokemonTypeDTO {
  pokemon: Array<PokemonDataDTO>
}

export interface PokemonDataDTO {
  pokemon: {
    name: string
    url: string
  }
  slot: number
}
