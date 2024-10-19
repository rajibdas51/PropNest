import Link from 'next/link';
import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <section className='bg-indigo-50 min-h-screen '>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-24 shadow-md rounded-md border m-4 md:m-0 '>
          <div className='flex justify-center'>
            <FaExclamationTriangle className='text-orange-400 text-8xl' />
          </div>
          <div className='text-center'>
            <h1 className='py-4 text-3xl font-bold'>Page not Found!</h1>
            <p className='py-4 mb-4'>
              The page you are looking for is not found!
            </p>
            <Link
              href='/'
              className='bg-indigo-700 hover:bg-indigo-800 rounded-md py-3 px-6 text-white my-4'
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
