import React from 'react';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import PropertyHeaderImage from '@/components/PropertyHeaderImage';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import PropertyDetails from '@/components/PropertyDetails';
import PropertyImages from '@/components/PropertyImages';
interface Params {
  params: {
    id: string;
  };
}
const PropertyDetailsPage = async ({ params }: Params) => {
  console.log(params);
  await connectDB();
  const property = await Property.findById(params.id).lean();
  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <section>
        <div className='container m-auto py-6 px-6'>
          <Link
            href='/properties'
            className='text-indigo-500 hover:text-indigo-600 flex items-center justify-start gap-1'
          >
            <FaArrowLeft />
            Back to Properties
          </Link>
        </div>
      </section>
      <section className='bg-indigo-50'>
        <div className='container m-auto py-10 px-6'>
          <div className='grid grid-cols-1 md:grid-cols-70/30 w-full'>
            {/* Property info*/}
            <PropertyDetails property={property} />
          </div>
        </div>
      </section>
      <PropertyImages images={property.images} />
    </>
  );
};

export default PropertyDetailsPage;
