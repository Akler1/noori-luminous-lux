import * as THREE from 'three';

export function createAbstractLightScene() {
  const root = new THREE.Group();

  // Hero diamond-like placeholder
  const heroGeom = new THREE.OctahedronGeometry(0.2, 2);
  const heroMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.1,
    roughness: 0.05,
    transmission: 0.85,
    transparent: true,
    opacity: 0.95,
    ior: 2.4,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    emissive: new THREE.Color('#C9A227'),
    emissiveIntensity: 0.08,
  });
  const hero = new THREE.Mesh(heroGeom, heroMat);
  root.add(hero);

  // Necklace ring
  const ringGeom = new THREE.RingGeometry(0.6, 0.65, 64);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0xC9A227, transparent: true, opacity: 0.35, side: THREE.DoubleSide });
  const ring = new THREE.Mesh(ringGeom, ringMat);
  ring.rotation.x = Math.PI / 2;
  root.add(ring);

  // Caustic light plane (simple shader imitation using Basic + alpha gradient)
  const planeGeom = new THREE.PlaneGeometry(3, 3, 16, 16);
  const planeMat = new THREE.ShaderMaterial({
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    uniforms: { time: { value: 0 }, intensity: { value: 1.2 } },
    vertexShader: `
      varying vec2 vUv; varying vec3 vPos; uniform float time;
      void main(){ vUv=uv; vPos=position; vec3 p=position; p.z+=sin(p.x*3. + time)*0.06; p.z+=cos(p.y*3. + time*.7)*0.06; gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.); }
    `,
    fragmentShader: `
      varying vec2 vUv; varying vec3 vPos; uniform float time; uniform float intensity;
      void main(){ vec2 c=vec2(.5,.5); float d=distance(vUv,c); float ca=sin(vPos.x*6.+time)*cos(vPos.y*6.+time*.8); ca+=sin(vPos.x*12.-time*1.5)*cos(vPos.y*12.+time*1.2)*.5; float f=1.-smoothstep(0.,1.,d); float a=abs(ca)*f*intensity*.3; vec3 col=vec3(.788,.635,.153); gl_FragColor=vec4(col,a); }
    `,
  });
  const plane = new THREE.Mesh(planeGeom, planeMat);
  plane.position.z = -0.5;
  root.add(plane);

  // Particles
  const count = 60;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 4;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 3;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
  }
  const pGeom = new THREE.BufferGeometry();
  pGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const pMat = new THREE.PointsMaterial({ color: 0xC9A227, size: 2.5, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, sizeAttenuation: true });
  const points = new THREE.Points(pGeom, pMat);
  root.add(points);

  const update = (time: number) => {
    planeMat.uniforms.time.value = time;
    root.rotation.y += 0.003;
    root.rotation.z = Math.sin(time * 0.8) * 0.02;
  };

  return { root, update };
}
