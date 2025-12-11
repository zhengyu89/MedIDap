import { QrCode, User, CreditCard, Settings, Shield } from 'lucide-react';

interface BottomNavProps {
  currentPage: 'home' | 'info' | 'nfc' | 'guardian' | 'settings';
  onNavigate: (page: 'home' | 'info' | 'nfc' | 'guardian' | 'settings') => void;
}

export function BottomNav({ currentPage, onNavigate }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-10">
      <div className="flex items-end justify-around px-2 py-3 max-w-md mx-auto relative">
        <button
          onClick={() => onNavigate('info')}
          className={`flex flex-col items-center gap-1 px-2 py-2 transition-colors ${
            currentPage === 'info' ? 'text-[#0060c4]' : 'text-slate-600 hover:text-[#0060c4]'
          }`}
        >
          <User className="w-6 h-6" />
          <span className="text-xs">Profile</span>
        </button>
        
        <button
          onClick={() => onNavigate('nfc')}
          className={`flex flex-col items-center gap-1 px-2 py-2 transition-colors ${
            currentPage === 'nfc' ? 'text-[#0060c4]' : 'text-slate-600 hover:text-[#0060c4]'
          }`}
        >
          <CreditCard className="w-6 h-6" />
          <span className="text-xs">NFC Card</span>
        </button>
        
        {/* Center Home Button - Featured */}
        <button
          onClick={() => onNavigate('home')}
          className="flex flex-col items-center gap-2 -mt-8"
        >
          <div className="w-16 h-16 rounded-full bg-[#0060c4] flex items-center justify-center shadow-lg border-4 border-white">
            <QrCode className="w-8 h-8 text-white" />
          </div>
          <span className="text-xs text-slate-600">Home</span>
        </button>
        
        <button
          onClick={() => onNavigate('guardian')}
          className={`flex flex-col items-center gap-1 px-2 py-2 transition-colors ${
            currentPage === 'guardian' ? 'text-[#0060c4]' : 'text-slate-600 hover:text-[#0060c4]'
          }`}
        >
          <Shield className="w-6 h-6" />
          <span className="text-xs">Guardian</span>
        </button>
        
        <button
          onClick={() => onNavigate('settings')}
          className={`flex flex-col items-center gap-1 px-2 py-2 transition-colors ${
            currentPage === 'settings' ? 'text-[#0060c4]' : 'text-slate-600 hover:text-[#0060c4]'
          }`}
        >
          <Settings className="w-6 h-6" />
          <span className="text-xs">Settings</span>
        </button>
      </div>
    </div>
  );
}
