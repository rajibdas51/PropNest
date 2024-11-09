'use server';
import connectDB from '@/config/database';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';

async function checkBookmarkStatus(propertyId: string) {
  await connectDB();

  const sessionUser = await getSessionUser();
  if (sessionUser || sessionUser.userId) {
    throw new Error('User ID is required!');
  }
  const { userId } = sessionUser;
  // Find user in database
  const user = await User.findById(userId);

  // check if the property is bookmarked
  let isBookmarked = user.bookmarks.includes(propertyId);

  return { isBookmarked };
}

export default checkBookmarkStatus;
