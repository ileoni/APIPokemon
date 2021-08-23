import axios from "axios"
import DebouncedPromise from "./DebouncedPromise"

const baseUrlImage = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"
const config = {
    baseURL: "https://pokeapi.co/api/v2",
    method: "GET",
}

const api = {
    load: async ({
        isDebounced= true,
        delay = 600,
        offset = 0,
        limit = 20  
    }) => {
        const debounced = DebouncedPromise(axios, delay)
        const finalConfig = {
            ...config,
            url: 'pokemon',
            params: {
                offset,
                limit
            }
        }

        const fn = isDebounced ? debounced: axios
        const {data} = await fn(finalConfig)

        return {
            data,
            loading: true
        }
    },
    getPokemon: async ({isDebounced = true, delay = 300, id}) => {
        const debounced = DebouncedPromise(axios, delay)
        const finalConfig = {
            ...config,
            url: `pokemon/${id}`
        }

        const fn = isDebounced ? debounced: axios
        const {data} = await fn(finalConfig)

        return {
            data,
            loading: true
        }
    },
    getSpecie: async ({isDebounced = true, delay = 300, id}) => {
        const debounced = DebouncedPromise(axios, delay)
        const finalConfig = {
            ...config,
            url: `pokemon-species/${id}`
        }

        const fn = isDebounced ? debounced: axios
        const {data} = await fn(finalConfig)

        return {
            data,
            loading: true
        }
    },
    getEvolution: async ({isDebounced = true, delay = 300, url}) => {
        const debounced = DebouncedPromise(axios, delay)
        const finalConfig = {
            ...config,
            url
        }

        const fn = isDebounced ? debounced: axios
        const {data} = await fn(finalConfig)

        return {
            data,
            loading: true
        }
    },
    getImage: (id) => {
         
        const img = baseUrlImage.concat(id, '.png')

        return img
    }
}

export default api