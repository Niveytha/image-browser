import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
const electron = (<any>window).require('electron');

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  images = new BehaviorSubject<string[]>([]);
  directory = new BehaviorSubject<string[]>([]);

  constructor() {
    // register listeners for IPC messages
    electron.ipcRenderer.on('getImagesResponse', (_event: any, images: string[]) => {
      this.images.next(images); // receive an array of image URLs
    });

    electron.ipcRenderer.on('getDirectoryResponse', (_event: any, directory: string[]) => {
      this.directory.next(directory); // receive an array of directory names
    });
  }

  navigateDirectory(path: any) {
    // send a request to the Node application to navigate to a different directory
    electron.ipcRenderer.send('navigateDirectory', path);
  }
}