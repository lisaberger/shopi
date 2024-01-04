import { useState, useEffect, FC } from 'react';
import { Carousel } from 'primereact/carousel';
import { useGetTeasersQuery } from '@/store/slices/teasersApiSlice';
import { ITeaserItem } from '@/utils/types/teaser.interface';
import TeaserItem from '../../components/TeaserItem/TeaserItem.component';
import styles from './Teaser.container.module.scss';

interface TeaserProps {}

const Teaser: FC<TeaserProps> = () => {
    const [productTeaser, setProductTeaser] = useState<ITeaserItem[]>([]);

    const { data: teasers, isLoading, error } = useGetTeasersQuery({});

    useEffect(() => {
        setProductTeaser(teasers);
    }, [teasers]);

    const teaserItem = (teaser: ITeaserItem) => {
        return (
            <>
                {isLoading && <p>Teaser wird geladen ...</p>}
                {error && <p>Teaser konnte nicht geladen werden.</p>}
                {teasers && <TeaserItem teaser={teaser} />}
            </>
        );
    };

    return (
        <section className='relative z-1'>
            <div className={`${styles.teaser} absolute`} />
            <div className='px-4 md:px-8 pt-8 text-white mb-2'>
                <Carousel value={productTeaser} numVisible={1} numScroll={1} itemTemplate={teaserItem} />
            </div>
        </section>
    );
};

export default Teaser;
