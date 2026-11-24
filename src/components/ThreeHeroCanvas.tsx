import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeHeroCanvasProps {
  mousePosition?: { normalizedX: number; normalizedY: number };
}

export const ThreeHeroCanvas: React.FC<ThreeHeroCanvasProps> = ({ mousePosition }) => {
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
      opacity: 0.22
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(coreMesh);

    // Inner Gyro Octahedron
    const innerGeometry = new THREE.OctahedronGeometry(1.0, 1);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0x7C5CFF,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    group.add(innerMesh);

    // B. Luminous 3D Particle Cloud & Undulating Wave
    const particleCount = 1500;
    const positions = new Float32Array(particleCount * 3);
    const basePositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorLime = new THREE.Color(0xC6FF3D);
    const colorViolet = new THREE.Color(0x7C5CFF);
    const colorCyan = new THREE.Color(0x38BDF8);

    for (let i = 0; i < particleCount; i++) {
      // Outer sphere & orbital ring distribution
      const isRing = i % 4 === 0;
      const radius = isRing ? 3.0 + Math.random() * 2.5 : 2.0 + Math.random() * 3.5;
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
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    group.add(particles);

    // C. Floating Wireframe Orbital Rings
    const ringGeo1 = new THREE.TorusGeometry(2.6, 0.008, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0xC6FF3D, transparent: true, opacity: 0.35 });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3;
    group.add(ringMesh1);

    const ringGeo2 = new THREE.TorusGeometry(3.2, 0.006, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x38BDF8, transparent: true, opacity: 0.25 });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.y = Math.PI / 4;
    group.add(ringMesh2);

    let targetX = 0;
    let targetY = 0;
    let isVisible = true;
    let clock = new THREE.Clock();

    // Intersection Observer to stop rendering offscreen
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

    // Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Continuous organic rotation
        coreMesh.rotation.x += 0.004;
        coreMesh.rotation.y += 0.006;

        innerMesh.rotation.x -= 0.007;
        innerMesh.rotation.y -= 0.005;

        ringMesh1.rotation.z += 0.003;
        ringMesh2.rotation.x += 0.002;

        particles.rotation.y += 0.0018;
        particles.rotation.x += 0.0009;

        // Wave ripple through particle positions
        const positionAttr = particleGeometry.attributes.position as THREE.BufferAttribute;
        const posArray = positionAttr.array as Float32Array;

        for (let i = 0; i < particleCount; i += 3) {
          const bx = basePositions[i * 3];
          const by = basePositions[i * 3 + 1];

          const wave = Math.sin(elapsedTime * 1.8 + bx * 0.8) * 0.08;
          posArray[i * 3 + 1] = by + wave;
        }
        positionAttr.needsUpdate = true;

        // Smooth mouse damping parallax
        if (mousePosition) {
          targetX = mousePosition.normalizedX * 0.65;
          targetY = mousePosition.normalizedY * 0.65;
        }

        group.rotation.y += (targetX - group.rotation.y) * 0.06;
        group.rotation.x += (-targetY - group.rotation.x) * 0.06;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
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
  }, [mousePosition]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-90 z-0"
      aria-hidden="true"
    />
  );
};
