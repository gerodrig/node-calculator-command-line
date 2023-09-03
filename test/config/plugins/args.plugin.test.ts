const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args];
  const { yarg } = await import('../../../src/config/plugins/args.plugin');

  return yarg;
};

describe('Tests in args.plugin.ts', () => {

    const originalArgv = process.argv;

    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    });

  test('Should return default values', async() => {

    const argv = await runCommand(['-b', '5']);
    expect(argv).toEqual(expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        n: 'multiplication-table',
        d: 'outputs'
    }));

  });

  test('Should return configuration with custom values', async() => {

    const argv = await runCommand(['-b', '10', '-l', '30', '-s', '-n', 'test', '-d', 'test']);

    expect(argv).toEqual(expect.objectContaining({
        b: 10,
        l: 30,
        s: true,
        n: 'test',
        d: 'test'
    }));
  });
});
