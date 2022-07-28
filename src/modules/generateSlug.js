const slugify = require('slugify')

const generateSlug = (text) => {
 return slugify(text, {
    replacement: '-',
    lower: true
  })
}

module.exports = generateSlug