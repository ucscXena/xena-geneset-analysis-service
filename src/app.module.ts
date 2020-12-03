import {HttpModule, Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnalysisResultsModule } from './analysis-results/analysis-results.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import { GmtModule } from './gmt/gmt.module';
import { TpmModule } from './tpm/tpm.module';

@Module({
  imports: [HttpModule, AnalysisResultsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    GmtModule,
    TpmModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
