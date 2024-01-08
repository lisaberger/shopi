import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useCursor, MeshPortalMaterial, CameraControls, Gltf, Environment, Grid } from '@react-three/drei';
import { easing, geometry } from 'maath';
import { useLocation, useRoute } from 'wouter';
import { Link } from 'react-router-dom';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';

extend(geometry);

const ShowroomPage = () => {
    const [, setLocation] = useLocation();
    const [, params] = useRoute('/item/:id');
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Funktion zum Aktualisieren des Zustands, wenn die Bildschirmbreite geändert wird
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // Beispiel: Zeige mobile Ansicht bei einer Breite von weniger als 768 Pixel
        };
        // Füge einen Event-Listener für die Änderung der Bildschirmgröße hinzu
        window.addEventListener('resize', handleResize);

        // Initialisiere den Zustand basierend auf der aktuellen Bildschirmbreite
        handleResize();

        // Aufräumarbeiten beim Komponentenabbau
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

                <div id='container' className='h-20 w-20 relative' style={{ height: '60vh' }}>
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
                        <Canvas eventSource={document.getElementById('root')} eventPrefix='client'>
                            <Frame id='01' bg='#e4cdac' position={[-2.15, 0, 0]}>
                                <Gltf src='/api/media/headphones/hi/headphones-hi.gltf' position={[-2.5, -1.7, -3]} />
                                <Environment preset='city' />
                            </Frame>
                            <Frame id='02' bg='#e4cdac'>
                                <Environment preset='city' />
                                <Gltf src='/api/media/phone/hi/iphone-hi.gltf' position={[0, -2, -2]} />
                            </Frame>
                            <Frame id='03' bg='#e4cdac' position={[2.15, 0, 0]}>
                                <Environment preset='city' />
                                <Gltf src='/api/media/macbook/hi/macbook-hi.glb' position={[2, -0.8, -2]} />
                            </Frame>
                            <Rig />
                        </Canvas>
                    )}
                    {isMobile && (
                        <Canvas eventSource={document.getElementById('container')} eventPrefix='client'>
                            <Frame id='01' bg='#e4cdac' position={[0, -2.15, 0]}>
                                <Gltf src='/api/media/headphones/hi/headphones-hi.gltf' position={[-2.5, -1.7, -3]} />
                                <Environment preset='city' />
                            </Frame>
                            <Frame id='02' bg='#e4cdac'>
                                <Environment preset='city' />
                                <Gltf src='/api/media/phone/hi/iphone-hi.gltf' position={[0, -2, -2]} />
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
            active.parent.localToWorld(position.set(0, 0.5, 0.25));
            active.parent.localToWorld(focus.set(0, 0, -2));
        }
        controls?.setLookAt(...position.toArray(), ...focus.toArray(), true);
    });
    return <CameraControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />;
}
