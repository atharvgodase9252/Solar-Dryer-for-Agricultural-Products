/* Simplified interactive 3D visualisation of the rotary solar dryer (three.js).
   Proportions are approximate, estimated from the CAD screenshots and photographs. Units: metres. */
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const stage = document.getElementById("explorer-stage");

function buildScene() {
  const scene = new THREE.Scene();

  // ---- Materials ----
  const steel = new THREE.MeshStandardMaterial({ color: 0x6b5a4c, metalness: 0.5, roughness: 0.6 });
  const rackSteel = new THREE.MeshStandardMaterial({ color: 0x7a4a2e, metalness: 0.4, roughness: 0.6 });
  const wood = new THREE.MeshStandardMaterial({ color: 0xb8682c, metalness: 0.05, roughness: 0.45 });
  const galvanised = new THREE.MeshStandardMaterial({ color: 0xc4c9cf, metalness: 0.8, roughness: 0.35, side: THREE.DoubleSide });
  const rubber = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.8 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x24272d, metalness: 0.6, roughness: 0.4 });
  const domeGlass = new THREE.MeshPhysicalMaterial({
    color: 0xdff2ff,
    metalness: 0,
    roughness: 0.05,
    transmission: 0.9,
    transparent: true,
    opacity: 0.22,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const rib = new THREE.MeshStandardMaterial({ color: 0x3a3a3a, metalness: 0.7, roughness: 0.4 });

  const tableTopY = 0.76;
  const tableRadius = 0.68; // tabletop: approximate
  const tube = 0.03;

  function box(width, height, depth, material, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  // ---- Base table (part 1) ----
  const base = new THREE.Group();
  const top = new THREE.Mesh(new THREE.CylinderGeometry(tableRadius, tableRadius, 0.025, 96), wood);
  top.position.y = tableTopY - 0.0125;
  top.receiveShadow = true;
  top.castShadow = true;
  base.add(top);
  const legX = 0.42;
  const legZ = 0.32;
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      base.add(box(tube, tableTopY - 0.025, tube, steel, sx * legX, (tableTopY - 0.025) / 2, sz * legZ));
    }
    // ladder braces on each side frame
    base.add(box(tube, tube, 2 * legZ, steel, sx * legX, 0.12, 0));
    base.add(box(tube, tube, 2 * legZ, steel, sx * legX, 0.42, 0));
    base.add(box(tube, tube, 2 * legZ, steel, sx * legX, tableTopY - 0.04, 0));
  }
  for (const sz of [-1, 1]) {
    base.add(box(2 * legX, tube, tube, steel, 0, tableTopY - 0.04, sz * legZ));
  }
  base.add(box(2 * legX, tube, tube, steel, 0, 0.3, 0)); // motor support rail
  scene.add(base);

  // ---- Drive (under the table) ----
  const drive = new THREE.Group();
  const motor = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.16, 32), dark);
  motor.rotation.z = Math.PI / 2;
  motor.position.set(0.22, 0.36, 0);
  motor.castShadow = true;
  drive.add(motor);
  drive.add(box(0.09, 0.1, 0.09, dark, 0.11, 0.37, 0)); // gearbox
  const smallSprocket = new THREE.Mesh(new THREE.TorusGeometry(0.045, 0.01, 8, 32), dark);
  smallSprocket.rotation.x = Math.PI / 2;
  smallSprocket.position.set(0.11, 0.44, 0);
  drive.add(smallSprocket);
  scene.add(drive);

  // ---- Rotating part: shaft, big sprocket, rack, trays ----
  const rotor = new THREE.Group();
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.6, 24), dark);
  shaft.position.y = tableTopY - 0.2;
  rotor.add(shaft);
  const bigSprocket = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.01, 8, 48), dark);
  bigSprocket.rotation.x = Math.PI / 2;
  bigSprocket.position.y = 0.52;
  drive.add(bigSprocket); // toggled with the drive layer, but rotates with the rotor below

  const rack = new THREE.Group();
  const casterH = 0.05;
  const baseY = tableTopY + casterH + tube / 2;
  const armLength = 0.6;
  rack.add(box(2 * armLength, tube, tube, rackSteel, 0, baseY, 0));
  rack.add(box(tube, tube, 2 * armLength, rackSteel, 0, baseY, 0));
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  for (const [dx, dz] of directions) {
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.02, 20), rubber);
    wheel.rotation.x = dx !== 0 ? Math.PI / 2 : 0;
    wheel.rotation.z = dz !== 0 ? Math.PI / 2 : 0;
    wheel.position.set(dx * (armLength - 0.03), tableTopY + 0.025, dz * (armLength - 0.03));
    wheel.castShadow = true;
    rack.add(wheel);
  }

  // tray levels: height above the tabletop and outer radius (must fit inside the dome)
  const levels = [
    { h: 0.1, r: 0.55 },
    { h: 0.22, r: 0.46 },
    { h: 0.34, r: 0.32 }
  ];
  const postOffset = 0.09;
  const towerHeight = levels[levels.length - 1].h + 0.04;
  for (const [dx, dz] of directions) {
    rack.add(box(tube, towerHeight, tube, rackSteel, dx * postOffset, tableTopY + casterH + towerHeight / 2, dz * postOffset));
    for (const level of levels) {
      const length = level.r - postOffset + 0.02;
      const cx = dx * (postOffset + length / 2);
      const cz = dz * (postOffset + length / 2);
      const armMesh = dx !== 0
        ? box(length, tube, tube, rackSteel, cx, tableTopY + level.h - tube / 2, cz)
        : box(tube, tube, length, rackSteel, cx, tableTopY + level.h - tube / 2, cz);
      rack.add(armMesh);
    }
  }
  rotor.add(rack);

  const trays = new THREE.Group();
  for (const level of levels) {
    for (let k = 0; k < 4; k++) {
      const gap = 0.05;
      const start = k * Math.PI / 2 + gap;
      const end = (k + 1) * Math.PI / 2 - gap;
      const inner = 0.14;
      const shape = new THREE.Shape();
      shape.absarc(0, 0, level.r, start, end, false);
      shape.absarc(0, 0, inner, end, start, true);
      shape.closePath();
      const geometry = new THREE.ExtrudeGeometry(shape, { depth: 0.035, bevelEnabled: false, curveSegments: 24 });
      geometry.rotateX(-Math.PI / 2);
      const tray = new THREE.Mesh(geometry, galvanised);
      tray.position.y = tableTopY + level.h;
      tray.castShadow = true;
      tray.receiveShadow = true;
      trays.add(tray);
    }
  }
  rotor.add(trays);
  scene.add(rotor);

  // ---- Dome (from the STEP model: 7 panels, base Ø1300 mm, height 450 mm, top opening Ø250 mm) ----
  const dome = new THREE.Group();
  const domeBaseRadius = 0.65;
  const domeHeight = 0.45;
  const topOpeningRadius = 0.125;
  const sphereRadius = (domeBaseRadius * domeBaseRadius + domeHeight * domeHeight) / (2 * domeHeight); // spherical cap
  const sphereCentreY = tableTopY + domeHeight - sphereRadius;
  const phiTop = Math.asin(topOpeningRadius / sphereRadius);
  const phiBase = Math.acos((tableTopY - sphereCentreY) / sphereRadius);
  const shell = new THREE.Mesh(new THREE.SphereGeometry(sphereRadius, 70, 32, 0, Math.PI * 2, phiTop, phiBase - phiTop), domeGlass);
  shell.position.y = sphereCentreY;
  shell.renderOrder = 2;
  dome.add(shell);
  const panelCount = 7;
  for (let k = 0; k < panelCount; k++) {
    const theta = (k * 2 * Math.PI) / panelCount;
    const points = [];
    for (let s = 0; s <= 24; s++) {
      const phi = phiTop + ((phiBase - phiTop) * s) / 24;
      points.push(new THREE.Vector3(
        sphereRadius * Math.sin(phi) * Math.cos(theta),
        sphereCentreY + sphereRadius * Math.cos(phi),
        sphereRadius * Math.sin(phi) * Math.sin(theta)
      ));
    }
    const ribMesh = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 32, 0.006, 6, false), rib);
    dome.add(ribMesh);
  }
  const baseRing = new THREE.Mesh(new THREE.TorusGeometry(domeBaseRadius, 0.008, 6, 96), rib);
  baseRing.rotation.x = Math.PI / 2;
  baseRing.position.y = tableTopY + 0.005;
  dome.add(baseRing);

  // ventilation fan in the top opening, on a round wooden mounting ring
  const fanRing = new THREE.Mesh(new THREE.RingGeometry(0.075, 0.15, 48), new THREE.MeshStandardMaterial({ color: 0xd9b48a, roughness: 0.7, side: THREE.DoubleSide }));
  fanRing.rotation.x = -Math.PI / 2;
  fanRing.position.y = tableTopY + domeHeight + 0.002;
  dome.add(fanRing);
  const fanHousing = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.07, 40, 1, true), new THREE.MeshStandardMaterial({ color: 0xf2f2f2, roughness: 0.5, side: THREE.DoubleSide }));
  fanHousing.position.y = tableTopY + domeHeight + 0.035;
  dome.add(fanHousing);
  const fanBlades = new THREE.Group();
  for (let b = 0; b < 7; b++) {
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.004, 0.025), new THREE.MeshStandardMaterial({ color: 0xffffff }));
    blade.position.set(0.035 * Math.cos((b * 2 * Math.PI) / 7), 0, 0.035 * Math.sin((b * 2 * Math.PI) / 7));
    blade.rotation.y = -(b * 2 * Math.PI) / 7;
    blade.rotation.x = 0.5;
    fanBlades.add(blade);
  }
  fanBlades.position.y = tableTopY + domeHeight + 0.04;
  dome.add(fanBlades);
  scene.add(dome);

  // ---- Floor ----
  const floor = new THREE.Mesh(new THREE.CircleGeometry(3, 64), new THREE.ShadowMaterial({ opacity: 0.25 }));
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  return { scene, rotor, bigSprocket, smallSprocket, fanBlades, layers: { dome, trays, drive } };
}

