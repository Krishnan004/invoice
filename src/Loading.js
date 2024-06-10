import React from 'react';
import image from "./images.png"

const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="relative">
                <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-gray-500"></div>
                <img 
                    src={image} 
                    alt="Loading Image" 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-20 w-20 object-c"
                />
            </div>
           
        </div>
    )
}

export default Loading;
