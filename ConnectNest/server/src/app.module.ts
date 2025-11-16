import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GymProgressModule } from './gym-progress/gym-progress.module';
import { KitchenModule } from './kitchen/kitchen.module';
import { FridgeModule } from './fridge/fridge.module';
import { DevicesModule } from './devices/devices.module';
import { LearningResourcesModule } from './learning-resources/learning-resources.module';
import { CppProblemsModule } from './cpp-problems/cpp-problems.module';
import { EntertainmentModule } from './entertainment/entertainment.module';
import { CareerModule } from './career/career.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: () => {
        const database = process.env.MONGODB_DATABASE || 'AryamannLifeVars';
        let uri =
          process.env.MONGODB_URI ??
          buildMongoUri(
            process.env.MONGODB_USERNAME,
            process.env.MONGODB_PASSWORD,
            process.env.MONGODB_HOST,
            database,
          );

        if (!uri) {
          throw new Error(
            'MongoDB connection details are missing. Set MONGODB_URI or the username/password/host variables.',
          );
        }

        // Ensure database name is set even if MONGODB_URI is provided
        if (process.env.MONGODB_URI) {
          // Replace database name in URI if it exists, or append it
          // MongoDB URI format: mongodb+srv://user:pass@host/dbname?options
          const uriMatch = uri.match(/^(mongodb\+srv:\/\/[^/]+)\/([^?]*)(\?.*)?$/);
          if (uriMatch) {
            uri = `${uriMatch[1]}/${database}${uriMatch[3] || ''}`;
          } else {
            // If no database in URI, append it before query params
            const queryMatch = uri.match(/\?/);
            if (queryMatch) {
              uri = uri.replace(/\?/, `/${database}?`);
            } else {
              uri = `${uri}/${database}`;
            }
          }
        }

        return { uri };
      },
    }),
    GymProgressModule,
    KitchenModule,
    FridgeModule,
    DevicesModule,
    LearningResourcesModule,
    CppProblemsModule,
    EntertainmentModule,
    CareerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

function buildMongoUri(
  username?: string,
  password?: string,
  host: string = 'jstraining.buufn0n.mongodb.net',
  database: string = 'AryamannLifeVars',
) {
  if (!username || !password) {
    return undefined;
  }

  return `mongodb+srv://${encodeURIComponent(
    username,
  )}:${encodeURIComponent(
    password,
  )}@${host}/${database}?retryWrites=true&w=majority&appName=JSTraining`;
}
