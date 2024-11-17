import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import PropertyRent from '@/assets/images/property-rent.svg';
import PropertySell from '@/assets/images/property-sell.svg';
type btnInfoType = {
  text: string;
  link: string;
  btnBgColor: string;
  hoverColor: string;
};
const InfoBox = ({
  children,
  heading,
  bgColor = 'bg-gray-100',
  txtColor = 'text-gray-800',
  btnInfo,
}: {
  children: React.ReactNode;
  heading: string;
  bgColor: string;
  txtColor: string;
  btnInfo: btnInfoType;
}) => {
  return (
    <>
      <div
        className={`${bgColor} flex flex-col items-center justify-center gap-4  p-6 rounded-lg md:px-40 `}
      >
        <div className='flex items-center justify-center'>
          {btnInfo.text === 'Browse Properties' ? (
            <Image
              src={PropertyRent}
              width={100}
              height={100}
              alt='PropertyRent'
            />
          ) : (
            <Image
              src={PropertySell}
              width={100}
              height={1000}
              alt='PropertySell'
            />
          )}
        </div>

        <h2 className='text-2xl text-black font-bold items-center'>
          {heading}
        </h2>
        <p className='text-md font-bold items-center justify-center text-center'>
          {children}
        </p>

        <Link
          href={btnInfo.link}
          className={`${btnInfo.btnBgColor}  inline-block w-max rounded-lg mb-10  text-white p-4 hover:${btnInfo.hoverColor}`}
        >
          {btnInfo.text === 'Browse Properties'
            ? 'Browse Properties'
            : 'Add Properties'}
        </Link>
      </div>
    </>
  );
};

export default InfoBox;
