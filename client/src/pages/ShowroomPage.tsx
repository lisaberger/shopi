import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useCursor, MeshPortalMaterial, CameraControls, Gltf, Environment } from '@react-three/drei';
import { easing, geometry } from 'maath';
import { useLocation, useRoute } from 'wouter';
import { Link } from 'react-router-dom';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';

extend(geometry);
/**
 * Based on this React Three Fiber Example: https://codesandbox.io/p/sandbox/enter-portals-9m4tpc
 */
/**
 * sources hdri:
 *    Sergej Majboroda, CC0 - https://polyhaven.com/a/small_empty_room_1
 *    Andreas Mischok, CC0 - https://polyhaven.com/a/adams_place_bridge
 */

const ShowroomPage = () => {
    const [, setLocation] = useLocation();
    const [, params] = useRoute('/item/:id');
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <section className='p-4 md:px-8 text-color z-3' style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <Link to='/'>
                    <Button icon='pi pi-arrow-left' severity='secondary' size='small' label='Zurück' text outlined />
                </Link>
                <h1 className='text-xl font-bold mt-4'>Showrooms</h1>
                <Divider />

                <div id='container' className='h-20 w-20 relative z-3' style={{ height: '60vh' }}>
                    <a className='absolute z-4 m-2' onClick={() => setLocation('/showroom')}>
                        {params && <Button icon='pi pi-arrow-left' severity='secondary' size='small' label='Showroom verlassen' text outlined />}
                        {!params && (
                            <Button
                                icon='pi pi-info-circle'
                                severity='secondary'
                                size='small'
                                label='Showroom mit Doppelclick betreten'
                                text
                                outlined
                            />
                        )}
                    </a>
                    {!isMobile && (
                        <Canvas shadows eventPrefix='client' style={{ height: '100%' }}>
                            <Frame id='01' bg='#e4cdac' position={[-2.15, 0, 0]}>
                                <Gltf src='/api/media/headphones/hi/headphones-hi.glb' castShadow scale={0.5} position={[0, -1, 0]} />
                                <Environment files='/adams_place_bridge_1k.hdr' background />
                            </Frame>
                            <Frame id='02' bg='#e4cdac'>
                                <Environment files='/small_empty_room_1_1k.hdr' background />
                                <Gltf src='/api/media/phone/hi/phone-hi.glb' castShadow scale={0.5} position={[0, -1, 0]} />
                            </Frame>
                            <Frame id='03' bg='#e4cdac' position={[2.15, 0, 0]}>
                                <Environment files='/small_empty_room_1_1k.hdr' />
                                <Gltf src='/api/media/macbook/hi/macbook-hi.glb' castShadow scale={0.5} position={[0, -1, 0]} />
                            </Frame>
                            <Rig />
                        </Canvas>
                    )}
                    {isMobile && (
                        <Canvas eventPrefix='client'>
                            <Frame id='01' bg='#e4cdac' position={[0, -2.15, 0]}>
                                <Gltf src='/api/media/headphones/hi/headphones-hi.glb' castShadow scale={0.5} position={[0, -1, 0]} />
                                <Environment files='/adams_place_bridge_1k.hdr' background />
                            </Frame>
                            <Frame id='02' bg='#e4cdac'>
                                <Environment preset='city' />
                                <Gltf src='/api/media/phone/hi/phone-hi.glb' position={[0, -2, -2]} />
                            </Frame>
                            <Frame id='03' bg='#d1d1ca' position={[0, 2.15, 0]}>
                                <Environment preset='city' />
                                <Gltf src='/api/media/macbook/hi/macbook-hi.glb' position={[-2, -0.8, -2]} />
                            </Frame>
                            <Rig />
                        </Canvas>
                    )}
                </div>
            </section>
        </>
    );
};

export default ShowroomPage;

function Frame({ id, bg, width = 2, height = 2, children, ...props }) {
    const portal = useRef();
    const [, setLocation] = useLocation();
    const [, params] = useRoute('/item/:id');
    const [hovered, hover] = useState(false);

    useCursor(hovered);
    useFrame((state, dt) => easing.damp(portal.current, 'blend', params?.id === id ? 1 : 0, 0.2, dt));

    return (
        <group {...props}>
            <mesh
                name={id}
                onDoubleClick={(e) => (e.stopPropagation(), setLocation('/item/' + e.object.name))}
                onPointerOver={(e) => hover(true)}
                onPointerOut={() => hover(false)}
                castShadow
            >
                <roundedPlaneGeometry args={[width, height, 0.02]} />
                <MeshPortalMaterial ref={portal} events={params?.id === id} side={THREE.DoubleSide}>
                    <color attach='background' args={[bg]} />
                    {children}
                </MeshPortalMaterial>
            </mesh>
        </group>
    );
}

function Rig({ position = new THREE.Vector3(0, 0, 2), focus = new THREE.Vector3(0, 0, 0) }) {
    const { controls, scene } = useThree();
    const [, params] = useRoute('/item/:id');

    useEffect(() => {
        const active = scene.getObjectByName(params?.id);
        if (active) {
            active.parent.localToWorld(position.set(0, 1, 2));
            active.parent.localToWorld(focus.set(0, 0, 0));
        }
        controls?.setLookAt(...position.toArray(), ...focus.toArray(), true);
    });
    return <CameraControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />;
}
