import { createWriteStream } from 'fs';
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
  }: SaveFileOptions) {
    //if file does not exist, it will be created

    try {
      const output = createWriteStream(join(destination, `${fileName}.txt`));

      output.write(fileContent);
      output.end();
      //wait 2 seconds for console log
        setTimeout(() => console.log('File created'), 500);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
