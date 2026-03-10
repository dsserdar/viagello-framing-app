export const FRAME_PROFILES: Record<string, { thickness: number, depth: number }> = {
  "Modern Flat": { thickness: 0.2, depth: 0.15 },
  "Gallery Deep": { thickness: 0.15, depth: 0.4 }, 
  "Slim Minimalist": { thickness: 0.08, depth: 0.1 }, 
};

export const FRAME_MATERIALS: Record<string, { type: "color" | "texture", hex: string, metalness: number, roughness: number }> = {
  "Natural Wood": { type: "texture", hex: "#ffffff", metalness: 0.1, roughness: 0.8 },
  "Matte Black": { type: "color", hex: "#18181b", metalness: 0.1, roughness: 0.9 },
  "Matte White": { type: "color", hex: "#fafafa", metalness: 0.1, roughness: 0.9 },
  // FIX: Lowered metalness to 0.6 and adjusted roughness so the base color always shows!
  "Brushed Gold": { type: "color", hex: "#d4af37", metalness: 0.6, roughness: 0.3 },
  "Polished Silver": { type: "color", hex: "#e3e8ee", metalness: 0.6, roughness: 0.2 },
  "Rose Gold": { type: "color", hex: "#b76e79", metalness: 0.6, roughness: 0.3 },
};

export const PROFILE_NAMES = Object.keys(FRAME_PROFILES);
export const MATERIAL_NAMES = Object.keys(FRAME_MATERIALS);