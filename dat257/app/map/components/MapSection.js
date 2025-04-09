'use client';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../components/OSMap'), {
  ssr: false,
  loading: () => (
    <div style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>Loading map...</div>
  )
});

export default function MapSection() {
    return (
        <div style={{ height: '100vh', width: '100vw' }}>
        <Map />
      </div>
    );
  }