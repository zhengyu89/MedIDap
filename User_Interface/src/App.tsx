import { useState } from 'react';
import { Home } from './components/Home';
import { DigitalIdInfo } from './components/DigitalIdInfo';
import { NfcCard } from './components/NfcCard';
import { GuardianControl } from './components/GuardianControl';
import { Settings } from './components/Settings';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'info' | 'nfc' | 'guardian' | 'settings'>('home');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {currentPage === 'home' && <Home onNavigate={setCurrentPage} />}
      {currentPage === 'info' && <DigitalIdInfo onBack={() => setCurrentPage('home')} onNavigate={setCurrentPage} />}
      {currentPage === 'nfc' && <NfcCard onBack={() => setCurrentPage('home')} onNavigate={setCurrentPage} />}
      {currentPage === 'guardian' && <GuardianControl onBack={() => setCurrentPage('home')} onNavigate={setCurrentPage} />}
      {currentPage === 'settings' && <Settings onBack={() => setCurrentPage('home')} onNavigate={setCurrentPage} />}
    </div>
  );
}
