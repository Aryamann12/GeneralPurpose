import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

/**
 * Script to drop the tlelevel3courses collection completely
 */

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const connection = app.get<Connection>(getConnectionToken());

  console.log('Dropping tlelevel3courses collection...\n');

  try {
    const db = connection.db;
    if (!db) {
      console.error('Database connection not available');
      await app.close();
      process.exit(1);
    }

    // Check if collection exists
    const collections = await db.listCollections({ name: 'tlelevel3courses' }).toArray();
    
    if (collections.length > 0) {
      // Drop the collection
      await db.collection('tlelevel3courses').drop();
      console.log('  ✓ Dropped tlelevel3courses collection\n');
    } else {
      console.log('  ℹ Collection tlelevel3courses does not exist\n');
    }

    console.log('✅ Cleanup completed!');
  } catch (error: any) {
    if (error.code === 26) {
      // Namespace not found - collection doesn't exist
      console.log('  ℹ Collection tlelevel3courses does not exist\n');
    } else {
      console.error('❌ Error:', error.message);
      process.exit(1);
    }
  } finally {
    await app.close();
  }
}

bootstrap();

