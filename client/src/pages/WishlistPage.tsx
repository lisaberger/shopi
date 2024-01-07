import ProductCarousel from '@/components/ProductCarousel.component';
import { useAppSelector } from '@/store/hooks';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Link } from 'react-router-dom';

const WishlistPage = () => {
    const wishlist = useAppSelector((state) => state.wishlist);
    const { wishlistItems } = wishlist;

    return (
        <section className='p-4 md:px-8 text-color' style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Link to='/'>
                <Button icon='pi pi-arrow-left' severity='secondary' size='small' label='Zurück' text outlined />
            </Link>
            <h1 className='text-xl font-bold mt-4'>Merkliste</h1>
            <Divider />
            <ProductCarousel items={wishlistItems} />
        </section>
    );
};

export default WishlistPage;
