import { useState, useEffect } from 'react';
import { Carousel } from 'primereact/carousel';
import { useGetTeasersQuery } from '@/store/slices/teasersApiSlice';
import { TeaserItem } from '@/utils/types/teaser.interface';
import TeaserItemComponent from '../../components/TeaserItem/TeaserItemComponent';
import styles from './TeaserContainer.module.scss';

const TeaserContainer = () => {
    const [productTeaser, setProductTeaser] = useState<TeaserItem[]>([]);

    const { data: teasers, isLoading, error } = useGetTeasersQuery({});

    useEffect(() => {
        setProductTeaser(teasers);
    }, [teasers]);

    const teaserItem = (teaser: TeaserItem) => {
        return (
            <>
                {isLoading && <p>Teaser wird geladen ...</p>}
                {error && <p>Teaser konnte nicht geladen werden.</p>}
                {teasers && <TeaserItemComponent teaser={teaser} />}
            </>
        );
    };

    return (
        <section className='relative'>
            <div className={`${styles.teaser} absolute`} />
            <div className='px-4 md:px-8 pt-3 text-white mb-2'>
                <Carousel value={productTeaser} numVisible={1} numScroll={1} itemTemplate={teaserItem} />
            </div>
        </section>
    );
};

export default TeaserContainer;
