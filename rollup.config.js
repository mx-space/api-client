//@ts-check
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { terser } from 'rollup-plugin-terser'

const packageJson = require('./package.json')

const umdName = packageJson.name

const globals = {
  ...packageJson.devDependencies,
}

const dir = 'build'

/**
 * @type {import('rollup').RollupOptions[]}
 */
const config = [
  {
    input: 'src/index.ts',
    // ignore lib
    external: ['lodash', 'lodash-es', ...Object.keys(globals)],

    output: [
      {
        file: dir + '/index.umd.js',
        format: 'umd',
        sourcemap: true,
        name: umdName,
      },
      {
        file: dir + '/index.umd.min.js',
        format: 'umd',
        sourcemap: true,
        name: umdName,
        plugins: [terser()],
      },
      {
        file: dir + '/index.cjs.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: dir + '/index.cjs.min.js',
        format: 'cjs',
        sourcemap: true,
        plugins: [terser()],
      },
      {
        file: dir + '/index.esm.js',
        format: 'es',
        sourcemap: true,
      },
      {
        file: dir + '/index.esm.min.js',
        format: 'es',
        sourcemap: true,
        plugins: [terser()],
      },
    ],
    plugins: [
      nodeResolve(),
      commonjs({ include: 'node_modules/**' }),
      typescript({ tsconfig: './src/tsconfig.json', declaration: false }),

      // @ts-ignore
      peerDepsExternal(),
    ],

    treeshake: true,
  },
]

export default config
