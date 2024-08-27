import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AudioPlayerService } from '../shared/services/audio-player.service';
import { IAudioData } from '../shared/interfaces/audio-record.interface';

@Component({
  selector: 'app-audios',
  templateUrl: './audios.component.html',
  styleUrls: ['./audios.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudiosComponent {
  audioData!: IAudioData;

  constructor(public audioPlayerService: AudioPlayerService) {}
}
