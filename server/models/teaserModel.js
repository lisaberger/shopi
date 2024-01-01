import mongoose from 'mongoose';

const teaserSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const Teaser = mongoose.model('Teaser', teaserSchema);

export default Teaser;
