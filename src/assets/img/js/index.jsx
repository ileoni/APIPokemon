import Bug from '../../../assets/img/bug.png'
import Dark from '../../../assets/img/dark.png'
import Dragon from '../../../assets/img/dragon.png'
import Electric from '../../../assets/img/electric.png'
import Fairy from '../../../assets/img/fairy.png'
import Fighting from '../../../assets/img/fighting.png'
import Fire from '../../../assets/img/fire.png'
import Flying from '../../../assets/img/flying.png'
import Ghost from '../../../assets/img/ghost.png'
import Grass from '../../../assets/img/grass.png'
import Ground from '../../../assets/img/ground.png'
import Ice from '../../../assets/img/ice.png'
import Normal from '../../../assets/img/normal.png'
import Poison from '../../../assets/img/poison.png'
import Psychic from '../../../assets/img/psychic.png'
import Rock from '../../../assets/img/rock.png'
import Steel from '../../../assets/img/steel.png'
import Water from '../../../assets/img/water.png'

export function Image ({type})
{
    switch (type) {
        case 'bug':
            return <img src={Bug} alt={type} />
        case 'dark':
            return <img src={Dark} alt={type} />
        case 'dragon':
            return <img src={Dragon} alt={type} />
        case 'electric':
            return <img src={Electric} alt={type} />
        case 'fairy':
            return <img src={Fairy} alt={type} />
        case 'fighting':
            return <img src={Fighting} alt={type} />
        case 'fire':
            return <img src={Fire} alt={type} />
        case 'flying':
            return <img src={Flying} alt={type} />
        case 'ghost':
            return <img src={Ghost} alt={type} />
        case 'grass':
            return <img src={Grass} alt={type} />
        case 'ground':
            return <img src={Ground} alt={type} />
        case 'ice':
            return <img src={Ice} alt={type} />
        case 'normal':
            return <img src={Normal} alt={type} />
        case 'poison':
            return <img src={Poison} alt={type} />
        case 'psychic':
            return <img src={Psychic} alt={type} />
        case 'rock':
            return <img src={Rock} alt={type} />
        case 'steel':
            return <img src={Steel} alt={type} />
        case 'water':
            return <img src={Water} alt={type} />
        default:
            break;
    }
}

export {
    Bug,
    Dark,
    Dragon,
    Electric,
    Fairy,
    Fighting,
    Fire,
    Flying,
    Ghost,
    Grass,
    Ground,
    Ice,
    Normal,
    Poison,
    Psychic,
    Rock,
    Steel,
    Water,
}