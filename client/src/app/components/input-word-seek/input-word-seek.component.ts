import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-word-seek',
  templateUrl: './input-word-seek.component.html',
  styleUrls: ['./input-word-seek.component.scss'],
})
export class InputWordSeekComponent {
  @Input() value!: string;
  @Input() color!: string;
}
