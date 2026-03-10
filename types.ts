export interface AppConfig {
  wallColor: string;
  borderColor: string;
  borderWidth: number[];
  artName: string;
  fontFamily: string;
  fontSize: number[];
  fontColor: string;
  isBold: boolean;
  isItalic: boolean;
  isLandscape: boolean;
  // NEW: Updated frame states
  frameMaterial: string; 
  frameProfile: string;
  imageSrc: string | null;
}