import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { word2Seek, wordSeek } from './constants/word-seek.constants';
import { IWord2Seek, IWordSeek } from './interface/word-seek.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public title = 'word seek';
  public wordSeek!:IWordSeek[][];
  public word2Seek= word2Seek;
  @ViewChild('inputWord') inputWord!: ElementRef;
  
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

  // ------------- Triggers --------------- //

  public deleteWord({word}: IWord2Seek): void { 
    this.word2Seek = this.word2Seek.filter((e) => e.word !== word )
  }

  public addWord(): void {
    console.log(this.inputWord)
  }

  public colorChange(e: Event, word: IWord2Seek): void {
    const target = e.target as unknown as HTMLInputElement;
    word.color = target.value;
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
    console.log(this.wordSeek)
    console.log(this.word2Seek);
  }

  // ------------- Connections --------------- //

}
