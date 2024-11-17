'use server';

import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import cloudinary from '@/config/cloudinary';

// Define FormDataType
interface FormDataType extends FormData {
  getAll(name: string): FormDataEntryValue[]; // Explicitly define getAll
  get(name: string): FormDataEntryValue | null;
}

// Property data interface
interface PropertyData {
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
  amenities?: string[];
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
  images?: string[];
  owner: string;
}

async function addProperty(formData: FormDataType) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required!');
  }

  const { userId } = sessionUser;

  // Extract and process amenities
  const amenities = formData
    .getAll('amenities')
    .map((item) => (typeof item === 'string' ? item : '')) as string[];

  // Extract and filter images
  const images = formData
    .getAll('images')
    .filter(
      (image): image is File => image instanceof File && image.name !== ''
    );

  // Create the propertyData object
  const propertyData: PropertyData = {
    type: formData.get('type') as string,
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    location: {
      street: formData.get('location.street') as string,
      city: formData.get('location.city') as string,
      state: formData.get('location.state') as string,
      zipcode: formData.get('location.zipcode') as string,
    },
    beds: parseInt(formData.get('beds') as string, 10),
    baths: parseInt(formData.get('baths') as string, 10),
    square_feet: parseInt(formData.get('square_feet') as string, 10),
    amenities,
    rates: {
      weekly: parseFloat(formData.get('rates.weekly') as string),
      monthly: parseFloat(formData.get('rates.monthly') as string),
      nightly: parseFloat(formData.get('rates.nightly') as string),
    },
    seller_info: {
      name: formData.get('seller_info.name') as string,
      email: formData.get('seller_info.email') as string,
      phone: formData.get('seller_info.phone') as string,
    },
    owner: userId,
  };

  // Upload images to Cloudinary
  const imageUrls: string[] = [];
  for (const imageFile of images) {
    const imageBuffer = await imageFile.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);

    // Convert the image data to base64 and upload to Cloudinary
    const imageBase64 = imageData.toString('base64');
    const result = await cloudinary.uploader.upload(
      `data:${imageFile.type};base64,${imageBase64}`,
      { folder: 'propnest' }
    );
    imageUrls.push(result.secure_url);
  }

  propertyData.images = imageUrls;

  // Save property to the database
  const newProperty = new Property(propertyData);
  await newProperty.save();

  // Revalidate the cache and redirect
  revalidatePath('/');
  redirect(`/properties/${newProperty._id}`);
}

export default addProperty;
