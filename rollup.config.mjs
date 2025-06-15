import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';

export default [
  // JS bundle: ESM, UMD, and minified
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/browserux-theme-switcher.esm.js',
        format: 'es',
        sourcemap: true
      },
      {
        file: 'dist/browserux-theme-switcher.umd.js',
        format: 'umd',
        name: 'BuxThemeSwitcher',
        sourcemap: true
      },
      {
        file: 'dist/browserux-theme-switcher.min.js',
        format: 'umd',
        name: 'BuxThemeSwitcher',
        plugins: [terser()],
        sourcemap: false
      }
    ],
    plugins: [
      nodeResolve(),
      typescript({ tsconfig: './tsconfig.json' })
    ]
  },

  // Type declarations
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/browserux-theme-switcher.d.ts',
      format: 'es'
    },
    plugins: [dts()]
  }
];
