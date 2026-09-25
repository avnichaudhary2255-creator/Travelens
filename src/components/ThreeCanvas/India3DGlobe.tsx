import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Compass, RotateCw, ZoomIn, ZoomOut, ShieldAlert, Radio, AlertTriangle } from 'lucide-react';

export interface ThreatCityPin {
  id: string;
  name: string;
  lat: number;
  lng: number;
  state: string;
  threatLevel: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
  anomalyScore: number;
  primaryThreat: string;
  activeIncidents: number;
  safeHavenDist: string;
}

export const INDIAN_THREAT_CITIES: ThreatCityPin[] = [
  {
    id: 'delhi',
    name: 'New Delhi (NCR)',
    lat: 28.6139,
    lng: 77.2090,
    state: 'Delhi UT',
    threatLevel: 'CRITICAL',
    anomalyScore: 94,
    primaryThreat: 'Paharganj Booking Scams & Airport Cab Surges',
    activeIncidents: 42,
    safeHavenDist: '380m (NDLS Tourist Desk)',
  },
  {
    id: 'agra',
    name: 'Agra (Taj Corridor)',
    lat: 27.1767,
    lng: 78.0081,
    state: 'Uttar Pradesh',
    threatLevel: 'HIGH',
    anomalyScore: 88,
    primaryThreat: 'Unauthorized Monument Touts & Fake Marble Rings',
    activeIncidents: 29,
    safeHavenDist: '510m (Taj East Police Post)',
  },
  {
    id: 'jaipur',
    name: 'Jaipur (Pink City)',
    lat: 26.9124,
    lng: 75.7873,
    state: 'Rajasthan',
    threatLevel: 'MODERATE',
    anomalyScore: 64,
    primaryThreat: 'Overpriced Gemstone Consignment Scheme',
    activeIncidents: 18,
    safeHavenDist: '650m (MI Road Tourist Outpost)',
  },
  {
    id: 'varanasi',
    name: 'Varanasi (Ghats)',
    lat: 25.3176,
    lng: 82.9739,
    state: 'Uttar Pradesh',
    threatLevel: 'HIGH',
    anomalyScore: 78,
    primaryThreat: 'Unregulated Boat Overcharging & Cremation Photo Extortion',
    activeIncidents: 23,
    safeHavenDist: '420m (Dashashwamedh Police)',
  },
  {
    id: 'mumbai',
    name: 'Mumbai (Colaba)',
    lat: 19.0760,
    lng: 72.8777,
    state: 'Maharashtra',
    threatLevel: 'LOW',
    anomalyScore: 28,
    primaryThreat: 'Late Night High-Traffic Taxi Non-Meter Demands',
    activeIncidents: 11,
    safeHavenDist: '250m (Colaba Police HQ)',
  },
  {
    id: 'srinagar',
    name: 'Srinagar (Dal Lake)',
    lat: 34.0837,
    lng: 74.7973,
    state: 'Jammu & Kashmir',
    threatLevel: 'MODERATE',
    anomalyScore: 58,
    primaryThreat: 'Houseboat Commission Arbitrage & Weather Slips',
    activeIncidents: 14,
    safeHavenDist: '720m (Boulevard Tourist Center)',
  },
  {
    id: 'goa',
    name: 'Goa (Coastal Belt)',
    lat: 15.2993,
    lng: 74.1240,
    state: 'Goa',
    threatLevel: 'LOW',
    anomalyScore: 22,
    primaryThreat: 'Unmetered Scooter Rental Deposit Disputes',
    activeIncidents: 8,
    safeHavenDist: '400m (Calangute Police Post)',
  },
];

// Helper to project Lat/Lng onto Sphere
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

interface India3DGlobeProps {
  onSelectCity?: (city: ThreatCityPin) => void;
  className?: string;
}

