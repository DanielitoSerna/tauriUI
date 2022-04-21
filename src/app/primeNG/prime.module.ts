import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToastComponent} from "./toast/toast.component";
import {ToastModule} from "primeng/toast";
import {FormsModule} from "@angular/forms";
import {RippleModule} from "primeng/ripple";
import {MessageService} from "primeng/api";
import {TableModule} from 'primeng/table';
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {FileUploadModule} from "primeng/fileupload";
import {DragDropModule} from "primeng/dragdrop";
import {DropdownModule} from "primeng/dropdown";
import {AutoCompleteModule} from "primeng/autocomplete";
import {TooltipModule} from "primeng/tooltip";
import {PaginatorModule} from "primeng/paginator";
import { CalendarModule } from 'primeng/calendar';
import {CheckboxModule} from 'primeng/checkbox';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { TabViewModule } from 'primeng/tabview';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DividerModule } from "primeng/divider";
import {RadioButtonModule} from 'primeng/radiobutton';
import {PickListModule} from 'primeng/picklist';
import {DialogModule} from "primeng/dialog";
import {PanelModule} from 'primeng/panel';


@NgModule({
  declarations: [
    ToastComponent
  ],
  imports: [
    CommonModule,
    ToastModule,
    ButtonModule,
    RippleModule,
    FormsModule,
    TableModule,
    CardModule,
    FileUploadModule,
    DragDropModule,
    DropdownModule,
    AutoCompleteModule,
    TooltipModule,
    PaginatorModule,
    CalendarModule,
    CheckboxModule,
    InputNumberModule,
    InputTextareaModule,
    TabViewModule,
    BrowserAnimationsModule,
    DividerModule,
    RadioButtonModule,
    PickListModule,
    DialogModule,
    PanelModule
  ],
  exports: [
    ToastComponent,
    TableModule,
    CardModule,
    ButtonModule,
    FileUploadModule,
    DragDropModule,
    DropdownModule,
    AutoCompleteModule,
    TooltipModule,
    PaginatorModule,
    CalendarModule,
    CheckboxModule,
    InputNumberModule,
    InputTextareaModule,
    TabViewModule,
    BrowserAnimationsModule,
    DividerModule,
    RadioButtonModule,
    PickListModule,
    DialogModule,
    PanelModule
  ],
  providers: [
    MessageService
  ],
})
export class PrimeModule {
}
