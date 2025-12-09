import React, { useState } from 'react';
import { LayoutDashboard, Users, ScanLine, Settings, Bell, Search, Menu, QrCode, Smartphone } from 'lucide-react';
import { PatientRecord } from './components/PatientRecord';
import { OCRProcessor } from './components/OCRProcessor';
import { AppView, MedicalRecord, PatientProfile } from './types';

// Mock Initial Data
const INITIAL_PATIENT: PatientProfile = {
  name: "John Doe",
  age: 45,
  id: "MED-2024-12345",
  bloodType: "O+",
  allergies: ["Penicillin", "Peanuts", "Latex"],
  chronicDiseases: [
    { name: "Type 2 Diabetes", since: "2020" },
    { name: "Hypertension", since: "2018" }
  ],
  medications: [
    { name: "Metformin", dosage: "500mg", frequency: "Twice daily" },
    { name: "Lisinopril", dosage: "10mg", frequency: "Daily" },
    { name: "Aspirin", dosage: "81mg", frequency: "Daily" }
  ]
};

const INITIAL_HISTORY: MedicalRecord[] = [
    {
      id: 1,
      hospital: 'Kuala Lumpur General Hospital',
      location: 'Kuala Lumpur',
      date: 'Dec 1, 2025',
      doctor: 'Dr. Sarah Ahmad',
      specialty: 'Endocrinology',
      tests: [
        { name: 'HbA1c', result: '6.5%', range: '4.0-5.6%', status: 'elevated' },
        { name: 'Fasting Glucose', result: '110 mg/dL', range: '70-100 mg/dL', status: 'elevated' },
        { name: 'Total Cholesterol', result: '185 mg/dL', range: '<200 mg/dL', status: 'normal' },
        { name: 'HDL Cholesterol', result: '55 mg/dL', range: '>40 mg/dL', status: 'normal' },
        { name: 'LDL Cholesterol', result: '105 mg/dL', range: '<100 mg/dL', status: 'elevated' },
      ],
      diagnosis: 'Type 2 Diabetes - controlled',
      notes: 'Continue current medication. Schedule follow-up in 3 months.'
    },
    {
      id: 2,
      hospital: 'Subang Jaya Medical Centre',
      location: 'Selangor',
      date: 'Oct 15, 2025',
      doctor: 'Dr. Michael Tan',
      specialty: 'Cardiology',
      tests: [
        { name: 'Blood Pressure', result: '128/82 mmHg', range: '<120/80 mmHg', status: 'elevated' },
        { name: 'ECG', result: 'Normal sinus rhythm', range: 'Normal', status: 'normal' },
        { name: 'Troponin', result: '<0.01 ng/mL', range: '<0.04 ng/mL', status: 'normal' },
        { name: 'BNP', result: '45 pg/mL', range: '<100 pg/mL', status: 'normal' },
      ],
      diagnosis: 'Hypertension - Stage 1',
      notes: 'Blood pressure slightly elevated. Medication dosage adjusted.'
    }
];

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [patientHistory, setPatientHistory] = useState<MedicalRecord[]>(INITIAL_HISTORY);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showNFCPopup, setShowNFCPopup] = useState(false);

  const handleOCRComplete = (newRecord: MedicalRecord) => {
    setPatientHistory([newRecord, ...patientHistory]);
    setCurrentView(AppView.PATIENT_VIEW);
  };

  const simulateNFCScan = () => {
    setShowNFCPopup(true);
    setTimeout(() => {
        setShowNFCPopup(false);
        setCurrentView(AppView.PATIENT_VIEW);
    }, 2000);
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans text-slate-900">
      
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-[#0060c4] text-white transition-all duration-300 flex flex-col shadow-xl z-30`}>
        <div className="p-6 flex items-center gap-3">
          <img 
            src="/MedIDap/assets/image/Medidap_logo.png" 
            alt="MedIDap Logo" 
            className="w-8 h-8 rounded-lg object-cover"
          />
          {isSidebarOpen && <span className="text-xl font-bold tracking-tight">MedIDap</span>}
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <button 
            onClick={() => setCurrentView(AppView.DASHBOARD)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${currentView === AppView.DASHBOARD ? 'bg-white/20 shadow-inner' : 'hover:bg-white/10'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            {isSidebarOpen && <span>Dashboard</span>}
          </button>
          
          <button 
            onClick={() => setCurrentView(AppView.PATIENT_VIEW)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${currentView === AppView.PATIENT_VIEW ? 'bg-white/20 shadow-inner' : 'hover:bg-white/10'}`}
          >
            <Users className="w-5 h-5" />
            {isSidebarOpen && <span>Patient Records</span>}
          </button>

          <button 
            onClick={() => setCurrentView(AppView.OCR_SCAN)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${currentView === AppView.OCR_SCAN ? 'bg-white/20 shadow-inner' : 'hover:bg-white/10'}`}
          >
            <ScanLine className="w-5 h-5" />
            {isSidebarOpen && <span>OCR & AI Import</span>}
          </button>
        </nav>

        <div className="p-4">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-blue-100 hover:text-white hover:bg-white/10 rounded-xl transition-all">
                <Settings className="w-5 h-5" />
                {isSidebarOpen && <span>Settings</span>}
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 shadow-sm z-20">
             <div className="flex items-center gap-4">
                 <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg text-slate-500">
                     <Menu className="w-5 h-5" />
                 </button>
                 <div className="relative hidden md:block">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                     <input type="text" placeholder="Search patients, doctors..." className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0060c4] focus:outline-none w-64 text-sm transition-all" />
                 </div>
             </div>

             <div className="flex items-center gap-4">
                 {/* Quick Actions */}
                 <div className="flex items-center gap-2">
                     <button onClick={simulateNFCScan} className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-full hover:bg-slate-800 transition-colors shadow-sm">
                         <Smartphone className="w-3 h-3" />
                         NFC TAP
                     </button>
                     <button onClick={() => setCurrentView(AppView.OCR_SCAN)} className="flex items-center gap-2 px-3 py-1.5 bg-[#0060c4] text-white text-xs font-bold rounded-full hover:bg-blue-700 transition-colors shadow-sm">
                         <QrCode className="w-3 h-3" />
                         SCAN QR
                     </button>
                 </div>
                 
                 <div className="h-6 w-px bg-gray-300 mx-2"></div>
                 
                 <button className="relative p-2 text-slate-500 hover:bg-gray-100 rounded-full">
                     <Bell className="w-5 h-5" />
                     <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                 </button>
                 <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold border border-slate-300">
                     DR
                 </div>
             </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-hidden relative">
            
            {/* Dashboard View */}
            {currentView === AppView.DASHBOARD && (
                <div className="p-8 h-full overflow-y-auto">
                    <div className="max-w-6xl mx-auto">
                        <h1 className="text-2xl font-bold text-slate-900 mb-6">Hospital Dashboard</h1>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-gradient-to-br from-[#0060c4] to-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-200">
                                <h3 className="text-blue-100 text-sm font-medium mb-1">Today's Patients</h3>
                                <p className="text-4xl font-bold mb-4">124</p>
                                <div className="text-sm bg-white/20 w-fit px-2 py-1 rounded">+12% from yesterday</div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-slate-500 text-sm font-medium mb-1">Pending Lab Results</h3>
                                <p className="text-4xl font-bold text-slate-900 mb-4">28</p>
                                <div className="text-sm text-orange-500 bg-orange-50 w-fit px-2 py-1 rounded">Action required</div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-slate-500 text-sm font-medium mb-1">AI Processed Docs</h3>
                                <p className="text-4xl font-bold text-slate-900 mb-4">856</p>
                                <div className="text-sm text-green-600 bg-green-50 w-fit px-2 py-1 rounded">99.8% Accuracy</div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                             <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                                 <h2 className="font-bold text-slate-800">Recent Patient Activity</h2>
                                 <button onClick={() => setCurrentView(AppView.PATIENT_VIEW)} className="text-[#0060c4] text-sm hover:underline">View All</button>
                             </div>
                             <div className="p-6">
                                 <div className="space-y-4">
                                     <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100" onClick={() => setCurrentView(AppView.PATIENT_VIEW)}>
                                         <div className="flex items-center gap-4">
                                             <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold">JD</div>
                                             <div>
                                                 <p className="font-bold text-slate-900">John Doe</p>
                                                 <p className="text-sm text-slate-500">Check-up • 10 mins ago</p>
                                             </div>
                                         </div>
                                         <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Admitted</span>
                                     </div>
                                     <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl opacity-60">
                                         <div className="flex items-center gap-4">
                                             <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold">AS</div>
                                             <div>
                                                 <p className="font-bold text-slate-900">Alice Smith</p>
                                                 <p className="text-sm text-slate-500">Lab Result • 45 mins ago</p>
                                             </div>
                                         </div>
                                         <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-bold">Discharged</span>
                                     </div>
                                 </div>
                             </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Patient View */}
            {currentView === AppView.PATIENT_VIEW && (
                <PatientRecord 
                    patient={INITIAL_PATIENT} 
                    history={patientHistory} 
                    onBack={() => setCurrentView(AppView.DASHBOARD)} 
                />
            )}

            {/* OCR View */}
            {currentView === AppView.OCR_SCAN && (
                <OCRProcessor 
                    onProcessingComplete={handleOCRComplete} 
                    onCancel={() => setCurrentView(AppView.DASHBOARD)} 
                />
            )}

            {/* NFC Overlay */}
            {showNFCPopup && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-3xl flex flex-col items-center animate-bounce-in shadow-2xl">
                        <div className="w-20 h-20 bg-[#0060c4] rounded-full flex items-center justify-center mb-6 animate-pulse">
                            <Smartphone className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Reading NFC Tag...</h2>
                        <p className="text-slate-500">Please hold the patient's device near the reader.</p>
                    </div>
                </div>
            )}

        </main>
      </div>
    </div>
  );
}