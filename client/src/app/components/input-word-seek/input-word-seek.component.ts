import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-word-seek',
  templateUrl: './input-word-seek.component.html',
  styleUrls: ['./input-word-seek.component.scss'],
})
export class InputWordSeekComponent {
  @Input() value!: string;
  @Input() color!: string;
  @Output() changeValue = new EventEmitter<string>();

  public change(event: Event): void {
    const value = (event.target as HTMLInputElement)?.value;
    this.changeValue.emit(value);
  }
}
