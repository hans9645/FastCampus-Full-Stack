// @ts-check

/**
 * @typedef Post
 * @property {string} id
 * @property {string} title
 * @property {string} content
 */

/**
 * @type {Post[]}
 */
const posts = [
  {
    id: 'my_first_post',
    title: 'my first post',
    content: 'first Hello!',
  },
  {
    id: 'my_second_post',
    title: 'my second post',
    content: 'second Hello!',
  },
]

/**
 * GET /posts
 * GET /posts/:id
 * POST /posts
 */

/**
 * @typedef APIResponse
 * @property {number} statusCode
 * @property {string|Object} body
 */

/**
 * @typedef Route
 * @property {RegExp} url
 * @property {'GET'|'POST'} method
 * @property {(matches: string[],body: Object | undefined)=> Promise<APIResponse>} callback
 */

/** @type {Route[]} */
const routes = [
  {
    url: /^\/posts$/,
    method: 'GET',
    callback: async () => ({
      //TODO:implement
      statusCode: 200,
      body: posts,
    }),
  },
  {
    url: /^\/posts\/([a-zA-Z0-9-_]+)$/,
    method: 'GET',
    callback: async (matches) => {
      const postID = matches[1]
      if (!postID) {
        return {
          statusCode: 404,
          body: 'Not found',
        }
      }

      const post = posts.find((_post) => _post.id === postID)

      if (!post) {
        return {
          statusCode: 404,
          body: 'Not found',
        }
      }

      return {
        statusCode: 200,
        body: post,
      }
    },
  },
  {
    url: /^\/posts$/,
    method: 'POST',
    //request body의 정보가 필요하다.
    callback: async (_, body) => {
      if (!body) {
        return {
          statusCode: 400,
          body: 'Ill-formed request.',
        }
      }

      /** @type {string} */
      const title = body.title
      const newPost = {
        id: title.replace(/\s/g, '_'),
        title,
        content: body.content,
      }
      posts.push(newPost)

      return {
        statusCode: 200,
        body: newPost,
      }
    },
  },
]

module.exports = {
  routes,
}
