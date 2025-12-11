export interface TestResult {
  name: string;
  result: string;
  range: string;
  status: 'normal' | 'elevated' | 'low';
}

export interface MedicalRecord {
  id: number;
  hospital: string;
  location: string;
  date: string;
  doctor: string;
  specialty: string;
  tests: TestResult[];
  diagnosis: string;
  notes: string;
  fhirJson?: string; // Stringified JSON for display
}

export interface PatientProfile {
  name: string;
  age: number;
  id: string;
  bloodType: string;
  allergies: string[];
  chronicDiseases: { name: string; since: string }[];
  medications: { name: string; dosage: string; frequency: string }[];
  image?: string;
}

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  PATIENT_VIEW = 'PATIENT_VIEW',
  OCR_SCAN = 'OCR_SCAN',
}

export interface ProcessingState {
  isProcessing: boolean;
  step: string; // "Uploading", "Analyzing", "Standardizing"
}