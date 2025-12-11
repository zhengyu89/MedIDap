import { QrCode } from 'lucide-react';
import { BottomNav } from './BottomNav';
import logo from 'figma:asset/755afd5c0a6fbeb159ce86b214f9056731b2fa73.png';
import { useState } from 'react';

interface HomeProps {
  onNavigate: (page: 'home' | 'info' | 'nfc' | 'guardian' | 'settings') => void;
}

export function Home({ onNavigate }: HomeProps) {
  const [showFullscreenQR, setShowFullscreenQR] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 pb-24 relative" style={{ backgroundColor: '#0060c4' }}>
      {/* Logo/Title */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <img src={logo} alt="MedIDap Logo" className="w-16 h-16" />
          <h1 className="text-white text-4xl">MedIDap</h1>
        </div>
        <p className="text-white/90 text-lg">Your health information at your fingertips</p>
      </div>

      {/* QR Code Container */}
      <button 
        onClick={() => setShowFullscreenQR(true)}
        className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200 hover:scale-105 transition-transform active:scale-95"
      >
        <div className="w-64 h-64 bg-white flex items-center justify-center">
          {/* QR Code Placeholder - Using a simple grid pattern */}
          <svg width="256" height="256" viewBox="0 0 256 256">
            <rect width="256" height="256" fill="white"/>
            {/* QR Code pattern simulation */}
            <rect x="10" y="10" width="60" height="60" fill="black"/>
            <rect x="20" y="20" width="40" height="40" fill="white"/>
            <rect x="30" y="30" width="20" height="20" fill="black"/>
            
            <rect x="186" y="10" width="60" height="60" fill="black"/>
            <rect x="196" y="20" width="40" height="40" fill="white"/>
            <rect x="206" y="30" width="20" height="20" fill="black"/>
            
            <rect x="10" y="186" width="60" height="60" fill="black"/>
            <rect x="20" y="196" width="40" height="40" fill="white"/>
            <rect x="30" y="206" width="20" height="20" fill="black"/>
            
            {/* Random QR pattern */}
            {Array.from({ length: 15 }).map((_, i) => 
              Array.from({ length: 15 }).map((_, j) => {
                const shouldFill = (i * 17 + j * 13) % 3 === 0;
                if (shouldFill && !((i < 3 && j < 3) || (i < 3 && j > 11) || (i > 11 && j < 3))) {
                  return (
                    <rect 
                      key={`${i}-${j}`}
                      x={80 + j * 10} 
                      y={80 + i * 10} 
                      width="9" 
                      height="9" 
                      fill="black"
                    />
                  );
                }
                return null;
              })
            )}
          </svg>
        </div>
      </button>

      {/* Info Text */}
      <div className="mt-8 text-center">
        <div className="flex items-center justify-center gap-2 text-white mb-2">
          <QrCode className="w-6 h-6" />
          <span className="text-lg">Scan to view medical information</span>
        </div>
        <p className="text-white/80 text-base">ID: MED-2024-12345</p>
      </div>

      {/* Alternative NFC hint */}
      <div className="mt-6 px-6 py-3 bg-white/20 border border-white/40 rounded-full backdrop-blur-sm">
        <p className="text-white text-lg">
          Regenerate QR
        </p>
      </div>

      {/* Fullscreen QR Code Modal */}
      {showFullscreenQR && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setShowFullscreenQR(false)}
        >
          <div className="relative">
            {/* Close instruction */}
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 text-white text-center">
              <p className="text-xl mb-2">Tap anywhere to close</p>
            </div>
            
            {/* Large QR Code */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <div className="w-80 h-80 sm:w-96 sm:h-96 bg-white flex items-center justify-center">
                <svg width="100%" height="100%" viewBox="0 0 256 256">
                  <rect width="256" height="256" fill="white"/>
                  {/* QR Code pattern simulation */}
                  <rect x="10" y="10" width="60" height="60" fill="black"/>
                  <rect x="20" y="20" width="40" height="40" fill="white"/>
                  <rect x="30" y="30" width="20" height="20" fill="black"/>
                  
                  <rect x="186" y="10" width="60" height="60" fill="black"/>
                  <rect x="196" y="20" width="40" height="40" fill="white"/>
                  <rect x="206" y="30" width="20" height="20" fill="black"/>
                  
                  <rect x="10" y="186" width="60" height="60" fill="black"/>
                  <rect x="20" y="196" width="40" height="40" fill="white"/>
                  <rect x="30" y="206" width="20" height="20" fill="black"/>
                  
                  {/* Random QR pattern */}
                  {Array.from({ length: 15 }).map((_, i) => 
                    Array.from({ length: 15 }).map((_, j) => {
                      const shouldFill = (i * 17 + j * 13) % 3 === 0;
                      if (shouldFill && !((i < 3 && j < 3) || (i < 3 && j > 11) || (i > 11 && j < 3))) {
                        return (
                          <rect 
                            key={`${i}-${j}`}
                            x={80 + j * 10} 
                            y={80 + i * 10} 
                            width="9" 
                            height="9" 
                            fill="black"
                          />
                        );
                      }
                      return null;
                    })
                  )}
                </svg>
              </div>
            </div>
            
            {/* ID below QR */}
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-white text-center">
              <p className="text-lg">ID: MED-2024-12345</p>
            </div>
          </div>
        </div>
      )}

      <BottomNav currentPage="home" onNavigate={onNavigate} />
    </div>
  );
}