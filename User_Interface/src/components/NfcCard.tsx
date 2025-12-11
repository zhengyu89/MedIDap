import { ArrowLeft, Wifi, CreditCard, Snowflake, FileText, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useState } from 'react';
import { BottomNav } from './BottomNav';

interface NfcCardProps {
  onBack: () => void;
  onNavigate: (page: 'home' | 'info' | 'nfc' | 'guardian' | 'settings') => void;
}

export function NfcCard({ onBack, onNavigate }: NfcCardProps) {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [isCardFrozen, setIsCardFrozen] = useState(false);

  const accessLogs = [
    { id: 1, location: 'Kuala Lumpur General Hospital', action: 'Medical ID Accessed', time: 'Dec 8, 2025 10:30 AM', status: 'success' },
    { id: 2, location: 'Subang Jaya Medical Centre', action: 'Emergency Access', time: 'Dec 5, 2025 3:45 PM', status: 'success' },
    { id: 3, location: 'Pantai Hospital Bangsar', action: 'Medical ID Accessed', time: 'Nov 28, 2025 2:15 PM', status: 'success' },
    { id: 4, location: 'Prince Court Medical Centre', action: 'Medical ID Accessed', time: 'Nov 20, 2025 9:00 AM', status: 'success' },
    { id: 5, location: 'Unknown Location', action: 'Failed Access Attempt', time: 'Nov 15, 2025 11:30 PM', status: 'failed' },
  ];

  const handleFreezeCard = () => {
    setIsCardFrozen(!isCardFrozen);
    setSelectedAction('freeze');
  };

  return (
    <div className="min-h-screen pb-24 bg-gray-50">
      {/* Header */}
      <div className="bg-[#0060c4] px-6 py-6 sticky top-0 z-10">
        <button 
          onClick={onBack}
          className="mb-4 p-2 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <h1 className="text-white">NFC Card</h1>
        <p className="text-white/90 text-sm mt-1">Tap your NFC card to access medical ID</p>
      </div>

      <div className="px-6 mt-8">
        {/* NFC Card Visual */}
        <div className="mb-8">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: '1.586' }}>
            {/* Blank card for user to insert image */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 flex items-center justify-center">
              <div className="text-center">
                <CreditCard className="w-16 h-16 text-slate-500/40 mx-auto mb-4" />
                <p className="text-slate-600">Insert your card design here</p>
              </div>
            </div>
            
            {/* Frozen Overlay */}
            {isCardFrozen && (
              <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-sm flex items-center justify-center z-10">
                <div className="text-center">
                  <Snowflake className="w-16 h-16 text-white mx-auto mb-3" />
                  <p className="text-white">Card Frozen</p>
                </div>
              </div>
            )}
            
            {/* Card Elements Overlay */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              {/* Top Section */}
              <div className="flex justify-between items-start">
                <div className="text-slate-800">
                  <p className="text-xs mb-1">Medical NFC</p>
                </div>
                <Wifi className="w-8 h-8 text-slate-700 rotate-90" />
              </div>

              {/* Bottom Section */}
              <div>
                <div className="bg-white/40 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
                  <p className="text-slate-900 text-sm">Medical Digital ID</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Actions */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button 
            onClick={handleFreezeCard}
            className={`flex flex-col items-center gap-3 p-6 rounded-2xl transition-all ${
              selectedAction === 'freeze' 
                ? 'bg-[#0060c4] text-white shadow-lg' 
                : 'bg-white text-slate-800 hover:bg-gray-50 border border-gray-200 shadow-sm'
            }`}
          >
            <div className={`p-3 rounded-full ${
              selectedAction === 'freeze' ? 'bg-white/30' : 'bg-[#0060c4]/20'
            }`}>
              <Snowflake className={`w-6 h-6 ${selectedAction === 'freeze' ? 'text-white' : 'text-[#0060c4]'}`} />
            </div>
            <span className="text-sm">{isCardFrozen ? 'Unfreeze card' : 'Freeze card'}</span>
          </button>

          <button 
            onClick={() => setSelectedAction(selectedAction === 'access' ? null : 'access')}
            className={`flex flex-col items-center gap-3 p-6 rounded-2xl transition-all ${
              selectedAction === 'access' 
                ? 'bg-[#0060c4] text-white shadow-lg' 
                : 'bg-white text-slate-800 hover:bg-gray-50 border border-gray-200 shadow-sm'
            }`}
          >
            <div className={`p-3 rounded-full ${
              selectedAction === 'access' ? 'bg-white/30' : 'bg-[#0060c4]/20'
            }`}>
              <FileText className={`w-6 h-6 ${selectedAction === 'access' ? 'text-white' : 'text-[#0060c4]'}`} />
            </div>
            <span className="text-sm">Access log</span>
          </button>
        </div>

        {/* Freeze Card Status */}
        {selectedAction === 'freeze' && (
          <div className={`border rounded-2xl p-6 mb-6 shadow-sm ${
            isCardFrozen ? 'bg-blue-50 border-blue-200' : 'bg-green-50 border-green-200'
          }`}>
            <div className="flex items-start gap-3 mb-3">
              {isCardFrozen ? (
                <Snowflake className="w-6 h-6 text-blue-600 flex-shrink-0" />
              ) : (
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
              )}
              <div>
                <h3 className={`${isCardFrozen ? 'text-blue-900' : 'text-green-900'} mb-2`}>
                  {isCardFrozen ? 'Card is Frozen' : 'Card is Active'}
                </h3>
                <p className={`text-sm ${isCardFrozen ? 'text-blue-700' : 'text-green-700'}`}>
                  {isCardFrozen 
                    ? 'Your NFC card has been temporarily frozen. No one can access your medical ID until you unfreeze it.'
                    : 'Your NFC card is active and can be used to share your medical ID with healthcare providers.'
                  }
                </p>
              </div>
            </div>
            {isCardFrozen && (
              <button 
                onClick={handleFreezeCard}
                className="w-full mt-4 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors"
              >
                Unfreeze Card Now
              </button>
            )}
          </div>
        )}

        {/* Access Log Content */}
        {selectedAction === 'access' && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
            <h3 className="text-slate-900 mb-4">Recent Access History</h3>
            <p className="text-slate-600 text-sm mb-4">View when and where your medical ID was accessed</p>
            
            <div className="space-y-3">
              {accessLogs.map((log) => (
                <div key={log.id} className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg flex-shrink-0 ${
                      log.status === 'success' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {log.status === 'success' ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <p className="text-slate-900">{log.action}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          log.status === 'success' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {log.status}
                        </span>
                      </div>
                      <p className="text-slate-700 text-sm mb-1">{log.location}</p>
                      <div className="flex items-center gap-1 text-slate-500 text-xs">
                        <Clock className="w-3 h-3" />
                        <span>{log.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 text-[#0060c4] py-3 rounded-xl hover:bg-gray-50 transition-colors border border-gray-200">
              View Full History
            </button>
          </div>
        )}

        {/* Manage Card Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
          <h2 className="text-slate-900 mb-4">Manage card</h2>
          
          {/* NFC Status Toggle */}
          <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div>
              <p className="text-slate-900 mb-1">NFC enabled</p>
              <p className="text-slate-600 text-sm">Allow NFC tap to share medical ID</p>
            </div>
            <label className="relative inline-block w-14 h-8">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-14 h-8 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#0060c4]"></div>
            </label>
          </div>

          {/* Card Info */}
          <div className="pt-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Card ID</span>
              <span className="text-slate-900">NFC-MED-2024-789</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Status</span>
              <span className={isCardFrozen ? 'text-blue-600' : 'text-[#0060c4]'}>
                {isCardFrozen ? 'Frozen' : 'Active'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Registered</span>
              <span className="text-slate-900">Jan 15, 2024</span>
            </div>
          </div>
        </div>

        {/* How to Use */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-slate-900 mb-4">How to use NFC card</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0060c4]/20 flex items-center justify-center">
                <span className="text-[#0060c4]">1</span>
              </div>
              <div>
                <p className="text-slate-900 mb-1">Enable NFC on your device</p>
                <p className="text-slate-600 text-sm">Make sure NFC is turned on in your phone settings</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0060c4]/20 flex items-center justify-center">
                <span className="text-[#0060c4]">2</span>
              </div>
              <div>
                <p className="text-slate-900 mb-1">Tap your card</p>
                <p className="text-slate-600 text-sm">Hold your NFC card near the back of the phone</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0060c4]/20 flex items-center justify-center">
                <span className="text-[#0060c4]">3</span>
              </div>
              <div>
                <p className="text-slate-900 mb-1">View medical information</p>
                <p className="text-slate-600 text-sm">Your medical ID will be displayed instantly</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <BottomNav currentPage="nfc" onNavigate={onNavigate} />
    </div>
  );
}
