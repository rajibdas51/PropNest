import PropertyCard from '@/components/PropertyCard';
import connectDB from '@/config/database';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';
type SessionUser = {
  user: {
    name: string;
    email: string;
    image: string;
    id: string;
  };
  userId: string;
};

type BookmarkType = {
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
  baths: string;
  square_feet: number;
  amenities: string[];
  rates: {
    nightly: number | null;
    weekly: number | null;
    monthly: number | null;
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
};
const SavedPropertiesPage = async () => {
  await connectDB();

  const sessionUser: any = await getSessionUser();

  if (!sessionUser) {
    throw new Error('User not authenticated');
  }
  const { userId } = sessionUser;

  // NOTE: here we can make one database query by using Model.populate
  const { bookmarks }: any = await User.findById(userId)
    .populate('bookmarks')
    .lean();

  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        <h1 className='text-2xl mb-4'>Saved Properties</h1>
        {bookmarks.length === 0 ? (
          <p>No saved properties</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {bookmarks.map((property: any) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default SavedPropertiesPage;
