const { join } = require('path');
const { createGlobPatternsForDependencies } = require('@nrwl/workspace/src/utilities/generate-globs');

module.exports = {
  content: [
    join(__dirname, "src/**/!(*.stories|*.spec).{ts,vue}"),
    ...createGlobPatternsForDependencies(__dirname, '/**/!(*.stories|*.spec).{ts,vue}')
  ],
  presets: [require('../../tailwind-workspace-preset.js')]
};
