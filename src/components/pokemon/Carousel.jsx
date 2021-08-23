import './Carousel.css'
import 'materialize-css/dist/css/materialize.min.css'
import React from 'react'
import M from 'materialize-css'

class Carousel extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            carouselRef: React.createRef()
        }
    }

    componentDidMount()
    {
        const {carouselRef} = this.state

        M.Carousel.init(carouselRef.current, {
            duration: 300,
            dist: -100
        })
    }

    render()
    {
        const {carouselRef} = this.state
        const {list} = this.props

        return (
            <>
            <div className="carousel" ref={carouselRef}>
                {
                    list.map((pokemon, key) => {
                        if(pokemon  === null) return ''
                        
                        const {name, sprites} = pokemon
                        
                        return (
                            <div className="carousel-item"  key={key}>
                                <img src={sprites} alt={name} width="100%"/>
                                <span className="name">
                                    {name}
                                </span>
                            </div>
                        )
                    })
                }
            </div>
            </>
        )
    }
}

export default Carousel