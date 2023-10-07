import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IWordSearch } from './model/interface/i-word-seek';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  public getHello(): any {
    console.clear();
    return this.appService.resolveWordSearch(data);
    return 'Searching...';
  }
}

const data: IWordSearch = {
  words2find: ['LEON'],
  wordSearch: [
    ['W', 'A', 'O', 'W', 'N', 'X', 'L', 'R'],
    ['E', 'W', 'E', 'O', 'N', 'B', 'R', 'A'],
    ['F', 'W', 'Z', 'Y', 'Z', 'F', 'W', 'W'],
  ],
};

// const data: IWordSearch = {
//   words2find: ['LEOPARDO', 'LEON', 'ELEFANTE', 'RATON'],
//   wordSearch: [
//     ['L', 'A', 'B', 'W', 'C', 'X', 'D', 'R'],
//     ['E', 'E', 'C', 'T', 'V', 'B', 'A', 'L'],
//     ['F', 'L', 'O', 'N', 'C', 'F', 'E', 'E'],
//     ['G', 'E', 'O', 'P', 'A', 'R', 'D', 'O'],
//     ['R', 'F', 'M', 'N', 'A', 'N', 'G', 'N'],
//     ['T', 'A', 'O', 'T', 'T', 'R', 'I', 'A'],
//     ['U', 'N', 'W', 'E', 'Z', 'I', 'D', 'D'],
//     ['Z', 'T', 'A', 'I', 'U', 'T', 'G', 'O'],
//     ['W', 'E', 'X', 'M', 'J', 'M', 'V', 'S'],
//   ],
// };
