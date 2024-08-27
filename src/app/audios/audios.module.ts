import { NgModule } from '@angular/core';

import { AudiosComponent } from './audios.component';
import { AudioListComponent } from './audio-list/audio-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AudiosComponent, AudioListComponent],
  imports: [SharedModule],
  exports: [AudiosComponent],
})
export class AudiosModule {}
