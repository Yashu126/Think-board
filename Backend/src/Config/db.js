import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        //await mongoose.connect("mongodb+srv://yashwanthraj7392_db_user:DMoZyVXTtN9quavp@notes.ibjrhcx.mongodb.net/notes_db?retryWrites=true&w=majority&appName=Notes")
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Database connected successfully');
    }
    catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1); //exit with failure
    }
}