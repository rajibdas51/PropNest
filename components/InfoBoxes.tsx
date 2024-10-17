import Link from 'next/link';
import React from 'react';
import InfoBox from './InfoBox';

const InfoBoxes = () => {
  return (
    <>
      <section>
        <div className='container-xl lg:container m-auto'>
          <div className='grid grid-col1 md:grid-cols-2 gap-6 p-4 '>
            <InfoBox
              heading='For Renters'
              bgColor='bg-gray-100'
              txtColor='text-gray-800'
              btnInfo={{
                text: 'Browse Properties',
                link: '/properties',
                btnBgColor: 'bg-black',
                hoverColor: 'bg-gray-800',
              }}
            >
              Find your dream rental property. Bookmark properties and contact
              owners.
            </InfoBox>
            <InfoBox
              heading='For Property Owners'
              bgColor='bg-indigo-100'
              txtColor='text-gray-800'
              btnInfo={{
                text: 'Add Property',
                link: '/properties/add',
                btnBgColor: 'bg-indigo-900',
                hoverColor: 'bg-indigo-700',
              }}
            >
              {' '}
              List your properties and reach potential tenants. Rent as an
              airbnb or long term.
            </InfoBox>
          </div>
        </div>
      </section>
    </>
  );
};

export default InfoBoxes;
