import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';

import { AudioPlayerService } from '../../services/audio-player.service';
import { IAudioData } from '../../interfaces/audio-record.interface';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent implements OnChanges {
  @ViewChild('audioPlayer', { static: true }) audioPlayer!: ElementRef<HTMLAudioElement>;

  @Input() audioData!: IAudioData;

  constructor(private audioPlayerService: AudioPlayerService) {}

  ngOnChanges(): void {
    this.updateAudio();
  }

  onAudioEnded(): void {
    setTimeout(() => {
      this.audioPlayerService.togglePlayer(false);
      this.audioPlayerService.setRowId(null);
    }, 700);
  }

  private updateAudio(): void {
    const audio: HTMLAudioElement = this.audioPlayer.nativeElement;
    audio.load();
    audio.play();
  }
}
