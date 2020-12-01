import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as bodyParser from 'body-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // the next two lines did the trick
  app.use(bodyParser.json({ limit: '100mb' }))
  app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))
  app.enableCors()
  await app.listen(3001)
}
bootstrap()
