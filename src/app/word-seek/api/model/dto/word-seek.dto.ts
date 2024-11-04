import { IWordSearch } from '../interface/i-word-seek';

export class WordSearchDto implements IWordSearch {
  wordSearch!: string[][];
  words2find!: string[];
}
