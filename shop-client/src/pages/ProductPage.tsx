import { Gltf, OrbitControls, Stage } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Card } from 'primereact/card';
import { Link, useParams } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react';

const ProductPage = () => {
    const { productId } = useParams();
    console.log(productId);

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);

    const product = {
        id: '1',
        name: 'iPhone',
        model: '/iphone.gltf',
        rating: 3,
        numRatings: 5,
        price: '20',
        description: 'A super awesome new iphoneX',
        countInStock: 5,
    };

    return (
        <>
            <Link to='/'>
                <Button severity='secondary' outlined>
                    Zurück
                </Button>
            </Link>
            <section className='grid mt-5' style={{ height: '80vh' }}>
                <div className='col-6 h-full'>
                    <Canvas>
                        <Stage>
                            <OrbitControls />
                            <Gltf src={product.model} />
                        </Stage>
                    </Canvas>
                </div>
                <div className='col-3'>
                    <h1>{product.name}</h1>
                    <Rating value={product.rating} onChange={(e) => setRating(e.value)} />
                    <span className='text-xs'>{product.numRatings} reviews</span>
                    <p>Preis: € {product.price}</p>
                    <p>{product.description}</p>
                </div>
                <div className='col-3'>
                    <Card>
                        <p>Preis:</p>
                        <p>
                            <strong>{product.price}</strong>
                        </p>
                        <p>Status:</p>
                        {product.countInStock ? 'Verfügbar' : 'Aktuell nicht verfügbar'}

                        {/* {Qty Select} */}
                        <div>
                            <p>Menge:</p>
                            {product.countInStock > 0 && (
                                <Dropdown
                                    value={qty}
                                    onChange={(e) => setQty(e.value)}
                                    options={[...Array(product.countInStock).keys()].map((x) => x + 1)}
                                />
                            )}
                        </div>

                        <Button>Zum Warenkorb hinzufügen</Button>
                    </Card>
                </div>
            </section>
        </>
    );
};

export default ProductPage;
