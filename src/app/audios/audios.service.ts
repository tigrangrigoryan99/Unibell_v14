import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { IAudioRecord } from '../shared/interfaces/audio-record.interface';
import { IResults, ISounds } from '../shared/interfaces/sounds.interface';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AudiosService {
  constructor(private http: HttpClient) {}

  getSounds(query = 'classic', pageSize = '4'): Observable<IAudioRecord[]> {
    const params = new HttpParams()
      .set('query', query)
      .set('page_size', pageSize)
      .set('fields', 'id,name,previews');

    return this.http
      .get<ISounds>(`${environment.API_URL}?${params.toString()}`)
      .pipe(
        map((response: ISounds) =>
          response.results.map((result: IResults) => ({
            id: result.id,
            name: result.name,
            fileName: result.previews?.['preview-hq-mp3'] ?? 'Аудиофайл не доступен !',
            playerSrc: result.previews?.['preview-hq-mp3'] ?? '',
            validMp3: !!result.previews?.['preview-hq-mp3'],
          }))
        )
      );
  }
}
