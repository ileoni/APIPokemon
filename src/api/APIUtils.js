import axios from 'axios'
import DebouncedPromise from '../util/DebouncedPromise';

const config = {
    baseURL: "https://pokeapi.co/api/v2",
    method: "GET",
}

const innitialState = {
    error: null,
    data: null,
    loading: false    
}

const api = {
    state: {
        ...innitialState,
        limit: 0,
    },
    load: async ({isDebounced, params}) => {
        const debounced = DebouncedPromise(axios, 1000)
        const finalConfig = {
            ...config,
            url: "pokemon",
            params
        }

        const fn = isDebounced ? debounced: axios
        const {data} = await fn(finalConfig)

        return {
            data,
            loading: true
        }
    },
    allPokemons: async (isDebounced) => {
        const debounced = DebouncedPromise(axios, 300);
        const {state} = api
        const finalConfig = {
            ...config,
            url: "pokemon",
            params: {
                limit: 21
            },
        };

        const fn = isDebounced ? debounced: axios

        const {data} = await fn(finalConfig);

        return {
            ...state,
            data: data,
            loading: true
        }
    },
    findPokemon: async (id, isDebounced) => {
        const debounced = DebouncedPromise(axios, 300);
        const {state} = api
        const finalConfig = {
            ...config,
            url: `pokemon/${id}`
        };

        const fn = isDebounced ? debounced: axios

        const {data} = await fn(finalConfig);

        return {
            ...state,
            data: data,
            loading: true
        }
    },
    findPokemonSpecie: async (id, isDebounced = true) => {
        const debounced = DebouncedPromise(axios, 300)
        const {state} = api
        const finalConfig = {
            ...config,
            url: `pokemon-species/${id}`
        }

        const fn = isDebounced ? debounced: axios;

        const {data} = await fn(finalConfig)

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