import connectDB from '@/config/database';
import Property from '@/models/Property';
import { convertToSerializeableObject } from '@/utils/convertToObject';
import Link from 'next/link';
import PropertyCard from '@/components/PropertyCard';
import PropertySearchForm from '@/components/PropertySearchForm';
import { FaArrowAltCircleLeft } from 'react-icons/fa';

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

const SearchResultPage = async ({
  searchParams: { location, propertyType },
}: {
  searchParams: {
    location: string;
    propertyType: string;
  };
}) => {
  await connectDB();
  // making all  small letter to match the location string
  const locationPattern = new RegExp(location, 'i');
  let query = {
    $or: [
      {
        name: locationPattern,
      },
      {
        description: locationPattern,
      },
      { 'location.street': locationPattern },
      { 'location.city': locationPattern },
      { 'location.state': locationPattern },
      { 'location.zipcode': locationPattern },
    ],
  };

  if (propertyType && propertyType !== 'All') {
    const typePattern = new RegExp(propertyType, 'i');
    query.type = typePattern;
  }

  const propertiesQueryResults = await Property.find(query).lean();
  const properties = convertToSerializeableObject(propertiesQueryResults);
  //console.log(properties);
  return (
    <>
      <section className='bg-indigo-700 py-4'>
        <div className='max-w-7xl mx-auto px-4 flex flex-col items start sm:px-6 lg:px-8'>
          <PropertySearchForm />
        </div>
      </section>
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto px-4 py-6'>
          <Link
            href='/properties'
            className='flex items-center text-indigo-500 hover:underline mb-3'
          >
            <FaArrowAltCircleLeft /> Go To Properties
          </Link>
          <h1 className='text-2xl mb-4'>Search Results</h1>
          {properties.length === 0 ? (
            <p>No Search Results!</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {properties.map((property: PropertyType) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchResultPage;
