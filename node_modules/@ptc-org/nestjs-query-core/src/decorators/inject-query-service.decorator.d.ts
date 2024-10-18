import { Inject } from '@nestjs/common';
import { Class } from '../common';
export declare const InjectQueryService: <DTO>(DTOClass: Class<DTO>) => ReturnType<typeof Inject>;
