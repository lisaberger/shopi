import Teaser from '@/containers/Teaser/Teaser.container';
import ProductList from '@/containers/ProductList/ProductList.container';
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
