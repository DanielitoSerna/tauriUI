import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AppService } from '../../app.services';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.scss']
})
export class InformacionComponent implements OnInit {

  @Input() visible = true;
  @Input() tipo = '';
  @Output() closed = new EventEmitter<any>();

  public text = '';

  constructor(private service: AppService) {}

  ngOnInit(): void {}

  cancelar() {
    this.visible = false;
    this.closed.emit();
  }
}
