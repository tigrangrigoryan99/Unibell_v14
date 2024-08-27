import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

import {
  IAudioData,
  IAudioRecord,
} from 'src/app/shared/interfaces/audio-record.interface';
import { AudioPlayerService } from 'src/app/shared/services/audio-player.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { AudiosService } from '../audios.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { finalize, skip } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-audio-list',
  templateUrl: './audio-list.component.html',
  styleUrls: ['./audio-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudioListComponent implements OnInit, OnDestroy {
  @Output() audioDataEmitter = new EventEmitter<IAudioData>();

  audioRecords: IAudioRecord[] = [];
  displayedColumns: string[] = ['id', 'name', 'fileName'];
  audioPlayIsHidden = true;

  constructor(
    public spinnerService: SpinnerService,
    public audioPlayerService: AudioPlayerService,
    private audiosService: AudiosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.spinnerService.toggleSpinner(true);
    this.audiosService
      .getSounds()
      .pipe(
        untilDestroyed(this),
        finalize(() => {
          this.spinnerService.toggleSpinner(false);
          this.cdr.markForCheck();
        })
      )
      .subscribe((resalts: IAudioRecord[]) => {
        this.audioRecords = resalts;
        this.cdr.markForCheck();
      });

    this.subscribeToSubjectChanges();
  }

  ngOnDestroy(): void {}

  playAudio(record: IAudioRecord): void {
    if (record.playerSrc) {
      this.audioDataEmitter.emit({ src: record.playerSrc });
      this.audioPlayerService.setRowId(record.id);
      this.audioPlayIsHidden && this.audioPlayerService.togglePlayer(true);
      this.cdr.markForCheck();
    }
  }

  private subscribeToSubjectChanges(): void {
    this.audioPlayerService.showAudioPlayer$
      .pipe(untilDestroyed(this), skip(1))
      .subscribe((value: boolean) => (this.audioPlayIsHidden = !value));
  }
}
