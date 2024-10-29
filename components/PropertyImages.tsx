import Image from 'next/image';
import React from 'react';

interface ImagesType {
  images: string[];
}
const PropertyImages = ({ images }: ImagesType) => {
  return (
    <section className='bg-indigo-50 p-4'>
      <div className='container max-auto'>
        {images.length === 1 ? (
          <Image
            src={images[0]}
            alt=''
            className='object-cover h-[400px] w-full rounded-xl'
            width={1800}
            height={400}
            priority={true}
          />
        ) : (
          <div className='grid grid-cols-2 gap-4 mx-auto'>
            {images.map((image, index) => (
              <div
                className={`${
                  images.length === 3 && index === 2
                    ? 'col-span-2'
                    : 'col-span-1'
                }`}
                key={index}
              >
                <Image
                  src={image}
                  alt=''
                  className='object-cover h-[400px] w-full rounded-xl'
                  width={1800}
                  height={400}
                  priority={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyImages;
