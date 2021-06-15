import React from 'react'
import preloader from '../images/preloader.gif'

export const Preloader = () => {
    return (
        <div>
            <img src={preloader} alt='preloader.gif' />
        </div>
    )
}