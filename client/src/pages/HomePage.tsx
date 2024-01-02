import Teaser from '@/containers/Teaser/TeaserContainer';
import ProductList from '@/containers/ProductList/ProductListContainer';
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
