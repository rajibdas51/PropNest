import Image from 'next/image';
import React from 'react';
import HighFive from '@/assets/images/high-five.png';
import HomeIcon from '@/assets/images/Home-logo.png';
import ProfitIcon from '@/assets/images/profits.png';
const WhyChooseUs = () => {
  return (
    <section className='bg-gray-100 md:py-20'>
      <section className='container lg:container mx-auto flex flex-col items-center justify-center'>
        <h1 className='text-3xl font-bold py-4'>Why Choose Us </h1>
        <p className='text-lg mb-4'>We provide full service at every step.</p>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-14 mt-10'>
          <div className=' flex flex-col gap-6 items-center justify-center bg-white py-20 rounded-lg shadow-md'>
            <div className='bg-indigo-100 hover:bg-indigo-300 p-6 Hover:rounded-2xl rounded-full'>
              <Image src={HighFive} width={60} height={60} alt='' />
            </div>

            <h2 className='text-xl font-bold py-3'>Trusted By Thousands</h2>
            <p className='text-center items-center justify-center'>
              Join a community of happy homeowners who trust us for exceptional
              service and reliable real estate solutions
            </p>
          </div>
          <div className=' flex flex-col gap-6 items-center justify-center bg-white py-20 rounded-lg shadow-md'>
            <div className='bg-indigo-100 hover:bg-indigo-300 p-6 Hover:rounded-2xl rounded-full'>
              <Image src={HomeIcon} width={60} height={60} alt='' />
            </div>

            <h2 className='text-xl font-bold py-3'>Wide Range Of Properties</h2>
            <p className='text-center items-center justify-center'>
              Explore diverse properties tailored to meet your unique
              preferences and budget.
            </p>
          </div>
          <div className=' flex flex-col gap-6 items-center justify-center bg-white py-20 rounded-lg shadow-md'>
            <div className='bg-indigo-100 hover:bg-indigo-300 p-6 Hover:rounded-2xl rounded-full'>
              <Image src={ProfitIcon} width={60} height={60} alt='' />
            </div>

            <h2 className='text-xl font-bold py-3'>Financing Made Easy</h2>
            <p className='text-center items-center justify-center px-4'>
              Simplify your home-buying journey with flexible financing options
              and expert guidance.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default WhyChooseUs;
