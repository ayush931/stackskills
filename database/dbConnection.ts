import { MONGO_URI } from '@/config';
import mongoose from 'mongoose';

const connectionToDB = async () => {
  const { connection } = await mongoose.connect(MONGO_URI);

  if (connection) {
    console.log(`DB is connected: ${connection.host}`);
  } else {
    console.log('Failed to connect DB');
    process.exit(1);
  }
};

export default connectionToDB;
