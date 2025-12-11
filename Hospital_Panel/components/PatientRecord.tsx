import React, { useState, useMemo } from 'react';
import {
    Droplet, AlertCircle, Heart, Pill, FileText, Activity,
    Building2, Calendar, ChevronDown, ChevronUp, Search,
    Filter, X, Database, Share2
} from 'lucide-react';
import { MedicalRecord, PatientProfile } from '../types';

interface PatientRecordProps {
    patient: PatientProfile;
    history: MedicalRecord[];
    onBack: () => void;
}

export const PatientRecord: React.FC<PatientRecordProps> = ({ patient, history, onBack }) => {
    const [expandedHospital, setExpandedHospital] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
    const [selectedLocation, setSelectedLocation] = useState<string>('all');
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [showFHIR, setShowFHIR] = useState<number | null>(null);

    // Get unique values for filters
    const specialties = useMemo(() => {
        return Array.from(new Set(history.map(record => record.specialty)));
    }, [history]);

    const locations = useMemo(() => {
        return Array.from(new Set(history.map(record => record.location)));
    }, [history]);

    // Filter and search logic
    const filteredHistory = useMemo(() => {
        return history.filter(record => {
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
    }, [history, searchQuery, selectedSpecialty, selectedLocation, selectedStatus]);

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedSpecialty('all');
        setSelectedLocation('all');
        setSelectedStatus('all');
    };

    const activeFiltersCount = [selectedSpecialty, selectedLocation, selectedStatus].filter(f => f !== 'all').length;

    return (
        <div className="bg-gray-50 h-full overflow-y-auto">
            {/* Hospital-style Header Bar */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="text-slate-500 hover:text-[#0060c4]">
                        <span className="font-medium">← Back to Dashboard</span>
                    </button>
                    <div className="h-6 w-px bg-gray-300"></div>
                    <h1 className="text-xl font-bold text-slate-800">Patient Electronic Health Record</h1>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 text-[#0060c4] bg-[#0060c4]/10 rounded-lg hover:bg-[#0060c4]/20 font-medium transition-colors">
                        <Share2 className="w-4 h-4" />
                        Export Data
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#0060c4] text-white rounded-lg hover:bg-blue-700 shadow-sm font-medium transition-colors">
                        <Database className="w-4 h-4" />
                        Update FHIR Record
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">

                {/* Patient Summary Card */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                    <div className="lg:col-span-1 space-y-4">
                        {/* Profile Card */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                            <div className="flex flex-col items-center text-center">
                                {patient.image ? (
                                    <img
                                        src={patient.image}
                                        alt={patient.name}
                                        className="w-24 h-24 rounded-full object-cover mb-4 shadow-lg border-4 border-white"
                                    />
                                ) : (
                                    <div className="w-24 h-24 rounded-full bg-[#0060c4] flex items-center justify-center mb-4 shadow-lg text-white text-3xl font-semibold">
                                        {patient.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                )}
                                <h2 className="text-xl font-bold text-slate-900">{patient.name}</h2>
                                <p className="text-slate-500 text-sm mb-4">ID: {patient.id}</p>
                                <div className="flex gap-2 text-sm bg-gray-100 px-3 py-1 rounded-full">
                                    <span className="text-slate-600 font-medium">{patient.age} yrs</span>
                                    <span className="text-gray-400">|</span>
                                    <span className="text-slate-600 font-medium">{patient.bloodType}</span>
                                </div>
                            </div>
                        </div>

                        {/* Vitals Summary */}
                        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <AlertCircle className="w-4 h-4 text-[#0060c4]" />
                                    <span className="font-semibold text-slate-700">Allergies</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {patient.allergies.map(a => (
                                        <span key={a} className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded-md border border-red-100">{a}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="h-px bg-gray-100"></div>
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Heart className="w-4 h-4 text-[#0060c4]" />
                                    <span className="font-semibold text-slate-700">Chronic</span>
                                </div>
                                <div className="space-y-1">
                                    {patient.chronicDiseases.map(d => (
                                        <div key={d.name} className="flex justify-between text-sm">
                                            <span className="text-slate-700">{d.name}</span>
                                            <span className="text-slate-400 text-xs">{d.since}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-3">

                        {/* Current Meds */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-[#0060c4]/10 rounded-lg">
                                    <Pill className="w-5 h-5 text-[#0060c4]" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900">Active Medications</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {patient.medications.map((med, idx) => (
                                    <div key={idx} className="bg-gray-50 border border-gray-200 rounded-lg p-3 hover:border-[#0060c4]/30 transition-colors">
                                        <div className="flex justify-between items-start mb-1">
                                            <p className="font-medium text-slate-900">{med.name}</p>
                                            <span className="text-[#0060c4] font-bold text-sm">{med.dosage}</span>
                                        </div>
                                        <p className="text-slate-600 text-xs">{med.frequency}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* History */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-[#0060c4]/10 rounded-lg">
                                        <Activity className="w-5 h-5 text-[#0060c4]" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-900">Diagnostic History</h3>
                                </div>

                                <div className="flex gap-2">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input
                                            type="text"
                                            placeholder="Search records..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0060c4] focus:border-transparent text-sm w-64"
                                        />
                                    </div>
                                    <button
                                        onClick={() => setShowFilters(!showFilters)}
                                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors text-sm ${showFilters || activeFiltersCount > 0
                                            ? 'bg-[#0060c4] text-white border-[#0060c4]'
                                            : 'bg-white text-slate-700 border-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        <Filter className="w-4 h-4" />
                                        <span>Filters</span>
                                    </button>
                                </div>
                            </div>

                            {/* Filter Panel */}
                            {showFilters && (
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Specialty</label>
                                        <select
                                            value={selectedSpecialty}
                                            onChange={(e) => setSelectedSpecialty(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                        >
                                            <option value="all">All Specialties</option>
                                            {specialties.map(specialty => (
                                                <option key={specialty} value={specialty}>{specialty}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Location</label>
                                        <select
                                            value={selectedLocation}
                                            onChange={(e) => setSelectedLocation(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                        >
                                            <option value="all">All Locations</option>
                                            {locations.map(location => (
                                                <option key={location} value={location}>{location}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Status</label>
                                        <select
                                            value={selectedStatus}
                                            onChange={(e) => setSelectedStatus(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                        >
                                            <option value="all">All Status</option>
                                            <option value="normal">Normal</option>
                                            <option value="elevated">Elevated</option>
                                            <option value="low">Low</option>
                                        </select>
                                    </div>
                                    <div className="flex items-end">
                                        <button onClick={clearFilters} className="text-sm text-slate-500 hover:text-[#0060c4] underline pb-2">Reset Filters</button>
                                    </div>
                                </div>
                            )}

                            {/* List */}
                            {filteredHistory.length === 0 ? (
                                <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
                                    <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                                    <p className="text-slate-500">No records found matching your criteria.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {filteredHistory.map((record) => (
                                        <div key={record.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                                            <button
                                                onClick={() => setExpandedHospital(expandedHospital === record.id ? null : record.id)}
                                                className="w-full bg-white p-4 flex items-center justify-between"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`p-3 rounded-xl ${record.diagnosis.includes('Good') || record.diagnosis.includes('Normal')
                                                        ? 'bg-green-50 text-green-600'
                                                        : 'bg-[#0060c4]/10 text-[#0060c4]'
                                                        }`}>
                                                        <Building2 className="w-5 h-5" />
                                                    </div>
                                                    <div className="text-left">
                                                        <h4 className="font-bold text-slate-900">{record.hospital}</h4>
                                                        <div className="flex items-center gap-2 text-sm text-slate-500">
                                                            <span>{record.specialty}</span>
                                                            <span>•</span>
                                                            <span>{record.date}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="hidden md:block text-right">
                                                        <span className="block text-sm font-medium text-slate-700">{record.doctor}</span>
                                                        <span className="block text-xs text-slate-500">{record.location}</span>
                                                    </div>
                                                    {expandedHospital === record.id ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
                                                </div>
                                            </button>

                                            {expandedHospital === record.id && (
                                                <div className="p-5 border-t border-gray-100 bg-gray-50/50">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div>
                                                            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Clinical Findings</h5>
                                                            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-4">
                                                                <span className="text-slate-500 text-xs block mb-1">Diagnosis</span>
                                                                <p className="text-slate-900 font-medium">{record.diagnosis}</p>
                                                            </div>
                                                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
                                                                <div className="flex gap-2">
                                                                    <FileText className="w-4 h-4 text-blue-600 mt-0.5" />
                                                                    <div>
                                                                        <span className="text-blue-600 text-xs font-bold uppercase block mb-1">Physician Notes</span>
                                                                        <p className="text-blue-800 text-sm">{record.notes}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="bg-green-50 p-4 rounded-lg border border-green-100 mb-4">
                                                                <div className="flex gap-2">
                                                                    <Calendar className="w-4 h-4 text-green-600 mt-0.5" />
                                                                    <div>
                                                                        <span className="text-green-600 text-xs font-bold uppercase block mb-1">Next Follow-up</span>
                                                                        <p className="text-green-800 text-sm">{record.followUpDate || 'None scheduled'}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                                                                <div className="flex gap-2">
                                                                    <FileText className="w-4 h-4 text-yellow-600 mt-0.5" />
                                                                    <div>
                                                                        <span className="text-yellow-600 text-xs font-bold uppercase block mb-1">Attachment</span>
                                                                        <p className="text-yellow-800 text-sm">{record.attachment || 'No attachments'}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Laboratory Results</h5>
                                                            <div className="space-y-2">
                                                                {record.tests.map((test, idx) => (
                                                                    <div key={idx} className="bg-white p-3 rounded-lg border border-gray-200 flex items-center justify-between">
                                                                        <div>
                                                                            <p className="text-sm font-medium text-slate-900">{test.name}</p>
                                                                            <p className="text-xs text-slate-500">Ref: {test.range}</p>
                                                                        </div>
                                                                        <div className="text-right">
                                                                            <span className="block font-bold text-slate-800">{test.result}</span>
                                                                            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${test.status === 'normal'
                                                                                ? 'bg-green-100 text-green-700'
                                                                                : test.status === 'elevated'
                                                                                    ? 'bg-orange-100 text-orange-700'
                                                                                    : 'bg-red-100 text-red-700'
                                                                                }`}>
                                                                                {test.status}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* FHIR Toggle */}
                                                    {record.fhirJson && (
                                                        <div className="mt-6 border-t border-gray-200 pt-4">
                                                            <button
                                                                onClick={() => setShowFHIR(showFHIR === record.id ? null : record.id)}
                                                                className="flex items-center gap-2 text-xs font-mono text-slate-500 hover:text-[#0060c4] transition-colors"
                                                            >
                                                                <Database className="w-3 h-3" />
                                                                {showFHIR === record.id ? 'Hide FHIR JSON Source' : 'View FHIR JSON Source'}
                                                            </button>
                                                            {showFHIR === record.id && (
                                                                <div className="mt-3 bg-slate-900 rounded-lg p-4 overflow-x-auto">
                                                                    <pre className="text-xs font-mono text-green-400">
                                                                        {record.fhirJson}
                                                                    </pre>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};