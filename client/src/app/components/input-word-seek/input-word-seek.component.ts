import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-word-seek',
  templateUrl: './input-word-seek.component.html',
  styleUrls: ['./input-word-seek.component.scss'],
})
export class InputWordSeekComponent {
  @Input() value=generateRandomWord();
}

const generateRandomWord = (): string => {
  return String.fromCharCode(65+Math.floor(Math.random() * 26));
}