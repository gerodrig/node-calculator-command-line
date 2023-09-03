import fs from 'fs';
import path from 'path';
import { SaveFile } from '../../../src/domain/use-cases/save-file.use-case';

describe('save file use caste', () => {

    const customOptions = {
        fileContent: 'test content',
        destination: 'custom-outputs',
        fileName: 'custom-table-name',
      };
    const customFilePath = `${customOptions.destination}/${customOptions.fileName}.txt`;
  
  // beforeEach(() => {
  //       // Create the outputs directory if it doesn't exist
  //       const outputDir = path.resolve(__dirname, '../../../outputs');
  //       if (!fs.existsSync(outputDir)) {
  //           fs.mkdirSync(outputDir);
  //       }
  // });

  afterEach(() => {
    // Clean outputs folder
    const outputFolderExists = fs.existsSync('outputs');
    const customOutputFolderExists = fs.existsSync('custom-outputs');
    if (outputFolderExists)
      fs.rmSync('outputs', { recursive: true, force: true });

    if (customOutputFolderExists)
      fs.rmSync('custom-outputs', { recursive: true, force: true });
  });

  test('should save file with default values', () => {
    const saveFile = new SaveFile();
    const filePath = 'outputs/table.txt';
    const options = {
      fileContent: 'test content',
    };

    const result = saveFile.execute(options);

    expect(result).toBe(true);
    const checkFile = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

    expect(checkFile).toBe(true);
    expect(fileContent).toBe(options.fileContent);
  });

  test('should save file with custom values', () => {

    const saveFile = new SaveFile();

    const result = saveFile.execute(customOptions);

    expect(result).toBe(true);
    const checkFile = fs.existsSync(customFilePath);
    const fileContent = fs.readFileSync(customFilePath, { encoding: 'utf-8' });

    expect(checkFile).toBe(true);
    expect(fileContent).toBe(customOptions.fileContent);
  });

  test('should return false if file could not be saved', () => {

    const saveFile = new SaveFile();
    const mkdirMock = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
        throw new Error('This is a custom error message from testing');
        });

    const result = saveFile.execute(customOptions);

    expect(result).toBe(false);

    //clear spyon
    mkdirMock.mockRestore();

  });

  test('should return false if file could not be created', () => {

    const saveFile = new SaveFile();
    const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {
        throw new Error('This is a custom writing error message from testing');
        });

    const result = saveFile.execute({fileContent: 'Test content'});

    expect(result).toBe(false);

    //clear spyon
    writeFileSpy.mockRestore();

  });


});
