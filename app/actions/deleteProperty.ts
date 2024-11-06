'use server';
import cloudinary from '@/config/cloudinary';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

async function deleteProperty(propertyId: string) {
  const sessionUser = await getSessionUser();
  const { userId } = sessionUser;
  console.log(userId);
  // check is session exists
  if (!userId) {
    throw new Error('User ID is required!');
  }

  await connectDB();

  const property = await Property.findById(propertyId);
  if (!property) throw new Error('Property Not Found!');

  // verify ownership
  if (property.owner.toString() !== userId) {
    throw new Error('Unauthorized user!');
  }

  // Extract public ID from image URLs (very last part of image url which looks like random string)
  const publicIds = property.images.map((imageUrl: any) => {
    const parts = imageUrl.split('/');
    return parts.at(-1).split('.').at(0);
  });

  // Delete images from Cloudinary
  if (publicIds.length > 0) {
    for (let publicId of publicIds) {
      await cloudinary.uploader.destroy('propnest/' + publicId);
    }
  }

  // delete property from database
  await property.deleteOne();

  revalidatePath('/', 'layout');
}

export default deleteProperty;
