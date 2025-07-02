
export interface ScanInsight {
  text: string;
}

export interface ScanAction {
  id: string;
  label: string;
  type: 'primary' | 'secondary' | 'outline';
}

export interface ScanResult {
  id: string;
  type: 'eye' | 'nail' | 'tongue' | 'handwriting';
  category: 'optimal' | 'watchful';
  title: string;
  description: string;
  westernInsights: ScanInsight[];
  traditionalInsights: ScanInsight[];
  recommendations: ScanInsight[];
  actions: ScanAction[];
  timestamp: Date;
  imageData?: string;
}
