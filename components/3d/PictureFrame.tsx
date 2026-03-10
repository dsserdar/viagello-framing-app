import { Suspense } from "react";
import { FRAME_MATERIALS, FRAME_PROFILES } from "../../frames";
import { FONT_LIBRARY } from "../../fonts";
import { AppConfig } from "../../types";
import { useTexture, Text } from "@react-three/drei";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";

interface PictureFrameProps {
  config: AppConfig;
}

function UploadedArtwork({ url, maxWidth, maxHeight }: { url: string, maxWidth: number, maxHeight: number }) {
  const texture = useLoader(THREE.TextureLoader, url);
  const imgAspect = texture.image.width / texture.image.height;
  const frameAspect = maxWidth / maxHeight;

  let drawWidth = maxWidth;
  let drawHeight = maxHeight;

  if (imgAspect > frameAspect) {
    drawHeight = maxWidth / imgAspect;
  } else {
    drawWidth = maxHeight * imgAspect;
  }

  return (
    <mesh position={[0, 0, -0.01]} receiveShadow>
      <planeGeometry args={[drawWidth, drawHeight]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}

function FrameMeshes({ config }: PictureFrameProps) {
  const woodTexture = useTexture("/wood.jpg");
  const wallTexture = useTexture("/wall.jpg"); 

  const activeProfile = FRAME_PROFILES[config.frameProfile] || FRAME_PROFILES["Modern Flat"];
  const activeMaterial = FRAME_MATERIALS[config.frameMaterial] || FRAME_MATERIALS["Natural Wood"];

  const baseLongEdge = 4.0;
  const baseShortEdge = baseLongEdge / 1.414;
  const frameWidth = config.isLandscape ? baseLongEdge : baseShortEdge;
  const frameHeight = config.isLandscape ? baseShortEdge : baseLongEdge;
  
  const frameThickness = activeProfile.thickness; 
  const frameDepth = activeProfile.depth; 
  const mattingThickness = (config.borderWidth[0] / 100) * baseShortEdge; 
  const verticalPieceHeight = frameHeight - (frameThickness * 2);

  const artWidth = frameWidth - (frameThickness * 2) - (mattingThickness * 2);
  const artHeight = frameHeight - (frameThickness * 2) - (mattingThickness * 2);

  return (
    <group>
      {/* THE WALL */}
      <mesh position={[0, 0, -0.1]} receiveShadow>
        <boxGeometry args={[15, 10, 0.1]} />
        <meshStandardMaterial color={config.wallColor} map={wallTexture} bumpMap={wallTexture} bumpScale={0.02} roughness={1} />
      </mesh>

      {/* THE OUTER FRAME */}
      {[
        [0, frameHeight / 2 - frameThickness / 2, 0, frameWidth, frameThickness, frameDepth], 
        [0, -(frameHeight / 2) + frameThickness / 2, 0, frameWidth, frameThickness, frameDepth], 
        [-(frameWidth / 2) + frameThickness / 2, 0, 0, frameThickness, verticalPieceHeight, frameDepth], 
        [frameWidth / 2 - frameThickness / 2, 0, 0, frameThickness, verticalPieceHeight, frameDepth] 
      ].map((dimensions, index) => (
        <mesh key={index} position={[dimensions[0], dimensions[1], dimensions[2]]} castShadow receiveShadow>
          <boxGeometry args={[dimensions[3], dimensions[4], dimensions[5]]} />
          
          {/* THE FIX: We conditionally render completely different materials AND add the `key` property to force React to reset! */}
          {activeMaterial.type === "texture" ? (
            <meshStandardMaterial 
              key={`texture-${index}`} // <--- THIS IS THE MAGIC FIX
              map={woodTexture} 
              color="#ffffff" 
              roughness={activeMaterial.roughness} 
            />
          ) : (
            <meshStandardMaterial 
              key={`color-${activeMaterial.hex}-${index}`} // <--- THIS IS THE MAGIC FIX
              color={activeMaterial.hex}
              metalness={activeMaterial.metalness}
              roughness={activeMaterial.roughness}
            />
          )}
          
        </mesh>
      ))}

      {/* REALISTIC GLASS OVERLAY */}
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[frameWidth - frameThickness, frameHeight - frameThickness]} />
        <meshPhysicalMaterial transparent opacity={0.15} roughness={0.05} metalness={0.8} clearcoat={1} reflectivity={1} />
      </mesh>

      {/* INNER MATTING */}
      <mesh position={[0, 0, -0.02]} receiveShadow>
        <planeGeometry args={[frameWidth - frameThickness, frameHeight - frameThickness]} />
        <meshStandardMaterial color={config.borderColor} roughness={0.9} />
      </mesh>

      {/* DYNAMIC ARTWORK */}
      {config.imageSrc ? (
        <Suspense fallback={null}>
          <UploadedArtwork url={config.imageSrc} maxWidth={artWidth} maxHeight={artHeight} />
        </Suspense>
      ) : (
        <mesh position={[0, 0, -0.01]} receiveShadow>
          <planeGeometry args={[artWidth, artHeight]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.5} />
        </mesh>
      )}

      {/* 3D TYPOGRAPHY */}
      {config.artName && (() => {
        const fontData = FONT_LIBRARY[config.fontFamily] || FONT_LIBRARY["Roboto (Clean Sans)"];
        let activeFontUrl = fontData.base;
        
        if (config.isBold && config.isItalic) activeFontUrl = fontData.boldItalic;
        else if (config.isBold) activeFontUrl = fontData.bold;
        else if (config.isItalic) activeFontUrl = fontData.italic;

        return (
          <Text
            position={[0, -(frameHeight / 2) + frameThickness + (mattingThickness * 0.75), 0.06]}
            fontSize={config.fontSize[0] / 100}
            color={config.fontColor}
            font={activeFontUrl}
            anchorX="center"
            anchorY="middle"
          >
            {config.artName}
          </Text>
        );
      })()}
    </group>
  );
}

export default function PictureFrame({ config }: PictureFrameProps) {
  return (
    <Suspense fallback={null}>
      <FrameMeshes config={config} />
    </Suspense>
  );
}