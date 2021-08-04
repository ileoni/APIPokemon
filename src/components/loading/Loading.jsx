import './Loading.css'
import React from 'react'

class Loading extends React.Component
{
    render()
    {
        return (
            <div className="loading">
                <div>
                    <svg viewBox="0 0 310 300" height="310" width="300">
                        <g>
                            <path id="top"
                                d="M0 150 A 1 1 0 0 1 300 150 a 0 0 0 0 0 -50 0 a 1 1 0 0 0 -200 0Z"/>
                        </g>
                        <g>
                            <path id="middle"
                                d="M100 100 A 1 1 0 0 0 200 200 A 1 1 0 0 0 100 100"/>
                        </g>
                        <g>
                            <path id="bottom"
                                d="M0 160 A 1 1 0 0 0 300 160 a 0 0 0 0 1 -50 0 a 1 1 0 0 1 -200 0Z"/>
                        </g>
                    </svg>
                </div>
            </div>
        )
    }
}

export default Loading