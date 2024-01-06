import Teaser from '@/containers/Teaser/Teaser.container';
import ProductList from '@/containers/ProductList/ProductList.container';
import { useAppSelector } from '@/store/hooks';
import { Suspense } from 'react';

const HomePage = () => {
    const { searchInput } = useAppSelector((state) => state.filter);
    return (
        <>
            {!searchInput && <Teaser />}
            <Suspense>
                <ProductList />
            </Suspense>
        </>
    );
};

export default HomePage;
