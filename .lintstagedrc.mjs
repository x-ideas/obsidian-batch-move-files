export default {
  '*.md': 'prettier --write',
  '*.{ts,js,cjs,mjs,tsx}': ['eslint --fix', 'prettier --write'],
};