export const India3DGlobe: React.FC<India3DGlobeProps> = ({ onSelectCity, className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeCity, setActiveCity] = useState<ThreatCityPin>(INDIAN_THREAT_CITIES[0]);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [isScanning, setIsScanning] = useState(true);

  // References for camera / scene control
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const targetRotationRef = useRef<{ x: number; y: number }>({ x: 0.38, y: -1.38 }); // Locked to Indian Subcontinent
  const currentRotationRef = useRef<{ x: number; y: number }>({ x: 0.38, y: -1.38 });

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5.2);
    cameraRef.current = camera;

    // 3. Renderer with transparent WebGL canvas
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    container.appendChild(renderer.domElement);

    // Master Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;

    const GLOBE_RADIUS = 1.95;

    // A. Cybernetic Texture with Tech Latitude/Longitude & India Hotspot
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Dark navy oceanic backdrop
      const bgGrad = ctx.createLinearGradient(0, 0, 0, 1024);
      bgGrad.addColorStop(0, '#020617');
      bgGrad.addColorStop(0.5, '#050c20');
      bgGrad.addColorStop(1, '#020617');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 2048, 1024);

      // Fine grid lines
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.14)';
      ctx.lineWidth = 1;
      for (let x = 0; x < 2048; x += 48) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 1024);
        ctx.stroke();
      }
      for (let y = 0; y < 1024; y += 48) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(2048, y);
        ctx.stroke();
      }

      // India highlighted region coordinates (~78°E, ~22°N)
      const indiaX = ((78 + 180) / 360) * 2048;
      const indiaY = ((90 - 22) / 180) * 1024;

      // Cyan / Electric Blue Telemetry Glow over India
      const indiaGlow = ctx.createRadialGradient(indiaX, indiaY, 15, indiaX, indiaY, 260);
      indiaGlow.addColorStop(0, 'rgba(6, 182, 212, 0.65)');
      indiaGlow.addColorStop(0.4, 'rgba(14, 165, 233, 0.28)');
      indiaGlow.addColorStop(0.8, 'rgba(2, 132, 199, 0.08)');
      indiaGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = indiaGlow;
      ctx.beginPath();
      ctx.arc(indiaX, indiaY, 260, 0, Math.PI * 2);
      ctx.fill();

      // Landmass dot-matrix
      ctx.fillStyle = 'rgba(148, 163, 184, 0.25)';
      for (let i = 0; i < 3000; i++) {
        const rx = Math.random() * 2048;
        const ry = Math.random() * 1024;
        ctx.fillRect(rx, ry, 1.5, 1.5);
      }

      // Dense Indian Subcontinent Telemetry Points (Cyan & Magenta alert nodes)
      for (let i = 0; i < 1200; i++) {
        const ix = indiaX + (Math.random() - 0.5) * 250;
        const iy = indiaY + (Math.random() - 0.5) * 230;
        ctx.fillStyle = i % 5 === 0 ? 'rgba(244, 63, 94, 0.85)' : 'rgba(34, 211, 238, 0.9)';
        ctx.fillRect(ix, iy, 2, 2);
      }
    }

    const globeTexture = new THREE.CanvasTexture(canvas);
    const globeGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
    const globeMat = new THREE.MeshStandardMaterial({
      map: globeTexture,
      roughness: 0.65,
      metalness: 0.35,
      emissive: new THREE.Color(0x03182e),
      emissiveIntensity: 0.5,
    });
    const globeMesh = new THREE.Mesh(globeGeo, globeMat);
    globeGroup.add(globeMesh);

    // B. Wireframe Cyber Overlay
    const wireGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.008, 28, 28);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    globeGroup.add(wireMesh);

    // C. Atmosphere Fresnel Glow
    const atmosGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.04, 48, 48);
    const atmosMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.68 - dot(vNormal, vec3(0, 0, 1.0)), 2.2);
          gl_FragColor = vec4(0.02, 0.72, 0.95, 1.0) * intensity * 1.1;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    globeGroup.add(atmosMesh);

    // D. Cyber Orbital Rings (Cyan & Blue Tech Rings)
    const ringGroup = new THREE.Group();
    globeGroup.add(ringGroup);

    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const ringGeo1 = new THREE.RingGeometry(GLOBE_RADIUS * 1.22, GLOBE_RADIUS * 1.23, 64);
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 2.3;
    ringGroup.add(ring1);

    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const ringGeo2 = new THREE.RingGeometry(GLOBE_RADIUS * 1.38, GLOBE_RADIUS * 1.39, 64);
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 3;
    ring2.rotation.y = Math.PI / 6;
    ringGroup.add(ring2);

    // E. Threat Pins for Indian Cities
    const markersGroup = new THREE.Group();
    globeGroup.add(markersGroup);

    const cityMeshes: { mesh: THREE.Mesh; city: ThreatCityPin }[] = [];

    INDIAN_THREAT_CITIES.forEach((city) => {
      const pos = latLngToVector3(city.lat, city.lng, GLOBE_RADIUS * 1.015);
      
      const pinColor = 
        city.threatLevel === 'CRITICAL' ? 0xf43f5e :
        city.threatLevel === 'HIGH' ? 0xf97316 :
        city.threatLevel === 'MODERATE' ? 0xeab308 : 0x06b6d4;

      // Pin core
      const pinGeo = new THREE.SphereGeometry(0.045, 16, 16);
      const pinMat = new THREE.MeshStandardMaterial({
        color: pinColor,
        emissive: new THREE.Color(pinColor),
        emissiveIntensity: 1.2,
      });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.copy(pos);
      pinMesh.userData = { cityId: city.id, cityName: city.name };
      markersGroup.add(pinMesh);

      // Vertical beacon line
      const linePos = pos.clone().multiplyScalar(1.08);
      const lineGeo = new THREE.BufferGeometry().setFromPoints([pos, linePos]);
      const lineMat = new THREE.LineBasicMaterial({ color: pinColor, transparent: true, opacity: 0.8 });
      const line = new THREE.Line(lineGeo, lineMat);
      markersGroup.add(line);

      // Radar Ring around beacon
      const radarGeo = new THREE.RingGeometry(0.03, 0.05, 16);
      const radarMat = new THREE.MeshBasicMaterial({ color: pinColor, side: THREE.DoubleSide, transparent: true, opacity: 0.6 });
      const radarMesh = new THREE.Mesh(radarGeo, radarMat);
      radarMesh.position.copy(linePos);
      radarMesh.lookAt(new THREE.Vector3(0, 0, 0));
      markersGroup.add(radarMesh);

      cityMeshes.push({ mesh: pinMesh, city });
    });

    // F. Arc Beacons between High-Risk Corridors (Delhi - Agra - Jaipur - Varanasi)
    const arcGroup = new THREE.Group();
    globeGroup.add(arcGroup);

    const corridorPairs = [
      ['delhi', 'agra'],
      ['agra', 'jaipur'],
      ['delhi', 'jaipur'],
      ['agra', 'varanasi'],
    ];

    corridorPairs.forEach(([c1Id, c2Id]) => {
      const c1 = INDIAN_THREAT_CITIES.find(c => c.id === c1Id);
      const c2 = INDIAN_THREAT_CITIES.find(c => c.id === c2Id);
      if (!c1 || !c2) return;

      const p1 = latLngToVector3(c1.lat, c1.lng, GLOBE_RADIUS * 1.015);
      const p2 = latLngToVector3(c2.lat, c2.lng, GLOBE_RADIUS * 1.015);
      
      const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      const distance = p1.distanceTo(p2);
      mid.setLength(p1.length() + distance * 0.35);

      const curve = new THREE.QuadraticBezierCurve3(p1, p2, mid);
      const points = curve.getPoints(36);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
      const arcMat = new THREE.LineBasicMaterial({
        color: 0x06b6d4,
        transparent: true,
        opacity: 0.55,
      });
      const arcLine = new THREE.Line(arcGeo, arcMat);
      arcGroup.add(arcLine);
    });

    // Ambient & Directional Lights
    const ambientLight = new THREE.AmbientLight(0x0a223f, 1.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 2.2);
    dirLight1.position.set(5, 3, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x06b6d4, 1.2);
    dirLight2.position.set(-5, -2, -3);
    scene.add(dirLight2);

    // Mouse Interaction
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;
      prevMousePos = { x: e.clientX, y: e.clientY };

      targetRotationRef.current.y += deltaX * 0.005;
      targetRotationRef.current.x = Math.max(-1.0, Math.min(1.0, targetRotationRef.current.x + deltaY * 0.005));
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Click handler for city nodes
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(cityMeshes.map(cm => cm.mesh));

      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object;
        const match = cityMeshes.find(cm => cm.mesh === clickedMesh);
        if (match) {
          setActiveCity(match.city);
          if (onSelectCity) onSelectCity(match.city);
        }
      }
    };

    container.addEventListener('click', onClick);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth damped rotation to target
      currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.08;
      currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * 0.08;

      if (isAutoRotate && !isDragging) {
        targetRotationRef.current.y += 0.0018;
      }

      globeGroup.rotation.x = currentRotationRef.current.x;
      globeGroup.rotation.y = currentRotationRef.current.y;

      // Slow counter-rotation of orbital rings
      ring1.rotation.z = elapsedTime * 0.15;
      ring2.rotation.z = -elapsedTime * 0.12;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const nw = container.clientWidth || 600;
      const nh = container.clientHeight || 500;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('click', onClick);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isAutoRotate, onSelectCity]);

  // City selection jumper
  const handleCitySelect = (city: ThreatCityPin) => {
    setActiveCity(city);
    if (onSelectCity) onSelectCity(city);
    // Orient globe directly toward chosen city
    const phi = (90 - city.lat) * (Math.PI / 180);
    const theta = (city.lng + 180) * (Math.PI / 180);
    targetRotationRef.current = {
      x: (Math.PI / 2) - phi,
      y: -(theta - Math.PI / 2),
    };
  };

  const resetIndiaView = () => {
    targetRotationRef.current = { x: 0.38, y: -1.38 };
    setActiveCity(INDIAN_THREAT_CITIES[0]);
  };

  return (
    <div className={`relative w-full h-full min-h-[460px] lg:min-h-[540px] flex items-center justify-center select-none ${className}`}>
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top HUD Controls: Telemetry Mode & Camera Reset */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
        <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-slate-950/80 border border-cyan-500/30 backdrop-blur-md pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-mono text-[11px] text-cyan-300 font-semibold tracking-wider uppercase">
            3D RISK TELEMETRY • CORE ONLINE
          </span>
        </div>

        <div className="flex items-center gap-1.5 pointer-events-auto">
          <button
            onClick={() => setIsAutoRotate(!isAutoRotate)}
            title="Toggle Orbital Rotation"
            className={`p-1.5 rounded-lg border backdrop-blur-md transition ${
              isAutoRotate 
                ? 'bg-cyan-950/50 border-cyan-500/50 text-cyan-300' 
                : 'bg-slate-950/70 border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={resetIndiaView}
            title="Reset Subcontinent Perspective"
            className="p-1.5 rounded-lg bg-slate-950/70 border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 backdrop-blur-md transition"
          >
            <Compass className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive City Threat Selector Carousel at Bottom of Sphere */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 z-10 pointer-events-auto">
        {INDIAN_THREAT_CITIES.map((c) => {
          const isSelected = activeCity.id === c.id;
          const badgeColor = 
            c.threatLevel === 'CRITICAL' ? 'border-rose-500/60 text-rose-400 bg-rose-950/40' :
            c.threatLevel === 'HIGH' ? 'border-orange-500/60 text-orange-400 bg-orange-950/40' :
            c.threatLevel === 'MODERATE' ? 'border-amber-500/60 text-amber-400 bg-amber-950/40' :
            'border-cyan-500/60 text-cyan-400 bg-cyan-950/40';

          return (
            <button
              key={c.id}
              onClick={() => handleCitySelect(c)}
              className={`shrink-0 px-2.5 py-1 rounded-md text-[11px] font-mono border backdrop-blur-md transition-all flex items-center gap-1.5 ${
                isSelected
                  ? `${badgeColor} ring-1 ring-cyan-400/50 font-bold scale-105 shadow-lg shadow-cyan-950/40`
                  : 'bg-slate-950/70 border-white/10 text-slate-400 hover:text-slate-200 hover:border-cyan-500/30'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${
                c.threatLevel === 'CRITICAL' ? 'bg-rose-500' :
                c.threatLevel === 'HIGH' ? 'bg-orange-500' :
                c.threatLevel === 'MODERATE' ? 'bg-amber-400' : 'bg-cyan-400'
              }`} />
              <span>{c.name.split(' ')[0]}</span>
              <span className="text-[9px] opacity-70 font-sans">({c.anomalyScore}%)</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
