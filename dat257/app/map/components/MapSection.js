'use client';
import dynamic from 'next/dynamic';

/* This code snippet is using dynamic imports in Next.js to load the `OSMap` component asynchronously.
The `dynamic` function is used to dynamically import the `OSMap` component from the specified path
(`'../components/OSMap'`). */
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