import React from 'react'

export const LinkCard = ({link}) => {
    return (
        <>
            <h2 className='white-text'>Link</h2>

            <p className='white-text'>Shorter Link: <a href={link.to} rel="noopener noreferrer" target="_blank">{link.to}</a></p>   
            <p className='white-text'>From: <a href={link.to} rel="noopener noreferrer" target="_blank">{link.from}</a></p>   
            <p className='white-text'>Count click: <strong>{link.clicks}</strong></p> 
            <p className='white-text'>Date Created: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>  
        </>
    )
}