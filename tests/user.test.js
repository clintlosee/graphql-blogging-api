import 'cross-fetch/polyfill'
import 'core-js'
import 'regenerator-runtime/runtime'
import { gql } from 'apollo-boost'
import prisma from '../src/prisma'
import seedDatabase, { userOne } from './utils/seedDatabase'
import getClient from './utils/getClient'

const client = getClient()

beforeAll(seedDatabase)

test('Should create a new user', async () => {
  const createUser = gql`
    mutation {
      createUser(
        data: {
          name: "Clint",
          email: "clint@example.com",
          password: "MyPass123"
        }
      ) {
        token,
        user {
          id
        }
      }
    }
  `

  const response = await client.mutate({
    mutation: createUser
  })

  const exists = await prisma.exists.User({ id: response.data.createUser.user.id })
  expect(exists).toBe(true)
})

test('Should expose public author profiles', async () => {
  const getUsers = gql`
    query {
      users {
        id
        name
        email
      }
    }
  `

  const response = await client.query({
    query: getUsers
  })

  expect(response.data.users.length).toBe(2)
  expect(response.data.users[0].email).toBe(null)
  expect(response.data.users[0].name).toBe('Mellissa')
})

test('Should not login with bad credentials', async () => {
  const login = gql`
    mutation {
      login(
        data: {
          email: "bobo@emample.com",
          password: "aksdjf;alksdf"
        }
      ) {
        token
      }
    }
  `

  await expect(client.mutate({ mutation: login })).rejects.toThrow()
})

test('Should not signup with short password', async () => {
  const signup = gql`
    mutation {
      createUser(
        data: {
          name: "Joe",
          email: "joe@example.com",
          password: "1234"
        }
      ) {
        token
      }
    }
  `

  await expect(
    client.mutate({ mutation: signup })
  ).rejects.toThrow()
})

test('Should fetch user profile', async () => {
  const client = getClient(userOne.jwt)
  const getProfile = gql`
    query {
      me {
        id
        name
        email
      }
    }
  `

  const { data } = await client.query({ query: getProfile })

  expect(data.me.id).toBe(userOne.user.id)
  expect(data.me.name).toBe(userOne.user.name)
  expect(data.me.email).toBe(userOne.user.email)
})
