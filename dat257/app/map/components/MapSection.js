'use client';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../components/OSMap'), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-full w-full">Loading map...</div>
  )
});

export default function MapSection() {
    return (
        <div className="flex-grow">
        <Map />
      </div>
    );
  }