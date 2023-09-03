import fs from 'fs';
import { join } from 'path';

export interface SaveFileUseCase {
  execute(options: SaveFileOptions): boolean;
}

export interface SaveFileOptions {
  fileContent: string;
  destination?: string;
  fileName?: string;
}

export class SaveFile implements SaveFileUseCase {
  constructor() {} //Dependency injection - DI

  execute({
    fileContent,
    destination = 'outputs',
    fileName = 'table',
  }: SaveFileOptions): boolean {
    //if file does not exist, it will be created

    try {
      fs.mkdirSync(destination, { recursive: true });
      fs.writeFileSync(`${destination}/${fileName}.txt`, fileContent);
      console.log('File Created!');
      //wait 2 seconds for console log
        // setTimeout(() => console.log('File created'), 500);
      return true;
    } catch (error) {
      // console.error(error);
      return false;
    }
  }
}
