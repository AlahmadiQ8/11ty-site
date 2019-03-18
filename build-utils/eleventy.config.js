const readingTime = require('eleventy-plugin-reading-time');
const { format } = require('date-fns');

module.exports = function(eleventy) {
  eleventy.addPlugin(readingTime);

  eleventy.addFilter('formatDate', (dateStr, dateFormat) => {
    return format(new Date(dateStr), dateFormat);
  });

  eleventy.addCollection('post', collection => {
    return collection.getFilteredByGlob('**/posts/*.md').reverse();
  });
  eleventy.addCollection('project', collection => {
    return collection.getFilteredByGlob('**/projects/*.md').reverse();
  });
  eleventy.addCollection('note', collection => {
    return collection.getFilteredByGlob('**/notes/*.md').reverse();
  });

  return {
    dir: {
      input: 'src',
      output: '_site'
    },
    templateFormats: ['njk', 'md', 'jpg', 'png'],
    passthroughFileCopy: true
  };
};
