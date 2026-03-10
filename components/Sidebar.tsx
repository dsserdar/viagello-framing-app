import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import { AppConfig } from "../types";
import { PROFILE_NAMES, MATERIAL_NAMES } from "../frames";
import { FONT_NAMES } from "../fonts";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"; 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SidebarProps {
  config: AppConfig;
  updateConfig: (key: keyof AppConfig, value: any) => void;
}

export default function Sidebar({ config, updateConfig }: SidebarProps) {
  const [logoObj, setLogoObj] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new window.Image();
    img.src = "/logo.png"; 
    img.onload = () => setLogoObj(img);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) updateConfig("imageSrc", URL.createObjectURL(file));
  };

  const handleExportPDF = () => {
    const canvas = document.querySelector("#three-canvas canvas") as HTMLCanvasElement;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/jpeg", 1.0); 
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;

    // Title
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(22);
    pdf.setTextColor(0, 0, 0); 
    pdf.text("VIAGELLO Digital Art & Creations", margin, margin);

    // Image Math
    const maxImgWidth = pdfWidth - (margin * 2);
    const maxImgHeight = 120; 
    let imgWidth = maxImgWidth;
    let imgHeight = (canvas.height * imgWidth) / canvas.width; 
    
    if (imgHeight > maxImgHeight) {
      imgHeight = maxImgHeight;
      imgWidth = (canvas.width * imgHeight) / canvas.height; 
    }
    const imgX = (pdfWidth - imgWidth) / 2;
    const imgY = margin + 10;
    
    pdf.addImage(dataUrl, "JPEG", imgX, imgY, imgWidth, imgHeight);

    // Specs
    let startY = imgY + imgHeight + 15;
    pdf.setFontSize(16);
    pdf.text("Configuration Details", margin, startY);
    
    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");
    
    const specs = [
      `Artwork Name: ${config.artName || "N/A"}`,
      `Typography: ${config.fontFamily} ${config.isBold ? "(Bold)" : ""} ${config.isItalic ? "(Italic)" : ""}`,
      `Font Size: ${config.fontSize[0]} | Font Color: ${config.fontColor === "#ffffff" ? "White" : "Black"}`,
      `Orientation: ${config.isLandscape ? "Landscape" : "Portrait"}`,
      `Frame Shape: ${config.frameProfile}`,
      `Frame Material: ${config.frameMaterial}`,
      `Matting Color: ${config.borderColor} | Thickness: ${config.borderWidth[0]}%`,
      `Wall Paint Color: ${config.wallColor}`
    ];

    specs.forEach((spec, index) => {
      pdf.text(spec, margin, startY + 10 + (index * 7));
    });

    // Etsy Link
    const linkY = startY + 10 + (specs.length * 7) + 10;
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(37, 99, 235); 
    pdf.text("Visit our store: https://viagello.etsy.com", margin, linkY);
    pdf.link(margin, linkY - 5, 100, 8, { url: "https://viagello.etsy.com" });

    // Watermarks
    if (logoObj) {
      pdf.setGState(new (pdf as any).GState({ opacity: 0.15 }));
      const watermarkWidth = 70; 
      const watermarkHeight = (logoObj.height * watermarkWidth) / logoObj.width;
      
      const watermarkPositions = [
        { x: (pdfWidth / 2) - 80, y: 30 },
        { x: (pdfWidth / 2) + 10, y: 30 },
        { x: (pdfWidth / 2) - 35, y: (pdfHeight / 2) - 25 },
        { x: (pdfWidth / 2) - 80, y: pdfHeight - watermarkHeight - 40 },
        { x: (pdfWidth / 2) + 10, y: pdfHeight - watermarkHeight - 40 }
      ];

      watermarkPositions.forEach(pos => {
         pdf.addImage(logoObj, "PNG", pos.x, pos.y, watermarkWidth, watermarkHeight);
      });
      pdf.setGState(new (pdf as any).GState({ opacity: 1.0 }));
    }

    pdf.save("Viagello_3D_Framing_Spec_Sheet.pdf");
  };

  return (
    <section className="w-full flex-1 lg:flex-none lg:w-1/3 lg:max-w-[450px] lg:h-full border-r border-slate-200 bg-white p-6 overflow-y-auto flex flex-col gap-6 shadow-xl z-10 relative order-2 lg:order-1 text-slate-800 scrollbar-thin scrollbar-thumb-slate-300">
      
      {/* BRANDING */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center flex flex-col items-center shadow-sm">
        <img src="/logo.png" alt="Viagello Logo" className="w-32 h-auto mb-4" />
        <h2 className="font-semibold tracking-wide text-slate-800 text-lg uppercase mb-1">Viagello Gallery</h2>
        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Digital Art & Creations</p>
      </div>

      <div className="space-y-6">
        {/* SECTION 1 */}
        <div className="space-y-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-3">1. Artwork Setup</h3>
          <div className="space-y-3">
            <Label className="text-slate-700 font-semibold">Upload Image</Label>
            <Input type="file" accept="image/*" onChange={handleImageUpload} className="cursor-pointer text-slate-600 file:bg-slate-100 file:text-slate-700 file:border-0 file:mr-4 file:py-1 file:px-3 file:rounded-md hover:file:bg-slate-200" />
          </div>
          <div className="space-y-3 pt-2">
            <Label className="text-slate-700 font-semibold">Orientation</Label>
            <div className="flex gap-2">
              <Button variant={!config.isLandscape ? "default" : "outline"} className={`flex-1 ${!config.isLandscape ? 'bg-slate-800 text-white' : 'text-slate-600'}`} onClick={() => updateConfig("isLandscape", false)}>Portrait</Button>
              <Button variant={config.isLandscape ? "default" : "outline"} className={`flex-1 ${config.isLandscape ? 'bg-slate-800 text-white' : 'text-slate-600'}`} onClick={() => updateConfig("isLandscape", true)}>Landscape</Button>
            </div>
          </div>
        </div>

        {/* SECTION 2 */}
        <div className="space-y-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-3">2. Frame & Environment</h3>
          <div className="space-y-3">
            <Label className="text-slate-700 font-semibold">Material Finish</Label>
            <Select value={config.frameMaterial} onValueChange={(v) => updateConfig("frameMaterial", v)}>
              <SelectTrigger className="bg-white"><SelectValue placeholder="Material" /></SelectTrigger>
              <SelectContent>
                {MATERIAL_NAMES.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3 pt-2">
            <Label className="text-slate-700 font-semibold">Frame Profile</Label>
            <Select value={config.frameProfile} onValueChange={(v) => updateConfig("frameProfile", v)}>
              <SelectTrigger className="bg-white"><SelectValue placeholder="Profile" /></SelectTrigger>
              <SelectContent>
                {PROFILE_NAMES.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3 pt-2">
            <Label className="text-slate-700 font-semibold">Wall Paint</Label>
            <div className="flex gap-2">
              <Input type="color" value={config.wallColor} onChange={(e) => updateConfig("wallColor", e.target.value)} className="w-16 h-10 p-1 cursor-pointer rounded" />
              <Input type="text" value={config.wallColor} onChange={(e) => updateConfig("wallColor", e.target.value)} className="flex-1 uppercase" />
            </div>
          </div>
        </div>

        {/* SECTION 3 */}
        <div className="space-y-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-3">3. Matting & Typography</h3>
          <div className="space-y-3">
            <Label className="text-slate-700 font-semibold">Matting Color</Label>
            <div className="flex gap-2">
              <Input type="color" value={config.borderColor} onChange={(e) => updateConfig("borderColor", e.target.value)} className="w-16 h-10 p-1 cursor-pointer rounded" />
              <Input type="text" value={config.borderColor} onChange={(e) => updateConfig("borderColor", e.target.value)} className="flex-1 uppercase" />
            </div>
          </div>
          <div className="space-y-3 pt-2">
            <Label className="text-slate-700 font-semibold flex justify-between"><span>Matting Width</span> <span>{config.borderWidth[0]}%</span></Label>
            <Slider value={config.borderWidth} max={30} step={1} onValueChange={(val) => updateConfig("borderWidth", val)} className="py-2" />
          </div>
          
          <div className="pt-4 space-y-3 border-t border-slate-100 mt-4">
            <Label className="text-slate-700 font-semibold">Gallery Plaque Name</Label>
            <Input type="text" value={config.artName} onChange={(e) => updateConfig("artName", e.target.value)} placeholder="e.g. 'Midnight in Paris'" />
          </div>
          <div className="space-y-3 pt-2">
            <Label className="text-slate-700 font-semibold">Typography Style</Label>
            <div className="flex gap-2">
              <Select value={config.fontFamily} onValueChange={(v) => updateConfig("fontFamily", v)}>
                <SelectTrigger className="flex-1 bg-white"><SelectValue placeholder="Font" /></SelectTrigger>
                <SelectContent>
                  {FONT_NAMES.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                </SelectContent>
              </Select>
              <Button variant={config.isBold ? "default" : "outline"} className="w-10" onClick={() => updateConfig("isBold", !config.isBold)}>B</Button>
              <Button variant={config.isItalic ? "default" : "outline"} className="w-10 italic" onClick={() => updateConfig("isItalic", !config.isItalic)}>I</Button>
            </div>
            <div className="flex gap-2 pt-2">
              <Button variant={config.fontColor === "#333333" ? "default" : "outline"} className="flex-1" onClick={() => updateConfig("fontColor", "#333333")}>Black Ink</Button>
              <Button variant={config.fontColor === "#ffffff" ? "default" : "outline"} className="flex-1" onClick={() => updateConfig("fontColor", "#ffffff")}>White Ink</Button>
            </div>
            <div className="space-y-3 pt-4">
              <Label className="text-slate-700 font-semibold flex justify-between"><span>Font Size</span> <span>{config.fontSize[0]}pt</span></Label>
              <Slider value={config.fontSize} min={4} max={20} step={1} onValueChange={(val) => updateConfig("fontSize", val)} className="py-2" />
            </div>
          </div>
        </div>
      </div>

      {/* EXPORT BUTTON */}
      <div className="mt-4 pb-8">
        <Button onClick={handleExportPDF} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold tracking-wide uppercase py-6 text-sm shadow-lg transition-all duration-200">
          Download PDF Spec Sheet
        </Button>
      </div>
    </section>
  );
}