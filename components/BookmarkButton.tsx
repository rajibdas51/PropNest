import { FaBookmark } from 'react-icons/fa';
const BookmarkButton = ({ property }) => {
  return (
    <button className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'>
      <FaBookmark className='mr-2' /> Property
    </button>
  );
};

export default BookmarkButton;
