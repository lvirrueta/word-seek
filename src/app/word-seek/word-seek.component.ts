import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { word2Seek, wordSeek } from './constants/word-seek.constants';
import { IWord2Seek, IWordSeek } from './interface/word-seek.interface';
import { WordSeekService } from './api/word-seek.service';
import { WordSeekDto } from './api/wor-seek.dto';
import { WordSeekAPI } from './api/word-seek.api';
import { FormControl } from "@angular/forms";


@Component({
  selector: 'app-word-seek',
  templateUrl: './word-seek.component.html',
  styleUrls: ['./word-seek.component.scss']
})
export class WordSeekComponent implements OnInit {
  constructor(
    private wordSeekService: WordSeekService
  ) {}

  public title = 'word seek';
  public wordSeek!:IWordSeek[][];
  public word2Seek= word2Seek;
  public formWord = new FormControl('');
  public formColor = new FormControl('#FF7300');
  
  ngOnInit(): void {
    this.buildWordSeek();
  }

  // ------------- Init Functions --------------- //

  public buildWordSeek(): void {
    this.wordSeek = wordSeek.map((w) => {
      return w.map((l) => {
        return {
          letter: l,
          color: '',
        }
      })
    });
  }

  // ------------- Getters --------------- //

  // ------------- Methods --------------- //

  private get generateRandomChar(): string {
    return String.fromCharCode(65+Math.floor(Math.random() * 26));
  }

  private wordSeekSolveSuccess(resp: WordSeekAPI[]): void {
    this.wordSeek.forEach((r) => {
      r.forEach((w) => {
        w.color = '';
      });
    });

    resp.forEach((r)=> {
      const word = this.word2Seek.find((w) => w.word === r.word);
      r.solution.forEach((res) => {
        res.location.map((resolution) => {
          const { col, row } = resolution.location;
          this.wordSeek[row][col].color = word?.color as string;
        });
      });
    });
  }

  // ------------- Triggers --------------- //

  public changeValue(value: string, r:number, c: number): void {
    this.wordSeek[r][c].letter = value;
  }

  public deleteWord({word}: IWord2Seek): void { 
    this.word2Seek = this.word2Seek.filter((e) => e.word !== word )
  }

  public addWord(): void {
    const word = this.formWord.getRawValue() as string;
    const color = this.formColor.getRawValue() as string;
    if (!word.length) return;
    this.word2Seek.push({ word, color });
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    this.formWord.setValue('');
    this.formColor.setValue(`#${randomColor}`);
  }

  public colorChange(e: Event, word: IWord2Seek): void {
    const target = e.target as unknown as HTMLInputElement;
    word.color = target.value;
  }

  public wordChange(e: Event, word: IWord2Seek): void {
    const target = e.target as unknown as HTMLInputElement;
    word.word = target.value;
  }

  public addCol(): void {
    this.wordSeek.forEach((r) => {
      r.push({
        letter: this.generateRandomChar,
        color: '',
      });
    });
  }

  public delCol(): void {
    this.wordSeek.forEach((r) => {
      r.pop();
    });
  }

  public addRow(): void {
    const row = this.wordSeek[0].map(() => {
      return {
        letter: this.generateRandomChar,
        color: '',
      }  
    });
    this.wordSeek.push(row);
  }

  public delRow(): void {
    this.wordSeek.pop();
  }

  public solve(): void {
    const dto: WordSeekDto = {
      words2find: this.word2Seek.map((w) => w.word),
      wordSearch: this.wordSeek.map((r) => r.map((c) => c.letter)),
    }

    this.wordSeekSolveRequest(dto);
  }

  // ------------- Connections --------------- //

  private wordSeekSolveRequest(dto: WordSeekDto): void {
    const a = this.wordSeekService.solveWordSeek(dto);
    this.wordSeekSolveSuccess(a as any);
    // this.wordSeekService.solveWordSeek(dto).subscribe({
    //   next: r => this.wordSeekSolveSuccess(r),
    //   error: e => console.log(e),
    // });
  }
}
