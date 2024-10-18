import React from 'react';

const Loader = () => {
    return (
        <div className='min-h-screen w-screen fixed top-0 left-0 flex items-center justify-center bg-background/20'>
            <div className="flex items-center justify-center h-screen ">
                <div className="loader w-16 h-16 border-8 border-primary border-t-8 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
        </div>
    );
};

export default Loader;
