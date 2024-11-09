'use server';
import connectDB from '@/config/database';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

async function bookmarkProperty(propertyId: string) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required');
  }

  const { userId } = sessionUser;
  const user = await User.findById(userId);

  let isBookmarked = user.bookmarks.includes(propertyId);
  let message;
  if (isBookmarked) {
    // if already bookmarked , then remove
    user.bookmarks.pull(propertyId);
    isBookmarked = false;
    message = 'Bookmark Removed!';
  } else {
    // if not bookmarked then add
    user.bookmarks.push(propertyId);
    message = 'Bookmark Added!';
    isBookmarked = true;
  }

  await user.save();
  revalidatePath('/properties/saved', 'page');

  return {
    message,
    isBookmarked,
  };
}

export default bookmarkProperty;
