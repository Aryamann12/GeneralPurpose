import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { ToolsModule } from './tools/tools.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: () => {
        const uri =
          process.env.MONGODB_URI ??
          buildMongoUri(
            process.env.MONGODB_USERNAME,
            process.env.MONGODB_PASSWORD,
            process.env.MONGODB_HOST,
          );

        if (!uri) {
          throw new Error(
            'MongoDB connection details are missing. Set MONGODB_URI or the username/password/host variables.',
          );
        }

        return { uri };
      },
    }),
    ItemsModule,
    ToolsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

function buildMongoUri(
  username?: string,
  password?: string,
  host: string = 'jstraining.buufn0n.mongodb.net',
) {
  if (!username || !password) {
    return undefined;
  }

  return `mongodb+srv://${encodeURIComponent(
    username,
  )}:${encodeURIComponent(
    password,
  )}@${host}/?retryWrites=true&w=majority&appName=JSTraining`;
}
