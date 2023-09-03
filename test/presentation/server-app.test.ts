import { ServerApp } from '../../src/presentation/server-app';
import { CreateTable } from '../../src/domain/use-cases/create-table.use-case';
import { SaveFile } from '../../src/domain/use-cases/save-file.use-case';

describe('Server App', () => {

    const options = {
        base: 2,
        limit: 10,
        showTable: false,
        name: 'test-destination',
        destination: 'test-filename'
    };

    
    test('should create ServerApp instance', () => {
        const serverApp = new ServerApp();

        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(ServerApp.run).toBeInstanceOf(Function);
    });

    test('should run ServerApp with options', () => {

        const logSpy = jest.spyOn(console, 'log');
        const CreateTableSpy = jest.spyOn( CreateTable.prototype, 'execute' );
        const saveFileSpy = jest.spyOn( SaveFile.prototype, 'execute' );

        ServerApp.run(options);

        expect(logSpy).toHaveBeenCalledTimes(2);
        expect(logSpy).toHaveBeenCalledWith('Server running...');
        expect(logSpy).toHaveBeenLastCalledWith('File Created!');

        expect(CreateTableSpy).toHaveBeenCalledTimes(1);
        expect(CreateTableSpy).toHaveBeenCalledWith({base: options.base, limit: options.limit});

        expect(saveFileSpy).toHaveBeenCalledTimes(1);
        expect(saveFileSpy).toHaveBeenCalledWith({fileContent: expect.any(String), destination: options.destination, fileName: options.name});
    });

    test('should run with custom values mocked', () => {

        const logMock = jest.fn();
        const createMock = jest.fn().mockReturnValue('1 x 2 = 2');
        const saveFileMock = jest.fn().mockReturnValue(true);

        console.log = logMock;
        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFileMock;


        ServerApp.run(options);

        expect(logMock).toHaveBeenCalledWith('Server running...');
        expect( createMock ).toHaveBeenCalledWith({base: options.base, limit: options.limit});
        expect(saveFileMock).toHaveBeenCalledWith({fileContent: '1 x 2 = 2', destination: options.destination, fileName: options.name});
    });

});