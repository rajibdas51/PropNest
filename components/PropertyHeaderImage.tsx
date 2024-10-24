import Image from 'next/image';
import React from 'react';

const PropertyHeaderImage = ({ image }: any) => {
  return (
    <div className='container-xl m-auto'>
      <div className='grid grid-cols-1'>
        <Image
          src={`/images/properties/${image}`}
          width={0}
          height={0}
          alt='Property header image'
          className='object-cover h-[400px] w-full'
          sizes='100vw'
        />
      </div>
    </div>
  );
};

export default PropertyHeaderImage;
