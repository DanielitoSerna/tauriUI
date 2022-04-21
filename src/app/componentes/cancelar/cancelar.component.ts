import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-cancelar',
  templateUrl: './cancelar.component.html',
  styleUrls: ['./cancelar.component.scss']
})
export class CancelarComponent implements OnInit {

  @Input() visible = true;
  @Output() change = new EventEmitter<any>();

  constructor(private _location: Location) {}

  ngOnInit(): void {

  }

  close() {
    this.change.emit();
    this.visible = false;
  }

  atras() {
    this._location.back();
  }
}
