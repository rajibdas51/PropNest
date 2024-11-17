import React from 'react';
import PropertySearchForm from './PropertySearchForm';
import Image from 'next/image';
import HeroBg from '@/assets/images/hero-bg.jpg';

const Hero = () => {
  return (
    <section className='flex items-center justify-center h-00 pb-20 mb-4 relative'>
      <Image
        src={HeroBg}
        alt=''
        width={0}
        height={0}
        className=' object-cover bg-no-repeat w-fll md:h-[800px] -z-50 absolute'
      />
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center md:h-[800px]'>
        <div className='text-center'>
          <h1 className='text-4xl font-extrabold text-white sm:text-5xl md:text-6xl'>
            Find The Perfect Rental
          </h1>
          <p className='my-4 text-xl text-white'>
            Discover the perfect property that suits your needs.
          </p>
        </div>
        <PropertySearchForm />
      </div>
    </section>
  );
};

export default Hero;
