import Hero from '@/components/Hero';
import InfoBoxes from '@/components/InfoBoxes';
import Image from 'next/image';
import '@/app/globals.css';
import connectDB from '@/config/database';
import HomeProperties from '@/components/HomeProperties';
import WhyChooseUs from '@/components/WhyChooseUs';
connectDB();
export default function Home() {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <HomeProperties />
      <WhyChooseUs />
    </>
  );
}
