import React, { useState, useRef } from 'react';
import { Camera, Upload, RefreshCw, CheckCircle, FileJson, ArrowRight, Loader2, XCircle, Keyboard, FileText } from 'lucide-react';
import { analyzeMedicalDocument, analyzeMedicalText } from '../services/geminiService';
import { MedicalRecord } from '../types';

interface OCRProcessorProps {
  onProcessingComplete: (record: MedicalRecord) => void;
  onCancel: () => void;
}

export const OCRProcessor: React.FC<OCRProcessorProps> = ({ onProcessingComplete, onCancel }) => {
  const [mode, setMode] = useState<'upload' | 'manual'>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [manualText, setManualText] = useState('');
  
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setError(null);
    }
  };

  const processData = async () => {
    setProcessing(true);
    setError(null);

    try {
      let jsonString = "{}";

      if (mode === 'upload') {
        if (!preview) return;
        // Remove data URL prefix for API
        const base64Data = preview.split(',')[1];
        jsonString = await analyzeMedicalDocument(base64Data);
      } else {
        if (!manualText.trim()) return;
        jsonString = await analyzeMedicalText(manualText);
      }

      const parsedJson = JSON.parse(jsonString);
      setResult(parsedJson);
    } catch (err) {
      console.error(err);
      setError("Failed to process data. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const handleIntegrate = () => {
    if (!result) return;
    
    // Transform FHIR Bundle result into our UI MedicalRecord format
    // In a real app, this mapping would be robust. Here we do a best-effort mapping for the demo.
    const entries = result.entry || [];
    
    // Attempt to find resources
    const condition = entries.find((e: any) => e.resource.resourceType === 'Condition')?.resource;
    const report = entries.find((e: any) => e.resource.resourceType === 'DiagnosticReport')?.resource;
    const observations = entries.filter((e: any) => e.resource.resourceType === 'Observation');

    const newRecord: MedicalRecord = {
      id: Date.now(),
      hospital: mode === 'upload' ? 'Scanned Document External' : 'Manual Entry External',
      location: 'External Upload',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      doctor: 'Unknown/External',
      specialty: 'General',
      diagnosis: condition?.code?.text || 'Imported Diagnosis',
      notes: report?.conclusion || (mode === 'upload' ? 'Data extracted via Vision AI.' : 'Data extracted from manual text entry.'),
      tests: observations.map((obs: any) => ({
        name: obs.resource.code?.text || 'Test',
        result: obs.resource.valueQuantity ? `${obs.resource.valueQuantity.value} ${obs.resource.valueQuantity.unit}` : (obs.resource.valueString || 'N/A'),
        range: 'N/A', // Range is hard to extract reliably without specific structure
        status: 'normal' // Defaulting for demo
      })),
      fhirJson: JSON.stringify(result, null, 2)
    };

    onProcessingComplete(newRecord);
  };

  const resetState = () => {
    setFile(null);
    setPreview(null);
    setManualText('');
    setResult(null);
    setError(null);
  };

  const isAnalyzeDisabled = processing || (mode === 'upload' ? !file : !manualText.trim());

  return (
    <div className="h-full bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row h-[85vh]">
        
        {/* Left Side: Input (Upload or Manual) */}
        <div className="w-full md:w-1/2 p-8 border-r border-gray-200 flex flex-col">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Import Medical Data</h2>
          <p className="text-slate-500 mb-6">Digitize records using AI extraction.</p>
          
          {/* Tabs */}
          <div className="flex p-1 bg-gray-100 rounded-lg mb-6">
            <button 
              onClick={() => { setMode('upload'); resetState(); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${
                mode === 'upload' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Upload className="w-4 h-4" />
              Upload Document
            </button>
            <button 
               onClick={() => { setMode('manual'); resetState(); }}
               className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${
                mode === 'manual' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Keyboard className="w-4 h-4" />
              Manual Entry
            </button>
          </div>

          <div className="flex-1 flex flex-col relative overflow-hidden">
            {mode === 'upload' ? (
              <div className="flex-1 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center relative overflow-hidden group">
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-contain" />
                ) : (
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-[#0060c4]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Upload className="w-8 h-8 text-[#0060c4]" />
                    </div>
                    <p className="text-slate-900 font-medium">Drag and drop or click to upload</p>
                    <p className="text-slate-500 text-sm mt-1">Supports JPG, PNG</p>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            ) : (
              <div className="flex-1 flex flex-col">
                 <textarea
                    value={manualText}
                    onChange={(e) => setManualText(e.target.value)}
                    placeholder="Type or paste medical notes here... e.g., 'Patient John Doe presented with elevated blood pressure (140/90). Glucose levels 115 mg/dL. Prescribed Lisinopril 10mg.'"
                    className="flex-1 w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0060c4] focus:border-transparent resize-none bg-gray-50 text-slate-800 placeholder-slate-400"
                 />
              </div>
            )}
          </div>

          <div className="mt-6 flex gap-3">
             <button onClick={onCancel} className="px-4 py-3 rounded-xl border border-gray-300 text-slate-700 font-medium hover:bg-gray-50 transition-colors">
                Cancel
             </button>
             {!result ? (
                 <button 
                  onClick={processData} 
                  disabled={isAnalyzeDisabled}
                  className={`flex-1 px-4 py-3 rounded-xl flex items-center justify-center gap-2 font-medium text-white transition-all ${
                    isAnalyzeDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0060c4] hover:bg-blue-700 shadow-md'
                  }`}
                >
                  {processing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyzing with AI...
                    </>
                  ) : (
                    <>
                      {mode === 'upload' ? <Camera className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                      {mode === 'upload' ? 'Scan & Extract' : 'Convert to FHIR'}
                    </>
                  )}
                </button>
             ) : (
                <button 
                  onClick={resetState}
                  className="flex-1 px-4 py-3 rounded-xl border border-[#0060c4] text-[#0060c4] font-medium hover:bg-blue-50 transition-colors"
                >
                    Start New Import
                </button>
             )}
          </div>
          {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2 text-sm">
                  <XCircle className="w-4 h-4" />
                  {error}
              </div>
          )}
        </div>

        {/* Right Side: Results */}
        <div className="w-full md:w-1/2 p-0 flex flex-col bg-slate-50 relative">
             {processing && (
                 <div className="absolute inset-0 z-10 bg-white/80 backdrop-blur-sm flex items-center justify-center flex-col">
                     <div className="w-16 h-16 border-4 border-[#0060c4]/30 border-t-[#0060c4] rounded-full animate-spin mb-4"></div>
                     <h3 className="text-lg font-bold text-slate-800">Processing Input</h3>
                     <p className="text-slate-500">Gemini AI is structuring your data...</p>
                 </div>
             )}

             {!result ? (
                 <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                     <FileJson className="w-16 h-16 mb-4 opacity-50" />
                     <p>Extracted structured data and FHIR JSON will appear here.</p>
                 </div>
             ) : (
                 <div className="flex flex-col h-full">
                     <div className="p-6 border-b border-gray-200 bg-white">
                         <div className="flex items-center gap-2 mb-2">
                             <CheckCircle className="w-5 h-5 text-green-500" />
                             <h3 className="text-lg font-bold text-slate-800">Extraction Successful</h3>
                         </div>
                         <p className="text-sm text-slate-500">
                             Data has been standardized to FHIR R4 format.
                         </p>
                     </div>

                     <div className="flex-1 overflow-auto p-6 json-scroll">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Standardized FHIR JSON</h4>
                        <pre className="text-xs font-mono text-slate-700 bg-white p-4 rounded-lg border border-gray-200 shadow-sm whitespace-pre-wrap">
                            {JSON.stringify(result, null, 2)}
                        </pre>
                     </div>

                     <div className="p-6 bg-white border-t border-gray-200">
                         <button 
                            onClick={handleIntegrate}
                            className="w-full py-3 bg-[#0060c4] text-white rounded-xl font-medium hover:bg-blue-700 shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
                         >
                             Integrate to Patient Record
                             <ArrowRight className="w-5 h-5" />
                         </button>
                     </div>
                 </div>
             )}
        </div>

      </div>
    </div>
  );
};