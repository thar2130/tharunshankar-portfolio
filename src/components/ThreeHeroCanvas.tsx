import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeHeroCanvasProps {
  className?: string;
}

export const ThreeHeroCanvas: React.FC<ThreeHeroCanvasProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // 2. Interactive Objects Group
    const group = new THREE.Group();
    scene.add(group);

    // A. Futuristic Floating Geodesic Core
    const coreGeometry = new THREE.IcosahedronGeometry(1.6, 2);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0xC6FF3D,
      wireframe: true,
      transparent: true,
      opacity: 0.24
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(coreMesh);

    // Inner Gyro Octahedron
    const innerGeometry = new THREE.OctahedronGeometry(1.05, 1);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0x7C5CFF,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    group.add(innerMesh);

    // B. Luminous 3D Particle Cloud & Undulating Cosmic Field
    const particleCount = 1600;
    const positions = new Float32Array(particleCount * 3);
    const basePositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorLime = new THREE.Color(0xC6FF3D);
    const colorViolet = new THREE.Color(0x7C5CFF);
    const colorCyan = new THREE.Color(0x38BDF8);

    for (let i = 0; i < particleCount; i++) {
      const isRing = i % 4 === 0;
      const radius = isRing ? 3.0 + Math.random() * 2.6 : 1.8 + Math.random() * 3.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = isRing ? (Math.random() - 0.5) * 0.8 + Math.PI / 2 : Math.acos(Math.random() * 2 - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      basePositions[i * 3] = x;
      basePositions[i * 3 + 1] = y;
      basePositions[i * 3 + 2] = z;

      const mixedColor = i % 3 === 0 ? colorLime : i % 3 === 1 ? colorViolet : colorCyan;
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.048,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    group.add(particles);

    // C. Floating Wireframe Orbital Rings
    const ringGeo1 = new THREE.TorusGeometry(2.7, 0.009, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0xC6FF3D, transparent: true, opacity: 0.35 });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3;
    group.add(ringMesh1);

    const ringGeo2 = new THREE.TorusGeometry(3.3, 0.007, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x38BDF8, transparent: true, opacity: 0.28 });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.y = Math.PI / 4;
    group.add(ringMesh2);

    // 3. High-Performance Pointer Tracking (Zero React Re-renders)
    // Tracks normalized cursor (-1 to 1) directly
    let targetNormX = 0;
    let targetNormY = 0;
    let currentPosX = 0;
    let currentPosY = 0;
    let currentRotX = 0;
    let currentRotY = 0;
    let isVisible = true;
    let clock = new THREE.Clock();

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;

      // Range: -1 to 1
      targetNormX = (clientX / w) * 2 - 1;
      targetNormY = -(clientY / h) * 2 + 1;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    // Intersection Observer to pause rendering when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(mount);

    // Resize Handler
    const handleResize = () => {
      if (!mount) return;
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // 4. Ultra-Smooth 60/120 FPS Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Continuous organic base spin
        coreMesh.rotation.x += 0.005;
        coreMesh.rotation.y += 0.007;

        innerMesh.rotation.x -= 0.008;
        innerMesh.rotation.y -= 0.006;

        ringMesh1.rotation.z += 0.0035;
        ringMesh2.rotation.x += 0.0025;

        particles.rotation.y += 0.0016;
        particles.rotation.x += 0.0008;

        // Wave ripple through particle positions
        const positionAttr = particleGeometry.attributes.position as THREE.BufferAttribute;
        const posArray = positionAttr.array as Float32Array;

        for (let i = 0; i < particleCount; i += 3) {
          const bx = basePositions[i * 3];
          const by = basePositions[i * 3 + 1];
          const wave = Math.sin(elapsedTime * 2.0 + bx * 0.85) * 0.09;
          posArray[i * 3 + 1] = by + wave;
        }
        positionAttr.needsUpdate = true;

        // Cursor following with silky exponential damping (lerp)
        // Maps -1..1 normalized cursor to 3D world space coordinates
        const targetWorldX = targetNormX * 2.4;
        const targetWorldY = targetNormY * 1.5;

        // Smooth translation following cursor
        currentPosX += (targetWorldX - currentPosX) * 0.075;
        currentPosY += (targetWorldY - currentPosY) * 0.075;
        group.position.x = currentPosX;
        group.position.y = currentPosY;

        // Dynamic 3D tilt towards mouse direction
        const targetTiltX = -targetNormY * 0.45;
        const targetTiltY = targetNormX * 0.45;
        currentRotX += (targetTiltX - currentRotX) * 0.06;
        currentRotY += (targetTiltY - currentRotY) * 0.06;

        group.rotation.x = currentRotX;
        group.rotation.y = currentRotY;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }

      // Memory cleanup
      coreGeometry.dispose();
      coreMaterial.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      renderer.dispose();
    };
  }, []); // Run ONCE on mount - NEVER re-creates WebGL context on mouse move!

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 w-full h-full pointer-events-none opacity-90 z-0 ${className}`}
      aria-hidden="true"
    />
  );
};
