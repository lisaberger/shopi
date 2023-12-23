import Teaser from '../models/teaserModel.js';

const getTeasers = async (req, res) => {
    try {
        const teasers = await Teaser.find({}).populate('product');

        res.json(teasers);
    } catch (error) {
        res.status(404).json({ error: 'No Teasers Found!' });
    }
};

export { getTeasers };
