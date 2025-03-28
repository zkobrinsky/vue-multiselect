import vue from 'rollup-plugin-vue'
import css from 'rollup-plugin-css-only'

import fs from 'fs'
import { minify } from 'csso'

export default [
  // ESM build to be used with webpack/rollup.
  {
    input: 'src/index.js',
    output: {
      format: 'esm',
      file: 'dist/vue-multiselect.esm.js'
    },
    plugins: [
      css({ output: 'vue-multiselect.esm.css' }),
      vue()
    ]
  },
  // SSR build.
  {
    input: 'src/index.js',
    output: {
      format: 'cjs',
      file: 'dist/vue-multiselect.ssr.js'
    },
    plugins: [
      css({ output: 'vue-multiselect.ssr.css' }),
      vue({ template: { optimizeSSR: true } })
    ]
  },
  // Browser build.
  {
    input: 'src/index.js',
    output: {
      format: 'iife',
      file: 'dist/vue-multiselect.js',
      name: 'VueMultiselect',
      external: ['vue'],
      globals: {
        vue: 'Vue'
      }
    },
    plugins: [
      css({
        output: function (styles) {
          fs.writeFileSync('dist/vue-multiselect.css', styles)
          fs.writeFileSync('dist/vue-multiselect.min.css', minify(styles).css)
        }
      }),
      vue()
    ]
  }
]
