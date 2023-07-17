import { Component, Output, EventEmitter, Input } from "@angular/core";

type OutputEventType = { [index: string]: any } | number | string;

@Component({
  // tslint:disable-next-line: component-selector
  selector: "drewlabs-datgrid-header",
  templateUrl: "./datgrid-header.component.html",
  styles: [],
})
export class DatgridHeaderComponent {
  // Component outputs properties
  @Output() createEvent = new EventEmitter<OutputEventType>();
  @Output() refreshEvent = new EventEmitter<OutputEventType>();
  @Output() exportToExcelEvent = new EventEmitter<OutputEventType>();
  @Output() assigned = new EventEmitter<OutputEventType>();

  // Component input properties
  @Input() createButtonDisabled = false;
  @Input() refreshButtonDisabled = false;
  @Input() excelDropDownDisabled = false;
  @Input() showExportDropdown = false;
  @Input() buttonClass = "btn btn-sm btn-secondary";

  @Input() showCreate = true;
  @Input() showRefresh = true;
}
