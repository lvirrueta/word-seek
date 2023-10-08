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

    const res: any[] = [];
    for (let r = 0; r < row; r++) {
      for (let c = 0; c < col; c++) {
        words2find.forEach((word) => {
          const location = { row: r, col: c };
          const resCallback = callback({ location, word, wordSearch });
          if (resCallback) {
            res.push(resCallback);
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
      const res = this.startSearching(data);
      // console.log('>>>>>>');
      // console.log(res);
      // console.log('<<<');
      return this.debugResolution(res, word);
    }
  }

  private debugResolution(resArr: IWordResolution[], word: string): IWordSolution {
    const res = resArr.reverse().filter((res, i) => {
      if (word.length === resArr.length) {
        // const resReduce = this.reduceDebugResolution(res);
        return {
          letter: res.letter,
          location: res.location,
        };
      }
    });

    res.slice(0, -1).forEach((r, i) => {
      const uuidParents: string[] = [];
      r.location.forEach((loc) => {
        console.log(`letter: ${r.letter} =>`, loc);
        uuidParents.push(loc.uuidParent);
      });

      console.log('==== comparasion ====');
      uuidParents.forEach((uuidParent) => {
        res[i + 1].location.forEach((loc, iloc) => {
          if (uuidParent) {
            if (uuidParent.includes(loc.uuid)) {
              console.log('este esta cool');
              console.log(`letter: ${res[i + 1].letter} =>`);
              // console.log(`             uuidParent -> ${uuidParent}`);
              console.log(`             loc 2 compare ->`, { loc });
            } else {
              console.log('este hay que eliminarlo alv');
              console.log(`letter: ${res[i + 1].letter} =>`);
              // console.log(`             uuidParent -> ${uuidParent}`);
              console.log(`             loc 2 compare ->`, { loc });
              console.log(res[i + 1].location[iloc]);
              res[i + 1].location.splice(iloc, 1);
            }
          }
        });
      });
      console.log('==== finish comparasion ====');
    });

    // for (let i = 0; i < res.length; i++) {
    //   // console.log(res[i]);
    //   let locations: ILocationResolution[] = [];
    //   locations = res[i].location;

    //   if (i < res.length - 1) {
    //     res.forEach((r) => {
    //       res[i + 1].location.forEach((loc) => {
    //         // console.log(r.letter);
    //         // console.log(loc);
    //         // console.log(res[i + 1].letter);
    //         // console.log(res[i + 1].location);
    //       });
    //     });
    //   }
    // }

    if (res.length === word.length) {
      return {
        word,
        resolution: res.reverse(),
      };
    } else {
      return undefined;
    }
  }

  private reduceDebugResolution(res: IWordResolution) {
    return;
  }

  /** startSearching Start de algorithm to search all letters */
  private startSearching(data: IComparison): IWordResolution[] {
    const { location, word, wordSearch } = data;
    const { row, col } = location;
    const letters = [...word];

    let res: IWordResolution;
    let locationArr: ILocationResolution[] = [{ location: { col, row }, uuid: null }];
    const resArr: IWordResolution[] = [{ location: [{ location, uuid: null }], letter: word[0] }];

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
      });

      if (res.location.length) {
        // console.log(`found '${letter}' here: `);
        res.location.forEach((loc) => {
          // console.log(loc);
        });
        locationArr = res.location;
        // console.log(res.location);
        resArr.push(res);
        return true;
      } else {
        // console.log('not found');
        return false;
      }
    });
    return resArr;
  }

  /** Compare if the word exists in the adj zone */
  private compareAdj(data: IComparison, locAdj: ILocationResolution[]): IWordResolution {
    const { wordSearch, word } = data;

    const wordResolution: ILocationResolution[] = [];
    // console.log(`Searching '${word}'`);
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

interface ILocation {
  row: number;
  col: number;
}
