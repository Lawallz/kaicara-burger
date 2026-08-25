import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  interactive?: boolean;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ interactive = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Group for Burger
    const burgerGroup = new THREE.Group();
    scene.add(burgerGroup);

    // Materials
    // 1. Bun Material (golden toasted brown with specular shine)
    const bunMaterial = new THREE.MeshStandardMaterial({
      color: 0xcd853f,
      roughness: 0.45,
      metalness: 0.1,
    });

    // 2. Angus Patty Material (dark charred grilled texture)
    const pattyMaterial = new THREE.MeshStandardMaterial({
      color: 0x3d2314,
      roughness: 0.85,
      metalness: 0.05,
    });

    // 3. Melted Cheese Material (vibrant golden cheddar, slightly glossy)
    const cheeseMaterial = new THREE.MeshStandardMaterial({
      color: 0xffa500,
      roughness: 0.3,
      metalness: 0.15,
      emissive: 0xff6600,
      emissiveIntensity: 0.15
    });

    // 4. Crispy Bacon Material (deep reddish brown)
    const baconMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b1a1a,
      roughness: 0.5,
      metalness: 0.1
    });

    // 5. Fresh Green Sauce / Crisp Lettuce Material
    const sauceMaterial = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      roughness: 0.4,
      metalness: 0.1,
      emissive: 0x059669,
      emissiveIntensity: 0.15
    });

    // 6. Sesame Seeds Material
    const sesameMaterial = new THREE.MeshStandardMaterial({
      color: 0xfff8dc,
      roughness: 0.5,
      metalness: 0.1
    });

    // Geometries & Mesh Assembly
    // Bottom Bun
    const bottomBunGeo = new THREE.CylinderGeometry(1.6, 1.45, 0.4, 32);
    const bottomBun = new THREE.Mesh(bottomBunGeo, bunMaterial);
    bottomBun.position.y = -1.1;
    burgerGroup.add(bottomBun);

    // Green sauce / aioli layer
    const sauceGeo = new THREE.TorusGeometry(1.4, 0.15, 16, 32);
    const sauce = new THREE.Mesh(sauceGeo, sauceMaterial);
    sauce.rotation.x = Math.PI / 2;
    sauce.position.y = -0.75;
    burgerGroup.add(sauce);

    // Angus Smash Patty 1
    const pattyGeo1 = new THREE.CylinderGeometry(1.65, 1.65, 0.45, 32);
    const patty1 = new THREE.Mesh(pattyGeo1, pattyMaterial);
    patty1.position.y = -0.45;
    burgerGroup.add(patty1);

    // Melted Cheese 1 (with folded corners dripping over)
    const cheeseGeo1 = new THREE.BoxGeometry(2.3, 0.08, 2.3);
    const cheese1 = new THREE.Mesh(cheeseGeo1, cheeseMaterial);
    cheese1.rotation.y = Math.PI / 6;
    cheese1.position.y = -0.15;
    burgerGroup.add(cheese1);

    // Bacon Strips (Criss-crossed)
    const baconGeo = new THREE.BoxGeometry(2.4, 0.08, 0.6);
    const bacon1 = new THREE.Mesh(baconGeo, baconMaterial);
    bacon1.position.y = 0.05;
    bacon1.rotation.y = Math.PI / 4;
    burgerGroup.add(bacon1);

    const bacon2 = new THREE.Mesh(baconGeo, baconMaterial);
    bacon2.position.y = 0.1;
    bacon2.rotation.y = -Math.PI / 3;
    burgerGroup.add(bacon2);

    // Angus Smash Patty 2
    const pattyGeo2 = new THREE.CylinderGeometry(1.65, 1.65, 0.45, 32);
    const patty2 = new THREE.Mesh(pattyGeo2, pattyMaterial);
    patty2.position.y = 0.45;
    burgerGroup.add(patty2);

    // Melted Cheese 2
    const cheeseGeo2 = new THREE.BoxGeometry(2.2, 0.08, 2.2);
    const cheese2 = new THREE.Mesh(cheeseGeo2, cheeseMaterial);
    cheese2.rotation.y = -Math.PI / 5;
    cheese2.position.y = 0.72;
    burgerGroup.add(cheese2);

    // Top Bun Dome
    const topBunGeo = new THREE.SphereGeometry(1.65, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.48);
    const topBun = new THREE.Mesh(topBunGeo, bunMaterial);
    topBun.position.y = 0.68;
    burgerGroup.add(topBun);

    // Sesame Seeds on Top Bun
    const seedGeo = new THREE.SphereGeometry(0.045, 8, 8);
    seedGeo.scale(1, 0.4, 1.8);
    const seedsCount = 42;
    for (let i = 0; i < seedsCount; i++) {
      const seed = new THREE.Mesh(seedGeo, sesameMaterial);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * (Math.PI * 0.35);
      const radius = 1.66;
      seed.position.x = radius * Math.sin(phi) * Math.cos(theta);
      seed.position.y = 0.68 + radius * Math.cos(phi);
      seed.position.z = radius * Math.sin(phi) * Math.sin(theta);
      seed.rotation.x = phi;
      seed.rotation.y = theta;
      burgerGroup.add(seed);
    }

    // Glowing Floating Ember Particles & Coastal Seafoam Particles
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);

    const emberColor = new THREE.Color(0xff5722);
    const goldColor = new THREE.Color(0xf59e0b);
    const seaColor = new THREE.Color(0x10b981);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;

      const pType = Math.random();
      const col = pType > 0.7 ? seaColor : pType > 0.35 ? emberColor : goldColor;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      speeds[i] = 0.01 + Math.random() * 0.02;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Dynamic Lighting
    // Ambient Light (deep dark warm tone)
    const ambientLight = new THREE.AmbientLight(0x22110a, 1.8);
    scene.add(ambientLight);

    // Warm Fire Spotlight (top front)
    const fireSpot = new THREE.SpotLight(0xff7700, 3.5);
    fireSpot.position.set(4, 5, 5);
    fireSpot.angle = Math.PI / 4;
    fireSpot.penumbra = 0.8;
    scene.add(fireSpot);

    // Cool Coastal Rim Light (back-left seafoam green)
    const rimLight = new THREE.DirectionalLight(0x00e5ff, 1.8);
    rimLight.position.set(-5, 2, -4);
    scene.add(rimLight);

    // Warm Underlight (simulating hot grill coals from below)
    const grillLight = new THREE.PointLight(0xff3d00, 3.0, 10);
    grillLight.position.set(0, -3, 1);
    scene.add(grillLight);

    // Mouse movement listener for smooth 3D parallax
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mousePos.current.targetX = ((clientX / rect.width) * 2 - 1) * 0.6;
      mousePos.current.targetY = (-(clientY / rect.height) * 2 + 1) * 0.4;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize handling
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.05;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.05;

      // Floating wave motion for burger
      burgerGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.18;
      burgerGroup.rotation.y = elapsedTime * 0.4 + mousePos.current.x;
      burgerGroup.rotation.x = Math.sin(elapsedTime * 0.8) * 0.08 + mousePos.current.y;
      burgerGroup.rotation.z = Math.cos(elapsedTime * 1.1) * 0.04;

      // Pulse under grill light
      grillLight.intensity = 2.4 + Math.sin(elapsedTime * 4) * 0.8;

      // Animate embers floating upwards
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += speeds[i]; // Move Y up
        positions[i * 3] += Math.sin(elapsedTime + i) * 0.003; // Gentle wobble

        // Reset if too high
        if (positions[i * 3 + 1] > 3.5) {
          positions[i * 3 + 1] = -3.5;
          positions[i * 3] = (Math.random() - 0.5) * 6;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;
      particles.rotation.y = elapsedTime * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [interactive]);

  return (
    <div 
      id="three-burger-container" 
      ref={containerRef} 
      className="w-full h-full min-h-[360px] md:min-h-[440px] relative pointer-events-auto cursor-grab active:cursor-grabbing select-none"
      title="Arraste o cursor para interagir com o Kaiçara 3D"
    >
      <div className="absolute top-3 left-3 bg-black/40 border border-white/10 px-3 py-1 rounded-full text-[10px] uppercase font-mono tracking-widest text-orange-400 backdrop-blur-md pointer-events-none flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping"></span>
        3D Interativo • Gire com o mouse
      </div>
    </div>
  );
};
