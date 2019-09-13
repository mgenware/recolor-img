import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

const isProd = process.env.NODE_ENV == 'production';

const tsPlugins = [
  resolve({
    browser: true,
  }),
  commonjs(),
  typescript({ cacheRoot: require('unique-temp-dir')() }),
];

if (isProd) {
  tsPlugins.push(terser());
}

export default {
  input: 'src/main.ts',
  output: {
    name: 'recolorImg',
    file: 'dist/main.js',
    format: 'umd',
    exports: 'named',
    sourcemap: true,
  },
  plugins: tsPlugins,
};
