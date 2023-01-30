module.exports = {
  displayName: 'smeet',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\.vue$': '@vue/vue3-jest',
    '.+\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ["ts", "tsx", "vue", "js", "json"],
  coverageDirectory: '../../coverage/apps/smeet',
  snapshotSerializers: ['jest-serializer-vue'],
  globals: {
    'ts-jest': { 
      tsconfig: 'apps/smeet/tsconfig.spec.json',
    },
    'vue-jest': {
      tsConfig: 'apps/smeet/tsconfig.spec.json',
    }
  },
};
