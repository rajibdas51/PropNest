import Image from 'next/image';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import profileDefault from '@/assets/images/profile.png';
import connectDB from '@/config/database';
import ProfileProperties from '@/components/ProfileProperties';
import { convertToSerializeableObject } from '@/utils/convertToObject';
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
const ProfilePage = async () => {
  await connectDB();
  const sessionUser = await getSessionUser();
  const { userId }: any = sessionUser;
  if (!userId) {
    throw new Error('User ID is required!');
  }
  // The .lean() method is a Mongoose function that returns plain JavaScript objects instead of Mongoose documents. This reduces memory usage and speeds up the query by removing Mongoose-specific methods and properties.
  const propertiesDocs = await Property.find({ owner: userId }).lean();
  // we are making the document serializeableobject to avoid warnings
  const properties = propertiesDocs.map(convertToSerializeableObject);
  return (
    <section className='bg-indigo-50'>
      <div className='container m-auto py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <h1 className='text-3xl font-bold mb-4'>Your Profile</h1>
          <div className='flex flex-col md:flex-row'>
            <div className='md:w-1/4 mx-20 mt-10'>
              <div className='mb-4'>
                <Image
                  className='h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0'
                  src={sessionUser?.user.image || profileDefault}
                  alt='User'
                  width={200}
                  height={200}
                />
              </div>

              <h2 className='text-2xl mb-4'>
                <span className='font-bold block'>Name: </span>{' '}
                {sessionUser?.user.name}
              </h2>
              <h2 className='text-2xl'>
                <span className='font-bold block'>Email: </span>{' '}
                {sessionUser?.user.email}
              </h2>
            </div>

            <div className='md:w-3/4 md:pl-4'>
              <h2 className='text-xl font-semibold mb-4'>Your Listings</h2>
              <ProfileProperties properties={properties} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
