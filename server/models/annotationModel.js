import mongoose from 'mongoose';

const annotationSchema = mongoose.Schema({
    surface: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
    },
});

const Annotation = mongoose.model('Annotation', annotationSchema);

export default Annotation;
