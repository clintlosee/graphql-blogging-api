import 'cross-fetch/polyfill'
import 'core-js'
import 'regenerator-runtime/runtime'
import { gql } from 'apollo-boost'
import prisma from '../src/prisma'
import seedDatabase, { userOne, postOne, postTwo } from './utils/seedDatabase'
import getClient from './utils/getClient'

const client = getClient()

beforeAll(seedDatabase)

test('Should expose published posts', async () => {
  const getPosts = gql`
    query {
      posts {
        id
        title
        body
        published
      }
    }
  `

  const response = await client.query({
    query: getPosts
  })

  expect(response.data.posts.length).toBe(1)
  expect(response.data.posts[0].published).toBe(true)
})

test('Should fetch users posts', async () => {
  const client = getClient(userOne.jwt)
  const myPosts = gql`
    query {
      myPosts {
        id
        title
        body
        published
      }
    }
  `

  const { data } = await client.query({ query: myPosts })

  expect(data.myPosts.length).toBe(2)
})

test('Should be able to update own post', async () => {
  const client = getClient(userOne.jwt)
  const updatePost = gql`
    mutation {
      updatePost(
        id: "${postOne.post.id}",
        data: {
          published: false
        }
      ) {
        id
        title
        body
        published
      }
    }
  `

const { data } = await client.mutate({ mutation: updatePost })
const exists = await prisma.exists.Post({ id: postOne.post.id, published: false })

expect(data.updatePost.published).toBe(false)
expect(exists).toBe(true)
})

test('Should create a new post', async () => {
  const client = getClient(userOne.jwt)
  const createPost = gql`
    mutation {
      createPost(
        data: {
          title: "Post Title",
          body: "Post Body",
          published: true
        }
      ) {
        id
        title
        body
        published
      }
    }
  `

const { data } = await client.mutate({ mutation: createPost })
const exists = await prisma.exists.Post({ id: createPost.id })

expect(data.createPost.title).toBe('Post Title')
expect(data.createPost.body).toBe('Post Body')
expect(data.createPost.published).toBe(true)
expect(exists).toBe(true)
})

test('Should delete a post', async () => {
  const client = getClient(userOne.jwt)
  const deletePost = gql`
    mutation {
      deletePost(
        id: "${postTwo.post.id}"
      ) {
        id
        title
      }
    }
  `

  await client.mutate({ mutation: deletePost })
  const exists = await prisma.exists.Post({ id: postTwo.post.id })

  expect(exists).toBe(false)
})
