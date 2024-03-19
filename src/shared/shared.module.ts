import { Global, Module } from '@nestjs/common';
import { ConfigService } from './configs/config.service';
import { HelperService } from './services/helper';

@Global()
@Module({
  imports: [],
  providers: [
    ConfigService,
    HelperService
  ],
  exports: [
    ConfigService,
    HelperService,
  ],
  controllers: [],
})
export class SharedModule {}