function start() {
  const width = stage.clientWidth;
  const height = stage.clientHeight;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  stage.append(renderer.domElement);
  stage.classList.add("has-3d");

  const { scene, rotor, bigSprocket, smallSprocket, fanBlades, layers } = buildScene();

  scene.add(new THREE.HemisphereLight(0xfff4e0, 0x404858, 1.4));
  const sun = new THREE.DirectionalLight(0xfff1d0, 2.4);
  sun.position.set(2.5, 4, 1.5);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -2;
  sun.shadow.camera.right = 2;
  sun.shadow.camera.top = 2;
  sun.shadow.camera.bottom = -2;
  scene.add(sun);
  const sunBall = new THREE.Mesh(new THREE.SphereGeometry(0.12, 24, 16), new THREE.MeshBasicMaterial({ color: 0xffc04a }));
  sunBall.position.set(1.6, 2.4, 0.9);
  scene.add(sunBall);

  const camera = new THREE.PerspectiveCamera(40, width / height, 0.05, 50);
  const home = new THREE.Vector3(1.75, 1.55, 1.95);
  const target = new THREE.Vector3(0, 0.7, 0);
  camera.position.copy(home);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.copy(target);
  controls.enableDamping = true;
  controls.minDistance = 1;
  controls.maxDistance = 7;
  controls.maxPolarAngle = Math.PI * 0.55;
  controls.update();

  let spinning = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const spinButton = document.querySelector('[data-action="spin"]');
  spinButton.setAttribute("aria-pressed", String(spinning));
  spinButton.addEventListener("click", () => {
    spinning = !spinning;
    spinButton.setAttribute("aria-pressed", String(spinning));
  });
  document.querySelectorAll("[data-layer]").forEach((button) => {
    button.addEventListener("click", () => {
      const layer = layers[button.dataset.layer];
      layer.visible = !layer.visible;
      button.setAttribute("aria-pressed", String(layer.visible));
    });
  });
  document.querySelector('[data-action="reset"]').addEventListener("click", () => {
    camera.position.copy(home);
    controls.target.copy(target);
    controls.update();
  });

  window.addEventListener("resize", () => {
    const w = stage.clientWidth;
    const h = stage.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  });

  const clock = new THREE.Clock();
  renderer.setAnimationLoop(() => {
    const dt = clock.getDelta();
    if (spinning) {
      const speed = 0.35; // visual only, not the real rack speed
      rotor.rotation.y += speed * dt;
      bigSprocket.rotation.z += speed * dt;
      smallSprocket.rotation.z -= speed * dt * 2.4;
    }
    fanBlades.rotation.y += 6 * dt;
    controls.update();
    renderer.render(scene, camera);
  });
}

try {
  const probe = document.createElement("canvas");
  if (probe.getContext("webgl2") || probe.getContext("webgl")) {
    start();
  }
} catch (error) {
  console.warn("3D view unavailable:", error);
}
