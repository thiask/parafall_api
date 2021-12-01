import mongoose from 'mongoose';

mongoose.connect('mongodb://10.0.0.31:27017/chat', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

export default mongoose;