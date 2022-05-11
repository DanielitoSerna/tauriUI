import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alerts',
  templateUrl: './app-alerts.component.html',
  styleUrls: ['./app-alerts.component.scss']
})
export class AppAlertsComponent implements OnInit {

  @Input() text: string = '';
  @Input() type: string = 'info';
  @Output() change = new EventEmitter<any>();

  iconType: string = '';

  constructor() { }

  ngOnInit(): void {
    this.setIcon();
    document.getElementById("app-alert")?.focus();
  }

  close() {
    this.change.emit();
  }

  setIcon() {
    switch (this.type) {
      case 'info':
        this.iconType = 'info-circle'
        break;
      case 'success':
        this.iconType = 'star-fill'
        break;
      case 'warning':
        this.iconType = 'exclamation-triangle'
        break;
      case 'danger':
        this.iconType = 'times-circle'
        break;
    }
  }

}
