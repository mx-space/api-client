// @ts-check
import globby from 'globby'
import path from 'path'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { terser } from 'rollup-plugin-terser'

import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

const packageJson = require('./package.json')

const umdName = packageJson.name

const globals = {
  ...packageJson.devDependencies,
  // @ts-ignore
  ...(packageJson.dependencies || []),
}

const dir = 'dist'

/**
 * @type {Partial<import('rollup').RollupOptions>}
 */
const baseRollupConfig = {
  plugins: [
    nodeResolve(),
    commonjs({ include: 'node_modules/**' }),
    typescript({ tsconfig: './tsconfig.json', declaration: false }),

    // @ts-ignore
    peerDepsExternal(),
  ],
  external: [...Object.keys(globals), 'lodash', 'lodash-es'],
  treeshake: true,
}

/**
 * @returns {import('rollup').RollupOptions[]}
 */
const buildAdaptorConfig = () => {
  const paths = globby.sync('./adaptors/*.ts')
  const filename = (path_) => path.parse(path_.split('/').pop()).name
  return paths.map((path) => ({
    input: path,
    output: [
      {
        file: `${dir}/adaptors/${filename(path)}.umd.js`,
        format: 'umd',
        sourcemap: true,
        name: umdName,
      },
      {
        file: `${dir}/adaptors/${filename(path)}.umd.min.js`,
        format: 'umd',
        sourcemap: true,
        name: umdName,
        plugins: [terser()],
      },
      {
        file: `${dir}/adaptors/${filename(path)}.cjs`,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: `${dir}/adaptors/${filename(path)}.min.cjs`,
        format: 'cjs',
        sourcemap: true,
        plugins: [terser()],
      },
      {
        file: `${dir}/adaptors/${filename(path)}.js`,
        format: 'es',
        sourcemap: true,
      },
      {
        file: `${dir}/adaptors/${filename(path)}.min.js`,
        format: 'es',
        sourcemap: true,
        plugins: [terser()],
      },
    ],
    ...baseRollupConfig,
  }))
}

/**
 * @type {import('rollup').RollupOptions[]}
 */
const config = [
  {
    input: './index.ts',

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
    ...baseRollupConfig,
  },
  ...buildAdaptorConfig(),
]

// eslint-disable-next-line import/no-default-export
export default config
