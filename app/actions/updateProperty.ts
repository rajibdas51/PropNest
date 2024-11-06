'use server';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

import { redirect } from 'next/navigation';
interface FormDataType {
  type: string;
  name: string;
  description?: string;
  location: {
    street?: string;
    city: string;
    state: string;
    zipcode?: string;
  };
  beds: number;
  baths: number;
  square_feet: number;
  amenities?: string[]; // Assuming multiple amenities can be selected
  rates?: {
    weekly?: number;
    monthly?: number;
    nightly?: number;
  };
  seller_info: {
    name?: string;
    email: string;
    phone?: string;
  };
  images: string[]; // Represents selected images
}
async function updateProperty(propertyId: string, formData: FormDataType) {
  await connectDB();
  const sessionUser = await getSessionUser();

  const { userId } = sessionUser;

  const existingProperty = await Property.findById(propertyId);
  // verifying ownership of the property

  if (existingProperty.owner.toString() !== userId) {
    throw new Error('Current user does not own this property! ');
  }

  const propertyData = {
    type: formData.get('type'),
    name: formData.get('name'),
    description: formData.get('description'),
    location: {
      street: formData.get('location.street'),
      city: formData.get('location.city'),
      state: formData.get('location.state'),
      zipcode: formData.get('location.zipcode'),
    },
    beds: formData.get('beds'),
    baths: formData.get('baths'),
    square_feet: formData.get('square_feet'),
    amenities: formData.getAll('amenities'),
    rates: {
      weekly: formData.get('rates.weekly'),
      monthly: formData.get('rates.monthly'),
      nightly: formData.get('rates.nightly.'),
    },
    seller_info: {
      name: formData.get('seller_info.name'),
      email: formData.get('seller_info.email'),
      phone: formData.get('seller_info.phone'),
    },
    owner: userId,
  };

  const updatedProperty = await Property.findByIdAndUpdate(
    propertyId,
    propertyData
  );
  revalidatePath('/', 'layout');
  redirect(`/properties/${updatedProperty?._id}`);
}

export default updateProperty;
