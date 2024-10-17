import Link from 'next/link';
import React from 'react';

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
      <div className={`${bgColor} flex flex-col gap-4  p-6 rounded-lg `}>
        <h2 className='text-2xl text-black font-bold'>{heading}</h2>
        <p className='text-md font-bold'>{children}</p>
        <Link
          href={btnInfo.link}
          className={`${btnInfo.btnBgColor}  inline-block w-max rounded-lg  text-white p-4 hover:${btnInfo.hoverColor}`}
        >
          Browse Properties
        </Link>
      </div>
    </>
  );
};

export default InfoBox;
