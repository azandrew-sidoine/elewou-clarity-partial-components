import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'drewlabs-datgrid-header',
  templateUrl: './datgrid-header.component.html',
  styles: [
  ],
})
export class DatgridHeaderComponent {

  // Component outputs properties
  @Output() createEvent = new EventEmitter<object>();
  @Output() refreshEvent = new EventEmitter<object>();
  @Output() exportToExcelEvent = new EventEmitter<object>();
  @Output() assigned = new EventEmitter<object>();

  // Component input properties
  @Input() createButtonDisabled = false;
  @Input() refreshButtonDisabled = false;
  @Input() excelDropDownDisabled = false;
  @Input() showExportDropdown = false;
  @Input() buttonClass = 'btn btn-sm btn-secondary';
  @Input() exportButtonText = 'Exporter les données';
  @Input() exportButtonDisabled = false;
}
