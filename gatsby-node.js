const _ = require('lodash')
const axios = require('axios')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              categories
              author {
                name
                slug
              }
              templateKey
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges

    posts.forEach(edge => {
      const id = edge.node.id
      createPage({
        path: edge.node.fields.slug,
        categories: edge.node.frontmatter.categories,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      })
    })

    // category pages:
    let categories = []
    // Iterate through each post, putting all found categories into `categories`
    posts.forEach(edge => {
      if (_.get(edge, `node.frontmatter.categories`)) {
        categories = categories.concat(edge.node.frontmatter.categories)
      }
    })
    // Eliminate duplicate categories
    categories = _.uniq(categories)

    // Make category pages
    categories.forEach(category => {
      const categoriePath = `/categories/${_.kebabCase(category)}/`

      createPage({
        path: categoriePath,
        component: path.resolve(`src/templates/tags.js`),
        context: {
          category,
        },
      })
    })

    // author pages:
    let authors = []
    // Iterate through each post, putting all found authors into `authors`    
    posts.forEach(edge => {
      if (_.get(edge, `node.frontmatter.author`)) {
        authors = authors.concat(edge.node.frontmatter.author.name)
      }
    })
    // Eliminate duplicate categories
    authors = _.uniq(authors)

    // Make category pages
    authors.forEach(author => {
      const authorPath = `/author/${_.kebabCase(author)}/`

      createPage({
        path: authorPath,
        component: path.resolve(`src/templates/tags.js`),
        context: {
          author,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest
}) => {
  const { createNode } = actions

  const blogPosts = await axios.get(
    `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/kata-containers`
  ).then((response) => {
    return response.data.items.slice(0, 3);
  });
  
  for (const post of blogPosts) {    
    const nodeContent = JSON.stringify(post)

    const nodeMeta = {
      id: createNodeId(`medium-post-${post.guid}`),
      parent: null,
      children: [],
      internal: {
        type: `MediumPost`,
        mediaType: `application/json`,
        content: nodeContent,
        contentDigest: createContentDigest(post)
      }
    }

    const node = Object.assign({}, post, nodeMeta)
    createNode(node)
  }
}