import { ArrowLeft, UserPlus, Shield, Bell, Settings, Users, Clock } from 'lucide-react';
import { useState } from 'react';
import { BottomNav } from './BottomNav';

interface GuardianControlProps {
  onBack: () => void;
  onNavigate: (page: 'home' | 'info' | 'nfc' | 'guardian' | 'settings') => void;
}

export function GuardianControl({ onBack, onNavigate }: GuardianControlProps) {
  const [guardianAccess, setGuardianAccess] = useState(true);

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
        <h1 className="text-white">Guardian Control</h1>
        <p className="text-white/90 text-sm mt-1">Manage guardians for elderly or OKU support</p>
      </div>

      <div className="px-6 mt-6">
        {/* Guardian Access Status */}
        <div className="bg-[#0060c4]/10 border border-[#0060c4]/30 rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/50 rounded-full">
              <Shield className="w-6 h-6 text-[#0060c4]" />
            </div>
            <div>
              <h2 className="text-slate-900">Guardian Access</h2>
              <p className="text-slate-700 text-sm">Enabled for emergency support</p>
            </div>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-[#0060c4]/30">
            <span className="text-slate-900">Allow guardian access</span>
            <label className="relative inline-block w-14 h-8">
              <input 
                type="checkbox" 
                checked={guardianAccess}
                onChange={(e) => setGuardianAccess(e.target.checked)}
                className="sr-only peer" 
              />
              <div className="w-14 h-8 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#0060c4]"></div>
            </label>
          </div>
        </div>

        {/* Active Guardians */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-slate-900">Active Guardians</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#0060c4] text-white rounded-full hover:bg-[#0060c4]/90 transition-colors shadow-sm">
              <UserPlus className="w-4 h-4" />
              <span className="text-sm">Add Guardian</span>
            </button>
          </div>

          <div className="space-y-3">
            {/* Guardian 1 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-[#0060c4] flex items-center justify-center flex-shrink-0">
                  <span className="text-white">SM</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-slate-900 mb-1">Sarah Miller</h4>
                      <p className="text-slate-700 text-sm">Daughter</p>
                    </div>
                    <span className="px-3 py-1 bg-[#0060c4]/20 text-[#0060c4] rounded-full text-xs">Primary</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p className="text-slate-600">+1 (555) 123-4567</p>
                    <p className="text-slate-600">sarah.miller@email.com</p>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="px-3 py-1 bg-gray-100 text-slate-800 rounded-lg text-sm hover:bg-gray-200 transition-colors border border-gray-200">
                      Edit
                    </button>
                    <button className="px-3 py-1 bg-gray-100 text-slate-800 rounded-lg text-sm hover:bg-gray-200 transition-colors border border-gray-200">
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Guardian 2 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-[#0060c4] flex items-center justify-center flex-shrink-0">
                  <span className="text-white">RD</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-slate-900 mb-1">Robert Davis</h4>
                      <p className="text-slate-700 text-sm">Son</p>
                    </div>
                    <span className="px-3 py-1 bg-gray-200 text-slate-600 rounded-full text-xs">Secondary</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p className="text-slate-600">+1 (555) 987-6543</p>
                    <p className="text-slate-600">r.davis@email.com</p>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="px-3 py-1 bg-gray-100 text-slate-800 rounded-lg text-sm hover:bg-gray-200 transition-colors border border-gray-200">
                      Edit
                    </button>
                    <button className="px-3 py-1 bg-gray-100 text-slate-800 rounded-lg text-sm hover:bg-gray-200 transition-colors border border-gray-200">
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Permissions & Settings */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="w-5 h-5 text-[#0060c4]" />
            <h3 className="text-slate-900">Guardian Permissions</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <p className="text-slate-900 mb-1">View medical information</p>
                <p className="text-slate-600 text-sm">Access to full medical records</p>
              </div>
              <label className="relative inline-block w-14 h-8">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-14 h-8 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#0060c4]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <p className="text-slate-900 mb-1">Update medication records</p>
                <p className="text-slate-600 text-sm">Allow guardians to manage medications</p>
              </div>
              <label className="relative inline-block w-14 h-8">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-14 h-8 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#0060c4]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <p className="text-slate-900 mb-1">Schedule appointments</p>
                <p className="text-slate-600 text-sm">Book medical appointments on your behalf</p>
              </div>
              <label className="relative inline-block w-14 h-8">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-14 h-8 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#0060c4]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-slate-900 mb-1">Emergency notifications</p>
                <p className="text-slate-600 text-sm">Receive alerts for medical emergencies</p>
              </div>
              <label className="relative inline-block w-14 h-8">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-14 h-8 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#0060c4]"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Activity Log */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-5 h-5 text-[#0060c4]" />
            <h3 className="text-slate-900">Recent Guardian Activity</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex gap-4 pb-3 border-b border-gray-200">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0060c4]/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-[#0060c4]" />
              </div>
              <div className="flex-1">
                <p className="text-slate-900 mb-1">Sarah Miller viewed medical records</p>
                <p className="text-slate-600 text-sm">2 hours ago</p>
              </div>
            </div>

            <div className="flex gap-4 pb-3 border-b border-gray-200">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0060c4]/20 flex items-center justify-center">
                <Bell className="w-5 h-5 text-[#0060c4]" />
              </div>
              <div className="flex-1">
                <p className="text-slate-900 mb-1">Robert Davis received medication reminder</p>
                <p className="text-slate-600 text-sm">5 hours ago</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0060c4]/20 flex items-center justify-center">
                <Settings className="w-5 h-5 text-[#0060c4]" />
              </div>
              <div className="flex-1">
                <p className="text-slate-900 mb-1">Sarah Miller updated emergency contact</p>
                <p className="text-slate-600 text-sm">Yesterday</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <BottomNav currentPage="guardian" onNavigate={onNavigate} />
    </div>
  );
}
