import React from 'react';
import { Loader } from '@mantine/core';

const FullLoader = () => {
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <Loader />
        </div>
    );
};

export default FullLoader;