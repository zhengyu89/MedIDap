import { ArrowLeft, User, Lock, Bell, Palette, Database, HelpCircle, Info, ChevronRight, Shield, Moon, Globe, Download, Trash2, LogOut } from 'lucide-react';
import { BottomNav } from './BottomNav';
import { useState } from 'react';

interface SettingsProps {
  onBack: () => void;
  onNavigate: (page: 'home' | 'info' | 'nfc' | 'guardian' | 'settings') => void;
}

export function Settings({ onBack, onNavigate }: SettingsProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-24">
      {/* Header */}
      <div className="bg-[#0060c4] pt-12 pb-6 px-6 shadow-md">
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-white">Settings</h1>
        </div>
        <p className="text-white/90 text-sm ml-14">Manage your app preferences</p>
      </div>

      <div className="px-4 py-6 space-y-6 max-w-md mx-auto">
        {/* Account Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="text-slate-800 flex items-center gap-2">
              <User className="w-5 h-5 text-[#0060c4]" />
              Account
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            <button className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0060c4] flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-slate-800">Ahmad Ibrahim</p>
                  <p className="text-slate-500 text-xs">Edit Profile</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
            <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <span className="text-slate-700">Medical Information</span>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
            <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <span className="text-slate-700">Emergency Contacts</span>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Privacy & Security Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="text-slate-800 flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#0060c4]" />
              Privacy & Security
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            <div className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-slate-500" />
                <span className="text-slate-700">Biometric Lock</span>
              </div>
              <button
                onClick={() => setBiometricEnabled(!biometricEnabled)}
                className={`w-12 h-7 rounded-full transition-colors relative ${
                  biometricEnabled ? 'bg-[#0060c4]' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform ${
                    biometricEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-slate-500" />
                <span className="text-slate-700">Change PIN</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
            <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <span className="text-slate-700">Privacy Policy</span>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="text-slate-800 flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#0060c4]" />
              Notifications
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            <div className="px-4 py-3 flex items-center justify-between">
              <span className="text-slate-700">Push Notifications</span>
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`w-12 h-7 rounded-full transition-colors relative ${
                  notificationsEnabled ? 'bg-[#0060c4]' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform ${
                    notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <span className="text-slate-700">Medication Reminders</span>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
            <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <span className="text-slate-700">Appointment Alerts</span>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Appearance Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="text-slate-800 flex items-center gap-2">
              <Palette className="w-5 h-5 text-[#0060c4]" />
              Appearance
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            <div className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-slate-500" />
                <span className="text-slate-700">Dark Mode</span>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-12 h-7 rounded-full transition-colors relative ${
                  darkMode ? 'bg-[#0060c4]' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform ${
                    darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-slate-500" />
                <span className="text-slate-700">Language</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 text-sm">English</span>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>
            </button>
          </div>
        </div>

        {/* Data Management Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="text-slate-800 flex items-center gap-2">
              <Database className="w-5 h-5 text-[#0060c4]" />
              Data Management
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5 text-slate-500" />
                <span className="text-slate-700">Export Data</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
            <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Database className="w-5 h-5 text-slate-500" />
                <span className="text-slate-700">Backup & Sync</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
            <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-red-50 transition-colors group">
              <div className="flex items-center gap-3">
                <Trash2 className="w-5 h-5 text-red-500" />
                <span className="text-red-600">Clear Cache</span>
              </div>
              <ChevronRight className="w-5 h-5 text-red-400" />
            </button>
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="text-slate-800 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#0060c4]" />
              Help & Support
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <span className="text-slate-700">Help Center</span>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
            <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <span className="text-slate-700">Contact Support</span>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
            <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <span className="text-slate-700">Report a Problem</span>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="text-slate-800 flex items-center gap-2">
              <Info className="w-5 h-5 text-[#0060c4]" />
              About
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <span className="text-slate-700">Terms of Service</span>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
            <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <span className="text-slate-700">Licenses</span>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
            <div className="px-4 py-3">
              <p className="text-slate-500 text-sm">Version 1.0.0</p>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button className="w-full bg-white border-2 border-red-200 text-red-600 py-4 rounded-2xl hover:bg-red-50 transition-colors flex items-center justify-center gap-2 shadow-sm">
          <LogOut className="w-5 h-5" />
          <span>Log Out</span>
        </button>
      </div>

      <BottomNav currentPage="settings" onNavigate={onNavigate} />
    </div>
  );
}
