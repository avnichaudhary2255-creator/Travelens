export type TabType = 
  | 'home'
  | 'map' 
  | 'route' 
  | 'ai' 
  | 'dashboard' 
  | 'architecture' 
  | 'threats' 
  | 'help'
  | 'offline' 
  | 'profile';

export type ThreatCategory = 
  | 'scam' 
  | 'price_anomaly' 
  | 'taxi_overcharge' 
  | 'unsafe_zone' 
  | 'harassment' 
  | 'currency_dispute' 
  | 'suspicious_service';

export interface ThreatItem {
  id: string;
  title: string;
  category: ThreatCategory;
  categoryLabel: string;
  location: string;
  coordinates: { lat: number; lng: number };
  severity: 'critical' | 'high' | 'moderate' | 'low';
  timestamp: string;
  description: string;
  reportedCases: number;
  anomalyScore: number; // e.g. 88/100
  preventiveAdvice: string;
  verifiedByAI: boolean;
  status: 'ACTIVE' | 'INVESTIGATING' | 'MITIGATED';
}

export interface RiskZone {
  id: string;
  name: string;
  city: string;
  coordinates: { lat: number; lng: number };
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  riskScore: number; // 0-100
  safeCorridorAvailable: boolean;
  primaryRisks: string[];
  safeHours: string;
  lightingQuality: 'Good' | 'Fair' | 'Poor';
  policePresence: 'High' | 'Moderate' | 'Sparse';
  recentIncidents24h: number;
}

export interface SafeRoutePlan {
  id: string;
  origin: string;
  destination: string;
  standardRoute: {
    duration: string;
    distance: string;
    safetyScore: number;
    hazards: string[];
    riskZonesEncountered: number;
  };
  safeRoute: {
    duration: string;
    distance: string;
    safetyScore: number;
    cctvCoverage: string;
    lightingQuality: string;
    policePostsCount: number;
    recommendedTransport: string;
    waypoints: string[];
  };
}

export interface NearbyEmergencyService {
  id: string;
  name: string;
  type: 'police' | 'hospital' | 'pharmacy' | 'safe_haven' | 'embassy';
  address: string;
  phone: string;
  distance: string;
  isOpen24x7: boolean;
  coordinates: { lat: number; lng: number };
  verifiedBadge: boolean;
}

export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  isLoggedIn?: boolean;
  nationality?: string;
  travelerType?: 'Solo' | 'Family' | 'Foreign Tourist' | 'Student' | 'Business';
  travelStyle?: string[];
  preferredLanguage: string;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  savedPlaces?: string[];
  savedDestinations?: string[];
  offlinePackagesDownloaded?: string[];
}

export interface OfflinePackage {
  id: string;
  region: string;
  size: string;
  isDownloaded: boolean;
  downloadDate?: string;
  safeZonesIncluded: number;
  emergencyContactsIncluded: number;
  offlineAiKnowledgeBase: boolean;
}
