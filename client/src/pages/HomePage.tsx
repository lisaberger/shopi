import Teaser from '@/components/Teaser/Teaser';
import ProductList from '@/components/ProductList/ProductList';
import { useAppSelector } from '@/store/hooks';

const HomePage = () => {
    const { searchInput } = useAppSelector((state) => state.filter);
    return (
        <>
            {!searchInput && <Teaser />}
            <ProductList />
        </>
    );
};

export default HomePage;
