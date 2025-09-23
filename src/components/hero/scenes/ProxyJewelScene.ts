import * as THREE from 'three';

export function createProxyJewelScene() {
  const root = new THREE.Group();

  // Diamond proxy: icosahedron smoothed
  const geom = new THREE.IcosahedronGeometry(0.22, 1);
  const mat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.05,
    roughness: 0.03,
    transmission: 0.85,
    ior: 2.4,
    transparent: true,
    opacity: 0.95,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
  });
  const mesh = new THREE.Mesh(geom, mat);
  root.add(mesh);

  // Thin necklace arc (cylinders instances simplified as a Torus here for perf)
  const torus = new THREE.TorusGeometry(0.8, 0.006, 8, 64);
  const tMat = new THREE.MeshStandardMaterial({ color: 0xC9A227, metalness: 1, roughness: 0.2 });
  const chain = new THREE.Mesh(torus, tMat);
  chain.rotation.x = Math.PI / 2;
  root.add(chain);

  const update = (time: number) => {
    mesh.rotation.y += 0.004;
    mesh.rotation.x = Math.sin(time * 0.5) * 0.05;
  };

  return { root, update };
}
