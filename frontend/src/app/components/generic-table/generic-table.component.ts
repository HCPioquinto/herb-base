import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent implements OnInit {
  @Input() tableHeaders: string[];
  @Input() tableData: any;
  @Input() exemptedKeys: any[];
  @Input() isShowActions: false;
  @Input() showActions: {
    trash: false,
    check: false,
    archive: false,
  };

  @Output() trashAction = new EventEmitter();
  @Output() checkAction = new EventEmitter();
  @Output() archiveAction = new EventEmitter();
  @Output() rowAction: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.usePerfectScrollbar();
  }

  usePerfectScrollbar(): void {
    const ps = new PerfectScrollbar('#generic-table');
  }

  keyExemptionChecker(key: string) : boolean {
    return !(this.exemptedKeys.includes(key));
  }

  onCheckClick(event): void {
    this.checkAction.emit(event);
  }

  onTrashClick(event): void {
    console.log('event', event)
    this.trashAction.emit(event);
  }

  onArchiveClick(event): void {
    this.archiveAction.emit(event);
  }

  onRowClick(event): void {
    this.rowAction.emit(event);
  }
}
