import axios from 'axios'
import DebouncedPromise from '../util/DebouncedPromise';

const config = {
    baseURL: "https://pokeapi.co/api/v2",
    method: "GET",
}

const api = {
    state: {
        limit: 0,
        error: null,
        data: null,
        loading: false
    },
    allPokemons: async (more) => {
        const debounced = DebouncedPromise(axios, 600);
        const {state} = api
        const finalConfig = {
            ...config,
            url: "pokemon",
            params: {
                limit: 151
            },
        };

        const {data} = await debounced(finalConfig);

        return {
            ...state,
            data: data,
            loading: true
        }
    },
    findPokemonSpecie: async (id) => {
        const debounced = DebouncedPromise(axios, 1000)
        const {state} = api
        const finalConfig = {
            ...config,
            url: `pokemon-species/${id}`
        }

        const {data} = await debounced(finalConfig)

        return {
            ...state,
            data: data,
            loading: true
        }
    },
    getPokemonByName: async ([{pokemon}]) => {
        const {data} = await axios(pokemon.url)
        return data
    },
    getPokemonImage: async (pokemon) => {
        if(pokemon === null) return

        const config = {
            baseURL: "https://pokeapi.co/api/v2",
            method: "GET"
        }

        const {data} = await axios({
            ...config,
            url: `pokemon/${pokemon}`
        })

        const {front_default} = data.sprites.other['official-artwork']

        return front_default
    }
}

export default api