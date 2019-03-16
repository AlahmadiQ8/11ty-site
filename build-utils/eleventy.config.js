module.exports = function(eleventy) {
  return {
    dir: {
      input: 'src',
      output: '_site'
    },
    templateFormats: ['njk', 'md', 'jpg'],
    passthroughFileCopy: true
  };
};
