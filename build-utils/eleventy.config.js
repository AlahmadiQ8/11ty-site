const loadLanguages = require('prismjs/components/');


const readingTime = require('eleventy-plugin-reading-time');
const { format } = require('date-fns');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight', {
  init: ({ Prism }) => {
    loadLanguages(['haml', 'zsh', 'csharp', 'bash']);
    require('prismjs/components/prism-bash')
  }
});

module.exports = function(eleventy) {

  let markdownIt = require("markdown-it");
  let options = {
    html: true
  };
  let markdownLib = markdownIt(options).use(require('markdown-it-anchor'));
  
  eleventy.setLibrary("md", markdownLib);

  eleventy.addPlugin(readingTime);
  eleventy.addPlugin(syntaxHighlight);

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
