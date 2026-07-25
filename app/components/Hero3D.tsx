"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Procedural sculpture, no external assets: a faceted glass core (the builder)
// orbited by three metallic satellites (medicine / games / AI) inside a halo ring.
export default function Hero3D({ accent = "#9cff57" }: { accent?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0, 0.3, 7.4);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      // No WebGL (headless browsers, locked-down GPU sandboxes, some old devices)
      // — fail silently and just skip the 3D piece rather than crash the page.
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    // Environment map for realistic metal/glass reflections
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    const accentColor = new THREE.Color(accent);
    const RING_R = 1.65;
    const ORBIT_R = 1.7;

    // Rig — everything rotates together, satellites orbit within it
    const rig = new THREE.Group();
    scene.add(rig);

    // Halo ring
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(RING_R, 0.022, 32, 160),
      new THREE.MeshPhysicalMaterial({
        color: accentColor,
        metalness: 0.9,
        roughness: 0.18,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
      })
    );
    ring.rotation.x = Math.PI / 2.3;
    rig.add(ring);

    // Second ring — perpendicular, thinner, blue-tinted
    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(RING_R * 1.14, 0.012, 20, 120),
      new THREE.MeshPhysicalMaterial({ color: 0x5ebaff, metalness: 0.8, roughness: 0.3, transparent: true, opacity: 0.52 })
    );
    ring2.rotation.x = Math.PI / 2.3;
    ring2.rotation.y = Math.PI / 1.9;
    rig.add(ring2);

    // Faceted glass core
    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.95, 2),
      new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0,
        roughness: 0.04,
        transmission: 1,
        thickness: 1.8,
        ior: 1.5,
        clearcoat: 1,
        envMapIntensity: 1.6,
      })
    );
    rig.add(core);

    // Rim glow — slightly larger backside shell, additive, reads as a soft fresnel halo
    const rimGlow = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.02, 2),
      new THREE.MeshBasicMaterial({
        color: accentColor,
        transparent: true,
        opacity: 0.16,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
      })
    );
    rig.add(rimGlow);

    // Inner emissive spark (reads through the glass)
    const spark = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.3, 0),
      new THREE.MeshBasicMaterial({ color: accentColor })
    );
    rig.add(spark);

    // Ambient particle field — scattered stars around the sculpture
    const pCount = 110;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.3 + Math.random() * 1.7;
      pPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.72;
      pPos[i * 3 + 2] = r * Math.cos(phi);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const particles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({ color: accentColor, size: 0.016, transparent: true, opacity: 0.38, sizeAttenuation: true })
    );
    rig.add(particles);

    // Three satellites — medicine / games / AI — metallic, orbiting the ring plane
    const satColors = [0x5ebaff, 0xffffff, accentColor.getHex()];
    const satellites: { mesh: THREE.Mesh; radius: number; speed: number; offset: number }[] = [];
    satColors.forEach((c, i) => {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.13, 32, 32),
        new THREE.MeshPhysicalMaterial({ color: c, metalness: 0.85, roughness: 0.25, clearcoat: 0.6 })
      );
      rig.add(mesh);
      satellites.push({ mesh, radius: ORBIT_R, speed: 0.35 + i * 0.05, offset: (i / 3) * Math.PI * 2 });
    });

    // Three-point studio lighting
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(4, 4, 5);
    const fill = new THREE.DirectionalLight(0x9cc3ff, 0.6);
    fill.position.set(-5, 1, 3);
    const rim = new THREE.DirectionalLight(accentColor, 1.6);
    rim.position.set(-2, -3, -4);
    scene.add(key, fill, rim, new THREE.AmbientLight(0xffffff, 0.15));

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.autoRotate = !reduceMotion;
    controls.autoRotateSpeed = 1.1;
    controls.minPolarAngle = Math.PI / 2 - 0.6;
    controls.maxPolarAngle = Math.PI / 2 + 0.6;

    let raf = 0;
    const t0 = performance.now();

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // Scroll-linked exit — drifts and fades as the hero scrolls past, echoing the
    // scroll choreography of the reference prompt without a literal exploded view.
    const onScroll = () => {
      const p = Math.min(Math.max(window.scrollY / window.innerHeight, 0), 1);
      mount.style.opacity = String(1 - p * 0.9);
      mount.style.transform = `translateY(${p * 36}px) scale(${1 - p * 0.06})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = (performance.now() - t0) / 1000;
      satellites.forEach((s) => {
        const a = t * s.speed + s.offset;
        s.mesh.position.set(Math.cos(a) * s.radius, Math.sin(a * 0.6) * 0.35, Math.sin(a) * s.radius);
      });
      spark.rotation.y += 0.01;
      particles.rotation.y += 0.0007;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      controls.dispose();
      renderer.dispose();
      pmrem.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
          obj.geometry.dispose();
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach((m) => m.dispose());
        }
      });
      mount.removeChild(renderer.domElement);
    };
  }, [accent]);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{ width: "100%", height: "100%", cursor: "grab", touchAction: "none" }}
    />
  );
}
