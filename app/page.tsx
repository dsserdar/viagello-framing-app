"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Scene from "../components/3d/Scene";
import { AppConfig } from "../types";

export default function Home() {
  // We grouped ALL our scattered states into one central "Config" brain!
  const [config, setConfig] = useState<AppConfig>({
    wallColor: "#e2e8f0",
    borderColor: "#ffffff",
    borderWidth: [19],
    artName: "",
    fontFamily: "Roboto (Clean Sans)",
    fontSize: [8],
    fontColor: "#333333",
    isBold: false,
    isItalic: false,
    isLandscape: false,
    // NEW DEFAULTS:
    frameMaterial: "Natural Wood",
    frameProfile: "Modern Flat",
    imageSrc: null,
  });

  // A helper function to easily update one specific setting at a time
  const updateConfig = (key: keyof AppConfig, value: any) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  return (
    // FIX 1: Changed min-h-screen to h-[100dvh] so mobile browser bars don't break the layout!
    <main className="flex flex-col lg:flex-row h-[100dvh] w-full bg-slate-50 text-slate-900 overflow-hidden">
      <Sidebar config={config} updateConfig={updateConfig} />
      
      {/* FIX 2: Mobile gets exactly 45% height (h-[45dvh]), Desktop gets full height (lg:h-full) */}
      <section className="w-full h-[45dvh] lg:h-full lg:flex-1 relative bg-slate-200 order-1 lg:order-2 shadow-inner z-0 flex-shrink-0">
        <Scene config={config} />
      </section>
    </main>
  );
}