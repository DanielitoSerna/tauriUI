import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {Location} from '@angular/common';
import { AppService } from '../../app.services';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.scss']
})
export class EliminarComponent implements OnInit {

  @Input() alimento:any = {};
  @Input() visible = true;
  @Output() eliminar = new EventEmitter<any>();

  constructor(private service: AppService) {}

  ngOnInit(): void {

  }

  no() {
    this.eliminar.emit(null);
    this.visible = false;
  }

  si() {
    if (this.alimento.id != null) {
      this.service.eliminarBiblioteca(this.alimento.id).then(data => {
        this.eliminar.emit(this.alimento);
        this.visible = false;
      });
    }
  }
}
