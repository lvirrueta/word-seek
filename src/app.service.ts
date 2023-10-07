import { Injectable } from '@nestjs/common';
import { WordSearchDto } from './model/dto/word-seek.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AppService {
  public resolveWordSearch(data: WordSearchDto) {
    return this.troughWordSearch(data, this.compare.bind(this));
  }

  /** troughWordSearch Do a loop through the word search and the array of words to find */
  private troughWordSearch(data: WordSearchDto, callback: { (data: IComparison) }) {
    const { wordSearch, words2find } = data;
    const row = wordSearch.length;
    const col = wordSearch[0].length;

    const res: IWordSolution[] = [];
    for (let r = 0; r < row; r++) {
      for (let c = 0; c < col; c++) {
        words2find.forEach((word) => {
          const location = { row: r, col: c };
          const resCallback = callback({ location, word, wordSearch });
          if (resCallback) {
            res.push({
              word,
              resolution: resCallback,
            });
          }
        });
      }
    }

    return res;
  }

  /** compare if the first letter of words2find exists, then starts to search the complete word */
  private compare(data: IComparison) {
    const { location, word, wordSearch } = data;
    const { row, col } = location;

    if (wordSearch[row][col] === word[0]) {
      return this.startSearching(data);
    }
  }

  /** startSearching Start de algorithm to search all letters */
  private startSearching(data: IComparison): IWordResolution[] {
    const { location, word, wordSearch } = data;
    const { row, col } = location;

    const letters = [...word];

    const resArr: IWordResolution[] = [{ location: [{ location, uuid: null }], letter: word[0] }];
    let res: IWordResolution;
    let locationArr: ILocationResolution[] = [{ location: { col, row }, uuid: null }];
    letters.slice(1).every((letter) => {
      locationArr.forEach((loc) => {
        const locAdj = this.setAdjRowCol({
          ...data,
          location: { col: loc.location.col, row: loc.location.row },
        });

        const locAdjUid: ILocationResolution[] = locAdj.map((locA) => {
          return {
            location: locA,
            uuid: loc.uuid,
          };
        });
        res = this.compareAdj({ word: letter, location: null, wordSearch }, locAdjUid);

        if (res.location.length) {
          console.log(`found '${letter}' here: `);
          res.location.forEach((loc) => {
            console.log(loc);
          });
        } else {
          console.log('not found');
        }
      });

      locationArr = res.location;
      resArr.push(res);
      return true;
    });
    return resArr;
  }

  /** Compare if the word exists in the adj zone */
  private compareAdj(data: IComparison, locAdj: ILocationResolution[]): IWordResolution {
    const { wordSearch, word } = data;

    const wordResolution: ILocationResolution[] = [];
    console.log(`Searching '${word}'`);
    locAdj.forEach((loc) => {
      const { location, uuid } = loc;
      const { col, row } = location;

      if (wordSearch[row][col] === word) {
        wordResolution.push({
          location: { col, row },
          uuid: uuidv4(),
          uuidParent: uuid,
        });
      }
    });

    return { location: wordResolution, letter: word };
  }

  /** setAdjRowCol creates an array of ILocation Adjacent to search */
  private setAdjRowCol(data: IComparison): ILocation[] {
    const { location, wordSearch } = data;
    const { col, row } = location;
    const rowLength = wordSearch.length - 1;
    const colLength = wordSearch[0].length - 1;

    const colMin = col === 0 ? 0 : col - 1;
    const rowMin = row === 0 ? 0 : row - 1;
    const colMax = col === colLength ? colLength : col + 1;
    const rowMax = row === rowLength ? rowLength : row + 1;

    const locationAdj: ILocation[] = [];
    for (let r = rowMin; r <= rowMax; r++) {
      for (let c = colMin; c <= colMax; c++) {
        if (!(r === row && c === col)) {
          locationAdj.push({ row: r, col: c });
        }
      }
    }

    return locationAdj;
  }
}

interface IComparison {
  word: string;
  location: ILocation;
  wordSearch: string[][];
}

interface ILocationResolution {
  uuid: string;
  uuidParent?: string;
  location: ILocation;
}

interface IWordResolution {
  letter: string;
  location: ILocationResolution[];
}

interface IWordSolution {
  word: string;
  resolution: IWordResolution[];
}

// interface ICompareAdj {
//   letter: string;
//   location: ILocation;
//   wordSearch: string[][];
// }

interface ILocation {
  row: number;
  col: number;
}
