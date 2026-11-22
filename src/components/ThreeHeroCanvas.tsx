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
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // 2. Geometries: Wireframe Icosahedron Core + Outer Particle Cloud
    const group = new THREE.Group();
    scene.add(group);

    // Wireframe Mesh (Dual Octahedron / Icosahedron)
    const coreGeometry = new THREE.IcosahedronGeometry(1.7, 1);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0xC6FF3D,
      wireframe: true,
      transparent: true,
      opacity: 0.28
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(coreMesh);

    // Inner glowing core
    const innerGeometry = new THREE.OctahedronGeometry(0.9, 0);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0x7C5CFF,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    group.add(innerMesh);

    // Outer Particle Field (1,200 points distributed on a sphere radius 3.5)
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0xC6FF3D); // Electric lime
    const color2 = new THREE.Color(0x7C5CFF); // Electric violet
    const color3 = new THREE.Color(0xF4F4F6); // Off white

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.4 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const mixedColor = i % 3 === 0 ? color1 : i % 3 === 1 ? color2 : color3;
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    group.add(particles);

    // Target rotations for smooth mouse parallax
    let targetX = 0;
    let targetY = 0;
    let isVisible = true;

    // Intersection Observer to stop rendering when scrolled out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(mount);

    // Handle Resize
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

      if (!prefersReducedMotion) {
        // Continuous slow rotation
        coreMesh.rotation.x += 0.003;
        coreMesh.rotation.y += 0.005;

        innerMesh.rotation.x -= 0.006;
        innerMesh.rotation.y -= 0.004;

        particles.rotation.y += 0.0015;
        particles.rotation.x += 0.0008;

        // Smooth mouse damping
        if (mousePosition) {
          targetX = mousePosition.normalizedX * 0.45;
          targetY = mousePosition.normalizedY * 0.45;
        }

        group.rotation.y += (targetX - group.rotation.y) * 0.05;
        group.rotation.x += (-targetY - group.rotation.x) * 0.05;
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

      // Dispose Geometries and Materials
      coreGeometry.dispose();
      coreMaterial.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, [mousePosition]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-85 z-0"
      aria-hidden="true"
    />
  );
};
