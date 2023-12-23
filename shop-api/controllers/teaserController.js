import Teaser from '../models/teaserModel.js';

const getTeasers = async (req, res) => {
    const teasers = await Teaser.find({}).populate('product');

    if (teasers) {
        return res.json(teasers);
    }

    res.status(404);
    throw new Error('No teasers found');
};

export { getTeasers };
