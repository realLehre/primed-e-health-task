import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  save(data: { key: string; value: any }) {
    localStorage.setItem(data.key, JSON.stringify(data.value));
  }

  get(key: string) {
    return JSON.parse(localStorage.getItem(key)!);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}
