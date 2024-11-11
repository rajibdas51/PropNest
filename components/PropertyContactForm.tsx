import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';
interface PropertyType {
  _id: string;
  owner: string;
  name: string;
  type: string;
  description: string;
  location: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
  };
  beds: number;
  baths: number;
  square_feet: number;
  amenities: string[];
  rates: {
    weekly: number;
    monthly: number;
    nightly: number;
  };
  seller_info: {
    name: string;
    email: string;
    phone: string;
  };
  images: string[];
  is_featured: boolean;
  createdAt: string;
  updatedAt: string;
}
const PropertyContactForm = ({ property }: { property: PropertyType }) => {
  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h3 className='text-xl font-bold mb-2'>Contact Property Manager</h3>
      <form action=''>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='name'
          >
            Name:
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='text'
            name='name'
            id='name'
            placeholder='Enter your name'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='email'
            className='block text-sm text-gray-700 font-bold mb-2'
          >
            Email:
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='email'
            name='email'
            id='email'
            placeholder='Enter your email'
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='phone'
          >
            Phone:
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='phone'
            name='phone'
            type='text'
            placeholder='Enter your phone number'
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='message'
            className='block text-gray-700 text-sm font-bold mb-2 '
          >
            Message:
          </label>
          <textarea
            className='shadow appearance-none text-gray-700 rounded w-full py-2 px-3 border h-44 focus:outline-none focus:shadow-outline'
            name='message'
            id='message'
            placeholder='Enter your message'
          ></textarea>
        </div>
        <div>
          <button
            className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center'
            type='submit'
          >
            <FaPaperPlane className='mr-2' />
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyContactForm;
