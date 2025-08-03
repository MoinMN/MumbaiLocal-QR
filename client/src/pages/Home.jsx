import React from 'react';
import HomeContent from '../components/HomeContent';
import ShareButton from '../components/ShareButton';

const Home = () => {
  return (
    <div className='relative bg-[url(/src/assets/bg-train.jpg)] bg-no-repeat bg-left md:bg-center bg-cover min-h-screen flex justify-center bg-fixed'>
      {/* overlay black filter */}
      <div className="absolute inset-0 bg-black/20 " />

      <HomeContent />

      <ShareButton />
    </div>
  )
}

export default Home
