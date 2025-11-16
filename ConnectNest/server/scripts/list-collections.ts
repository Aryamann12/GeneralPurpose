import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

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
  
  console.log('\n📋 All Collections in MongoDB:\n');
  collections.forEach((collection, index) => {
    console.log(`${index + 1}. ${collection.name}`);
  });
  
  console.log(`\n✅ Total: ${collections.length} collections\n`);
  
  await app.close();
  process.exit(0);
}

bootstrap();

