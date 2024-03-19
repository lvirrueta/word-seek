import { AppService } from './app.service';
import { WordSearchDto } from './model/dto/word-seek.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(dto: WordSearchDto): any;
}
