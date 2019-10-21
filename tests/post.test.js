import 'cross-fetch/polyfill'
import 'core-js'
import 'regenerator-runtime/runtime'
import { gql } from 'apollo-boost'
import prisma from '../src/prisma'
import seedDatabase, { userOne, postOne, postTwo } from './utils/seedDatabase'
import getClient from './utils/getClient'
import { getPosts,  myPosts, updatePost, createPost, deletePost } from './utils/operations'

const client = getClient()

beforeAll(seedDatabase)

test('Should expose published posts', async () => {
  const response = await client.query({
    query: getPosts
  })

  expect(response.data.posts.length).toBe(1)
  expect(response.data.posts[0].published).toBe(true)
})

test('Should fetch users posts', async () => {
  const client = getClient(userOne.jwt)

  const { data } = await client.query({ query: myPosts })

  expect(data.myPosts.length).toBe(2)
})

test('Should be able to update own post', async () => {
  const client = getClient(userOne.jwt)
  const variables = {
    id: postOne.post.id,
    data: {
      published: false
    }
  }

const { data } = await client.mutate({ mutation: updatePost, variables })
const exists = await prisma.exists.Post({ id: postOne.post.id, published: false })

expect(data.updatePost.published).toBe(false)
expect(exists).toBe(true)
})

test('Should create a new post', async () => {
  const client = getClient(userOne.jwt)
  const variables = {
    data: {
      title: "Post Title",
      body: "Post Body",
      published: true
    }
  }

  const { data } = await client.mutate({ mutation: createPost, variables })
  const exists = await prisma.exists.Post({ id: createPost.id })

  expect(data.createPost.title).toBe('Post Title')
  expect(data.createPost.body).toBe('Post Body')
  expect(data.createPost.published).toBe(true)
  expect(exists).toBe(true)
})

test('Should delete a post', async () => {
  const client = getClient(userOne.jwt)
  const variables = {
    id: postTwo.post.id
  }

  await client.mutate({ mutation: deletePost, variables })
  const exists = await prisma.exists.Post({ id: postTwo.post.id })

  expect(exists).toBe(false)
})
