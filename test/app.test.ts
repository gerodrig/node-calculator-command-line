// process.argv = ['node', 'app.ts', '-b', '10'];
// import './app'

import { ServerApp } from '../src/presentation/server-app';

describe('Tests in App.ts', () => {
  it('should call server run with values', async () => {
    const serverRunMock = jest.fn();
    ServerApp.run = serverRunMock;
    process.argv = [
      'node',
      'app.ts',
      '-b',
      '10',
      'l',
      '20',
      '-s',
      '-n',
      'test',
      '-d',
      'test',
    ];

    await import('../src/app');

    expect(serverRunMock).toHaveBeenCalledWith({
      base: 10,
      limit: 20,
      showTable: true,
      name: 'test',
      destination: 'test',
    });
  });
});
