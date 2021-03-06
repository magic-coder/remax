import API from '../../API';
import rollupConfig from '../../build/rollupConfig';
import defaultOptions from '../../defaultOptions';

jest.mock('../../getEntries', () => () => ({
  app: 'app.js',
  pages: [],
  images: [],
}));

describe('rollupConfig', () => {
  it('override rollup options', () => {
    API.registerAdapterPlugins('alipay');
    const options = rollupConfig(
      {
        ...defaultOptions,
        rollupOptions: {
          treeshake: true,
        },
      },
      {}
    );

    expect(options.treeshake).toBe(true);
  });

  it('override rollup options with function', () => {
    const options = rollupConfig(
      {
        ...defaultOptions,
        rollupOptions: options => {
          (options.input as string[]).push('foo.js');
          return options;
        },
      },
      {}
    );

    expect(options.input).toEqual(['app.js', 'foo.js']);
  });
});
