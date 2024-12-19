const { ESLint } = require('eslint');

const buildEslintCommand = async (filenames) => {
  const eslint = new ESLint();
  try {
    const legitFiles = await Promise.all(
      filenames.filter(async (file) => eslint.isPathIgnored(file))
    );

    return `eslint --fix ${legitFiles.join(' ')}`;
  } catch (error) {
    console.log(error);
  }
};

const buildPrettierCommand = (filenames) => {
  return `prettier --write ${filenames.join(' ')}`;
};

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand, buildPrettierCommand],
};
