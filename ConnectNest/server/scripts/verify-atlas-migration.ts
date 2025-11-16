import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

/**
 * Script to verify all data is migrated to MongoDB Atlas
 */

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  // Wait a bit for connection
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const connection = app.get<Connection>(getConnectionToken());
  
  if (!connection.db) {
    console.error('Database connection not available');
    await app.close();
    process.exit(1);
  }
  
  const collections = await connection.db.listCollections().toArray();
  
  console.log('\n📊 MongoDB Atlas Migration Verification\n');
  console.log('=' .repeat(60));
  console.log(`${'Collection Name'.padEnd(30)} | Documents`);
  console.log('=' .repeat(60));
  
  let totalDocuments = 0;
  
  for (const collection of collections) {
    const count = await connection.db!.collection(collection.name).countDocuments();
    totalDocuments += count;
    const status = count > 0 ? '✓' : '⚠';
    console.log(`${status} ${collection.name.padEnd(28)} | ${count.toString().padStart(8)}`);
  }
  
  console.log('=' .repeat(60));
  console.log(`Total Collections: ${collections.length}`);
  console.log(`Total Documents: ${totalDocuments}`);
  console.log('=' .repeat(60));
  
  const emptyCollections: string[] = [];
  for (const c of collections) {
    const count = await connection.db!.collection(c.name).countDocuments();
    if (count === 0) {
      emptyCollections.push(c.name);
    }
  }
  
  if (emptyCollections.length > 0) {
    console.log(`\n⚠ Warning: ${emptyCollections.length} empty collection(s) found`);
  } else {
    console.log('\n✅ All collections have data!');
  }
  
  console.log('\n✅ Verification completed!\n');
  
  await app.close();
  process.exit(0);
}

bootstrap();

