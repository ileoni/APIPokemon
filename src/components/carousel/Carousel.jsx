import './Carousel.css'
import React from 'react'

class Carousel extends React.Component
{
    constructor(props)
    {
        super(props)
        this.click = this.click.bind(this)
        this.state = {
            carouselRef: React.createRef(null),
        }
    }

    click (onNextOrPrevious)
    {
        const {carouselRef} = this.state
        const slideObject = Object.values(carouselRef.current.children)

        if(onNextOrPrevious !== 'plus') return this.minus(carouselRef, slideObject)
        this.plus(carouselRef, slideObject, onNextOrPrevious)
    }

    plus ({current}, slides)
    {
        const firstSlide = slides.shift() 
        const lastSlide = slides.pop()
        
        this.animateImage(slides, lastSlide)
        current.append(firstSlide)
    }

    minus({current}, slides)
    {
        const firstSlide = slides.shift()
        const lastSlide = slides.pop()
        
        this.animateImage(slides, firstSlide)
        current.prepend(lastSlide)
    }

    animateImage(slides, onNextOrPrevious)
    {
        slides.map(el => el.classList.remove('zoom'))
        onNextOrPrevious.classList.add('zoom')
    }

    render()
    {
        const {carouselRef} = this.state
        const {children, left, right} = this.props

        return (
            <>
            <div className="carousel-container">

                <Button {...left} click={this.click}/>
                
                <div className="carousel" ref={carouselRef}>
                    {children}
                </div>
                
                <Button {...right} click={this.click}/>

            </div>
            </>   
        )
    }
}

export function Slide(props) {
    const {name, image} = props
    return (
        <>
        <div className="slide">
            <div>
                <img src={image} alt={name} />
                <span className="name">
                    {name}
                </span>
            </div>
        </div>
        </>
    )   
}

function Button(props) {
    const {click, icon, color, action, fontSize} = props
    return (
        <button 
            onClick={_ => click(action)}
            style={{
                color: color,
                fontSize: fontSize,
            }}
        >
            {icon}
        </button>
    )
}

export default Carousel