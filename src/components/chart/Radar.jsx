import React from 'react'
import {
    Chart,
    Filler,
    LineElement,
    PointElement,
    RadarController,
    RadialLinearScale,
    Title
} from 'chart.js'

class Radar extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            contextRef: React.createRef(null)
        }
    }

    componentDidMount()
    {
        const {contextRef} = this.state
        const {stats} = this.props

        const stat = {
            hp: {
                name: 'hp',
                base: stats[0].base_stat
            },
            attack: {
                name: 'attack',
                base: stats[1].base_stat
            },
            defense: {
                name: 'defense',
                base: stats[2].base_stat
            },
            specialAttack: {
                name: 's-attack',
                base: stats[3].base_stat
            },
            specialDefense: {
                name: 's-defense',
                base: stats[4].base_stat
            },
            speed: {
                name: 'speed',
                base: stats[5].base_stat
            }
        }
        

        Chart.register(
            RadarController,
            RadialLinearScale,
            PointElement,
            LineElement,
            Filler,
            Title,
        )
        
        new Chart( contextRef.current, {
            type: 'radar',
            data: {
                labels: [
                    stat.hp.name,
                    stat.attack.name,
                    stat.defense.name,
                    stat.specialAttack.name,
                    stat.specialDefense.name,
                    stat.speed.name
                ],
                datasets: [{
                    data: [
                        stat.hp.base,
                        stat.attack.base,
                        stat.defense.base,
                        stat.specialAttack.base,
                        stat.specialDefense.base,
                        stat.speed.base
                    ],
                    backgroundColor: '#FFFB',
                    pointBackgroundColor: [
                        "#E37D4DAA",
                        "#8FC3D0AA",
                        "#276c87AA",
                        "#93CAADAA",
                        "#FBD964AA",
                    ],
                    pointBorderColor: [
                        "#E37D4D",
                        "#8FC3D0",
                        "#276c87",
                        "#93CAAD",
                        "#FBD964",
                    ],
                    pointBorderWidth: 5,
                    fill: true,
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: "Stats",
                        align: "start",
                        color: 'white',
                        font: {
                            size: '20em',
                            weight: 100,
                            family: ['Fjalla One', 'sans-serif'],
                        }
                    }
                },
                scales: {
                    r: {
                        ticks: {
                            display: false
                        },
                        pointLabels: {
                            color: 'white',
                            font: {
                                size: '15em',
                                family: ['Fjalla One', 'sans-serif'],
                            }
                        },
                        angleLines: {
                            color: 'white',
                        },
                        grid: {
                            color: 'white',
                            circular: true
                        },
                        suggestedMin: 0,
                    }
                }
            }
        })
    }
    
    render()
    {
        const {contextRef} = this.state

        return (
            <div className="chart-container">
                <canvas ref={contextRef}/> 
            </div>
        )
    }
}

export default Radar