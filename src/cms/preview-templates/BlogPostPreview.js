import React from 'react'
import PropTypes from 'prop-types'
import { BlogPostTemplate } from '../../templates/blog-post'

const BlogPostPreview = ({ entry, widgetFor }) => {
  return (
    <BlogPostTemplate
      content={widgetFor('body')}
      title={entry.getIn(['data', 'title'])}
      author={{
        name: entry.getIn(['data', 'author', 'name']),
        slug: entry.getIn(['data', 'author', 'slug'])
      }}
      date={entry.getIn(['data', 'date'])}
    />
  )
}

BlogPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default BlogPostPreview
