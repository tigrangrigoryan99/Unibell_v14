import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { PlayerComponent } from './components/player/player.component';

@NgModule({
  declarations: [
    // Components
    SpinnerComponent,
    PlayerComponent,
  ],
  imports: [CommonModule, MatTableModule, MatProgressSpinnerModule],
  exports: [
    // Components
    SpinnerComponent,
    PlayerComponent,

    // Modules
    CommonModule,
    MatTableModule,
    MatProgressSpinnerModule,
  ],
})
export class SharedModule {}
