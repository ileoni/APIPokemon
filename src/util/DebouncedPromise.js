import React from 'react'

function DebouncedPromise(fn, delay)
{
    let response = null;
    let timeout = React.createRef(null);
    
    return function handle(params)
    {
        return new Promise((resolve, reject) => {
            clearTimeout(timeout)

            const later = async () => {
                try {
                    response = await fn(params)
                    resolve(response)
                } catch (e) {
                    reject(e)
                }
            }
            
            timeout = setTimeout( later, delay);
        });
    }
}

export default DebouncedPromise