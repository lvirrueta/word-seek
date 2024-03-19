import { WordSearchDto } from './model/dto/word-seek.dto';
export declare class AppService {
    resolveWordSearch(data: WordSearchDto): any[];
    private troughWordSearch;
    private compare;
    private debugResolution;
    private reduceDebugResolution;
    private startSearching;
    private compareAdj;
    private setAdjRowCol;
}
