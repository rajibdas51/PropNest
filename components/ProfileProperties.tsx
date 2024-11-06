'use client';
import Link from 'next/link';
import React from 'react';
import { useState } from 'react';
import deleteProperty from '@/app/actions/deleteProperty';
// Define types for nested objects within Property
type Location = {
  street: string;
  city: string;
  state: string;
  zipcode: string;
};

type Rates = {
  nightly: number | null;
  weekly: number;
  monthly: number;
};

type SellerInfo = {
  name: string;
  email: string;
  phone: string;
};

// Define the main Property type
type Property = {
  _id: string; // Typically, ObjectId is represented as a string in TypeScript
  owner: string;
  name: string;
  type: string;
  description: string;
  location: Location;
  beds: number;
  baths: string;
  square_feet: number;
  amenities: string[];
  rates: Rates;
  seller_info: SellerInfo;
  images: string[];
  is_featured: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type PropertiesType = {
  Property: Property[];
};
const ProfileProperties = ({
  properties: initialProperties,
}: {
  properties: PropertiesType;
}) => {
  const [properties, setProperties] = useState(initialProperties);

  const handleDeleteProperty = async (propertyId: string) => {
    const confirmed;
  };
  return (
    <>
      {properties.map((property: Property) => (
        <div className='mb-10' key={property._id}>
          <Link href={`/properties/${property._id}`}>
            <img
              className='h-32 w-full rounded-md object-cover'
              src={`${property.images[0]}`}
              alt='Property 1'
              width={1000}
              height={2}
            />
          </Link>
          <div className='mt-2'>
            <p className='text-lg font-semibold'>{property.name}</p>
            <p className='text-gray-600'>
              Address: {property.location.street} {property.location.city}{' '}
              {property.location.state} {property.location.zipcode}
            </p>
          </div>
          <div className='mt-2'>
            <a
              href='/add-property.html'
              className='bg-indigo-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-indigo-600'
            >
              Edit
            </a>
            <button
              className='bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600'
              type='button'
              onClick={() => handleDeleteProperty(property._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProfileProperties;
