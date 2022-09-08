// @ts-check
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { terser } from 'rollup-plugin-terser'

import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

const packageJson = require('./package.json')

const umdName = packageJson.name

const globals = {
  ...packageJson.devDependencies,
  ...packageJson.dependencies,
}

const dir = 'build'

/**
 * @type {import('rollup').RollupOptions[]}
 */
const config = [
  {
    input: './index.ts',
    // ignore lib
    external: ['lodash', 'lodash-es', ...Object.keys(globals)],

    output: [
      {
        file: `${dir}/index.umd.js`,
        format: 'umd',
        sourcemap: true,
        name: umdName,
      },
      {
        file: `${dir}/index.umd.min.js`,
        format: 'umd',
        sourcemap: true,
        name: umdName,
        plugins: [terser()],
      },
      {
        file: `${dir}/index.cjs`,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: `${dir}/index.min.cjs`,
        format: 'cjs',
        sourcemap: true,
        plugins: [terser()],
      },
      {
        file: `${dir}/index.js`,
        format: 'es',
        sourcemap: true,
      },
      {
        file: `${dir}/index.min.js`,
        format: 'es',
        sourcemap: true,
        plugins: [terser()],
      },
    ],
    plugins: [
      nodeResolve(),
      commonjs({ include: 'node_modules/**' }),
      typescript({ tsconfig: './tsconfig.json', declaration: false }),

      // @ts-ignore
      peerDepsExternal(),
    ],

    treeshake: true,
  },
]

// eslint-disable-next-line import/no-default-export
export default config
