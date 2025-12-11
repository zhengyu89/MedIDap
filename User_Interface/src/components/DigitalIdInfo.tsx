import { ArrowLeft, Droplet, AlertCircle, Heart, Pill, FileText, Activity, Building2, Calendar, ChevronDown, ChevronUp, Search, Filter, X, Paperclip } from 'lucide-react';
import { BottomNav } from './BottomNav';
import { useState, useMemo } from 'react';

interface DigitalIdInfoProps {
  onBack: () => void;
  onNavigate: (page: 'home' | 'info' | 'nfc' | 'guardian' | 'settings') => void;
}

export function DigitalIdInfo({ onBack, onNavigate }: DigitalIdInfoProps) {
  const [expandedHospital, setExpandedHospital] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const diagnosticHistory = [
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
      notes: 'Continue current medication. Schedule follow-up in 3 months.',
      followUpDate: 'Mar 1, 2026',
      attachments: []
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
      notes: 'Blood pressure slightly elevated. Medication dosage adjusted.',
      followUpDate: 'Jan 15, 2026',
      attachments: [
        { name: 'ECG_Report.pdf', size: '245 KB', date: 'Oct 15, 2025' }
      ]
    },
    {
      id: 3,
      hospital: 'Prince Court Medical Centre',
      location: 'Kuala Lumpur',
      date: 'Aug 22, 2025',
      doctor: 'Dr. Lisa Wong',
      specialty: 'Internal Medicine',
      tests: [
        { name: 'Complete Blood Count', result: 'Normal', range: 'Normal', status: 'normal' },
        { name: 'Liver Function', result: 'Within limits', range: 'Normal', status: 'normal' },
        { name: 'Kidney Function (eGFR)', result: '88 mL/min', range: '>60 mL/min', status: 'normal' },
        { name: 'TSH', result: '2.1 mIU/L', range: '0.4-4.0 mIU/L', status: 'normal' },
      ],
      diagnosis: 'Annual health screening - Good',
      notes: 'Overall health status is good. Continue healthy lifestyle.',
      followUpDate: 'Aug 22, 2026',
      attachments: [
        { name: 'Lab_Results.pdf', size: '512 KB', date: 'Aug 22, 2025' },
        { name: 'Health_Summary.pdf', size: '128 KB', date: 'Aug 22, 2025' }
      ]
    },
    {
      id: 4,
      hospital: 'Pantai Hospital Bangsar',
      location: 'Kuala Lumpur',
      date: 'Jun 10, 2025',
      doctor: 'Dr. Amirah Hassan',
      specialty: 'General Practice',
      tests: [
        { name: 'HbA1c', result: '7.2%', range: '4.0-5.6%', status: 'elevated' },
        { name: 'Vitamin D', result: '18 ng/mL', range: '30-100 ng/mL', status: 'low' },
        { name: 'Vitamin B12', result: '320 pg/mL', range: '200-900 pg/mL', status: 'normal' },
      ],
      diagnosis: 'Vitamin D deficiency',
      notes: 'Started Vitamin D supplementation. Improved diabetes control recommended.',
      followUpDate: 'Sep 10, 2025',
      attachments: [
        { name: 'Blood_Test_Report.pdf', size: '328 KB', date: 'Jun 10, 2025' }
      ]
    }
  ];

  // Get unique values for filters
  const specialties = useMemo(() => {
    const unique = Array.from(new Set(diagnosticHistory.map(record => record.specialty)));
    return unique;
  }, []);

  const locations = useMemo(() => {
    const unique = Array.from(new Set(diagnosticHistory.map(record => record.location)));
    return unique;
  }, []);

  // Filter and search logic
  const filteredHistory = useMemo(() => {
    return diagnosticHistory.filter(record => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        record.hospital.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.tests.some(test => test.name.toLowerCase().includes(searchQuery.toLowerCase()));

      // Specialty filter
      const matchesSpecialty = selectedSpecialty === 'all' || record.specialty === selectedSpecialty;

      // Location filter
      const matchesLocation = selectedLocation === 'all' || record.location === selectedLocation;

      // Status filter (checking if any test has the selected status)
      const matchesStatus = selectedStatus === 'all' || 
        record.tests.some(test => test.status === selectedStatus);

      return matchesSearch && matchesSpecialty && matchesLocation && matchesStatus;
    });
  }, [searchQuery, selectedSpecialty, selectedLocation, selectedStatus]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSpecialty('all');
    setSelectedLocation('all');
    setSelectedStatus('all');
  };

  const activeFiltersCount = [selectedSpecialty, selectedLocation, selectedStatus].filter(f => f !== 'all').length;

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
        <h1 className="text-white">Digital ID Information</h1>
      </div>

      <div className="px-6 mt-6">
        {/* User Profile Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-24 h-24 rounded-full bg-[#0060c4] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-3xl">JD</span>
            </div>
            <div className="flex-1">
              <h2 className="text-slate-900 mb-1">John Doe</h2>
              <p className="text-slate-700 text-sm mb-1">Age: 45 years</p>
              <p className="text-slate-500 text-sm">ID: MED-2024-12345</p>
            </div>
          </div>
        </div>

        {/* Blood Type */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-[#0060c4]/20 rounded-lg">
              <Droplet className="w-5 h-5 text-[#0060c4]" />
            </div>
            <h3 className="text-slate-900">Blood Type</h3>
          </div>
          <div className="pl-11">
            <p className="text-slate-800">O+</p>
          </div>
        </div>

        {/* Allergies */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-[#0060c4]/20 rounded-lg">
              <AlertCircle className="w-5 h-5 text-[#0060c4]" />
            </div>
            <h3 className="text-slate-900">Allergies</h3>
          </div>
          <div className="pl-11 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#0060c4]"></div>
              <p className="text-slate-700">Penicillin</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#0060c4]"></div>
              <p className="text-slate-700">Peanuts</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#0060c4]"></div>
              <p className="text-slate-700">Latex</p>
            </div>
          </div>
        </div>

        {/* Chronic Diseases */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-[#0060c4]/20 rounded-lg">
              <Heart className="w-5 h-5 text-[#0060c4]" />
            </div>
            <h3 className="text-slate-900">Chronic Diseases</h3>
          </div>
          <div className="pl-11 space-y-3">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <p className="text-slate-800 mb-1">Type 2 Diabetes</p>
              <p className="text-slate-500 text-sm">Diagnosed: 2020</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <p className="text-slate-800 mb-1">Hypertension</p>
              <p className="text-slate-500 text-sm">Diagnosed: 2018</p>
            </div>
          </div>
        </div>

        {/* Current Medication */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-[#0060c4]/20 rounded-lg">
              <Pill className="w-5 h-5 text-[#0060c4]" />
            </div>
            <h3 className="text-slate-900">Current Medication</h3>
          </div>
          <div className="pl-11 space-y-3">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <div className="flex justify-between items-start mb-1">
                <p className="text-slate-900">Metformin</p>
                <span className="text-[#0060c4]">500mg</span>
              </div>
              <p className="text-slate-600 text-sm">Twice daily with meals</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <div className="flex justify-between items-start mb-1">
                <p className="text-slate-900">Lisinopril</p>
                <span className="text-[#0060c4]">10mg</span>
              </div>
              <p className="text-slate-600 text-sm">Once daily in the morning</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <div className="flex justify-between items-start mb-1">
                <p className="text-slate-900">Aspirin</p>
                <span className="text-[#0060c4]">81mg</span>
              </div>
              <p className="text-slate-600 text-sm">Once daily</p>
            </div>
          </div>
        </div>

        {/* Diagnostic Result History */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#0060c4]/20 rounded-lg">
              <Activity className="w-5 h-5 text-[#0060c4]" />
            </div>
            <h3 className="text-slate-900">Diagnostic Result History</h3>
          </div>
          
          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by hospital, doctor, test, or diagnosis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0060c4] focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              )}
            </div>
          </div>

          {/* Filter Button */}
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors ${
                showFilters || activeFiltersCount > 0
                  ? 'bg-[#0060c4] text-white border-[#0060c4]'
                  : 'bg-white text-slate-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="bg-white text-[#0060c4] px-2 py-0.5 rounded-full text-xs">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-slate-600 hover:text-slate-900 underline"
              >
                Clear all
              </button>
            )}

            <div className="flex-1 text-right">
              <span className="text-sm text-slate-500">
                {filteredHistory.length} {filteredHistory.length === 1 ? 'result' : 'results'}
              </span>
            </div>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mb-4 p-4 bg-gray-50 rounded-xl space-y-4">
              {/* Specialty Filter */}
              <div>
                <label className="block text-sm text-slate-700 mb-2">Specialty</label>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0060c4] focus:border-transparent"
                >
                  <option value="all">All Specialties</option>
                  {specialties.map(specialty => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm text-slate-700 mb-2">Location</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0060c4] focus:border-transparent"
                >
                  <option value="all">All Locations</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm text-slate-700 mb-2">Test Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0060c4] focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="normal">Normal</option>
                  <option value="elevated">Elevated</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
          )}

          {/* Results */}
          {filteredHistory.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">No results found</p>
              <p className="text-sm text-slate-400 mt-1">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredHistory.map((record) => (
                <div key={record.id} className="border border-gray-200 rounded-xl overflow-hidden">
                  {/* Hospital Header - Clickable */}
                  <button
                    onClick={() => setExpandedHospital(expandedHospital === record.id ? null : record.id)}
                    className="w-full bg-[#0060c4]/10 p-4 hover:bg-[#0060c4]/20 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-[#0060c4]/30 rounded-lg flex-shrink-0">
                        <Building2 className="w-5 h-5 text-[#0060c4]" />
                      </div>
                      <div className="flex-1 text-left">
                        <h4 className="text-slate-900 mb-1">{record.hospital}</h4>
                        <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                          <Calendar className="w-4 h-4" />
                          <span>{record.date}</span>
                          <span className="text-slate-400">•</span>
                          <span>{record.location}</span>
                        </div>
                        <p className="text-sm text-slate-700">
                          {record.doctor} - {record.specialty}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        {expandedHospital === record.id ? (
                          <ChevronUp className="w-5 h-5 text-slate-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-500" />
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Expanded Content */}
                  {expandedHospital === record.id && (
                    <div className="p-4 border-t border-gray-200 bg-white">
                      {/* Diagnosis */}
                      <div className="mb-4 bg-[#0060c4]/5 rounded-lg p-3">
                        <p className="text-sm text-slate-600 mb-1">Diagnosis</p>
                        <p className="text-slate-900">{record.diagnosis}</p>
                      </div>

                      {/* Test Results */}
                      <div className="mb-4">
                        <p className="text-sm text-slate-600 mb-3">Test Results</p>
                        <div className="space-y-2">
                          {record.tests.map((test, idx) => (
                            <div key={idx} className="bg-gray-50 rounded-lg p-3">
                              <div className="flex justify-between items-start mb-1">
                                <p className="text-slate-900">{test.name}</p>
                                <div className="flex items-center gap-2">
                                  <span className={`text-sm px-2 py-0.5 rounded-full ${
                                    test.status === 'normal' 
                                      ? 'bg-green-100 text-green-700' 
                                      : test.status === 'elevated' 
                                      ? 'bg-orange-100 text-orange-700'
                                      : 'bg-red-100 text-red-700'
                                  }`}>
                                    {test.status}
                                  </span>
                                </div>
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-700">{test.result}</span>
                                <span className="text-slate-500">Range: {test.range}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Doctor's Notes */}
                      <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-4">
                        <div className="flex items-start gap-2">
                          <FileText className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm text-blue-900 mb-1">Doctor&apos;s Notes</p>
                            <p className="text-sm text-blue-700">{record.notes}</p>
                          </div>
                        </div>
                      </div>

                      {/* Attachments */}
                      <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-3 mb-4">
                        <div className="flex items-start gap-2">
                          <Paperclip className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm text-yellow-900 mb-1">Attachments</p>
                            {record.attachments.length === 0 ? (
                              <p className="text-sm text-yellow-700">None</p>
                            ) : (
                              <div className="space-y-2">
                                {record.attachments.map((attachment, idx) => (
                                  <button
                                    key={idx}
                                    className="flex items-center gap-2 text-left w-full hover:bg-yellow-100 rounded p-2 -mx-2 transition-colors"
                                  >
                                    <FileText className="w-4 h-4 text-yellow-700 flex-shrink-0" />
                                    <div className="flex-1">
                                      <p className="text-sm text-yellow-900">{attachment.name}</p>
                                      <p className="text-xs text-yellow-600">{attachment.size} • {attachment.date}</p>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Next Follow Up Date */}
                      <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <Calendar className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm text-green-900 mb-1">Next Follow Up Date</p>
                            <p className="text-sm text-green-700">{record.followUpDate}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <BottomNav currentPage="info" onNavigate={onNavigate} />
    </div>
  );
}