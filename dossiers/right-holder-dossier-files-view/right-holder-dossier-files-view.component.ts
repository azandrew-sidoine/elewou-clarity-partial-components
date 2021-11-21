import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, Inject } from '@angular/core';
import { FileHelperService, TypeUtilHelper } from 'src/app/lib/domain/helpers';
import { createStateful } from 'src/app/lib/domain/rxjs/helpers';
import { doLog } from 'src/app/lib/domain/rxjs/operators';
import * as strings from 'src/app/lib/domain/utils/types/strings';
import { imagesMimeExtensions } from '../../partials-configs';
import { RightHolderDossier } from '../state/models/dossier';

@Component({
  selector: 'app-right-holder-dossier-files-view',
  templateUrl: './right-holder-dossier-files-view.component.html',
  styleUrls: ['./right-holder-dossier-files-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightHolderDossierFilesViewComponent implements OnInit {

  private _rightHolderDossiers: RightHolderDossier[];
  @Input() set rightHolderDossiers(values: RightHolderDossier[]) {
    this._rightHolderDossiers = values;
    if (values && values.length > 0) {
      Promise.all(values.map(value => {
        const { name, url, label } = value.file;
        return { name, url, label, dossier_id: value?.dossierId, file_id: value?.fileId, id: value.fileId, extension: name ? strings.afterLast('.', name) : '' };
      }).map(async (file) => {
        const { name, label, url, id, extension, dossier_id, file_id } = file;
        const result = await this.fileHelper.urlToServerFileInterface(url, { name: label || name, id, extension });
        return { ...result, isImageRessource: [...imagesMimeExtensions].includes(result.extension), dossier_id, file_id };
      })).then(files => {
        this._state$.next(files);
      });
    }
  }
  @Input() performingAction =  false;
  @Input() showTrashButton = false;
  @Output() addDossierRightHolderToTrash = new EventEmitter<{ file_id: number | string, endpointURL: string, curr: RightHolderDossier[]}>();

  _state$ = createStateful<Array<Partial<{
    id: number | string,
    name: string,
    shouldDownload: boolean,
    extension: string,
    file_id: number,
    dossier_id: string
  }>>>([]);

  state$ = this._state$.asObservable().pipe(
    doLog('<RightHolderDossierFilesViewComponent> state: ')
  )

  constructor(
    public readonly fileHelper: FileHelperService,
    public readonly typeHelper: TypeUtilHelper,
    @Inject('RIGHT_HOLDER_DOSSIER_ENPOINT') private endpointURL: string,
  ) { }

  ngOnInit(): void { }

  onPutFileToTrash(id: number | string) {
    this.addDossierRightHolderToTrash.emit({file_id: id, endpointURL: this.endpointURL, curr: this._rightHolderDossiers});
  }

}
