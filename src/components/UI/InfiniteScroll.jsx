import React from 'react'

class InfiniteScroll extends React.Component
{
    constructor()
    {
        super()
        this.state = {
            endRef: React.createRef()
        }
    }

    componentDidMount()
    {
        const {endRef} = this.state
        const {fetchMore} = this.props
        
        let options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
        }

        const intersect = ([entry]) => {
            if(entry.isIntersecting)
            {
                fetchMore()
            }
        } 

        let observer = new IntersectionObserver( intersect, options)

        observer.observe(endRef.current)

        return () => {
            observer.disconnect()
        }
    }

    render()
    {
        const {endRef} = this.state
        return <div ref={endRef} style={{marginBottom: "10px"}}/>
    }
}

export default InfiniteScroll