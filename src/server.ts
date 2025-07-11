import mongoose from 'mongoose';

import app from './app';
import config from './app/config';

async function main(): Promise<void> {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('🟢 Connected to MongoDB');
    app.listen(config.port, () => {
      console.log(`🚀 Server is running on http://localhost:${config.port}`);
    });
  } catch (err) {
    console.error('🔴 Error connecting to MongoDB:', err);
  }
}

main();
