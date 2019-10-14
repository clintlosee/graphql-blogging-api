import { Prisma } from 'prisma-binding'
import { fragmentReplacements } from './resolvers/index'

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: 'thisismysupersecrettext',
  fragmentReplacements
})

export { prisma as default }








//* Async/Await Prisma calls =====================
// const createPostForUser = async (authorId, data) => {
//   const userExists = await prisma.exists.User({ id: authorId })

//   if (!userExists) {
//     throw new Error('User not found')
//   }

//   const post = await prisma.mutation.createPost({
//     data: {
//       ...data,
//       author: {
//         connect: {
//           id: authorId
//         }
//       }
//     }
//   }, '{ author { id name email posts { id title published } } }')

//   return post.author
// }

// createPostForUser("cjzoge18900s909104roaw9xx", {
//     title: 'Great Articles to Read',
//     body: 'How to build a GraphQL API and all its tricks.',
//     published: true
//   }
// ).then(user => {
//   console.log(JSON.stringify(user, undefined, 2))
// }).catch(error => {
//   console.log(error.message)
// })

// const updatePostForUser = async (postId, data) => {
//   const postExists = await prisma.exists.Post({ id: postId })

//   if (!postExists) {
//     throw new Error('Post not found')
//   }

//   const post = await prisma.mutation.updatePost({
//     where: {
//       id: postId
//     },
//     data
//   }, '{ author { id name email posts { id title published } } }')

//   return post.author
// }

// updatePostForUser('cjzy8j3w3004g08103gszazh3', {
//   published: true
// }).then(user => {
//   console.log(JSON.stringify(user, undefined, 2))
// }).catch(error => {
//   console.log(error.message)
// })


//* Old individual Prisma calls =======================================
// prisma.query.users(null, '{ id name posts { id title } }').then((data) => {
//   console.log(JSON.stringify(data, undefined, 2))
// })

// prisma.query.comments(null, '{ id text author { id name } }').then((data) => {
//   console.log(JSON.stringify(data, undefined, 2))
// })

// prisma.mutation.createPost({
//   data: {
//     title: "GraphQL 101",
//     body: "",
//     published: false,
//     author: {
//       connect: {
//         id: "cjzogb2xa00qu0910lu99assw"
//       }
//     }
//   }
// }, '{ id title body published }').then(data => {
//   console.log(data)
//   return prisma.query.users(null, '{ id name posts { id title } }')
// }).then((data) => {
//   console.log(JSON.stringify(data, undefined, 2))
// })

// prisma.mutation.updatePost({
//   where: {
//     id: "cjzwz83qn002g081059lneyqg"
//   },
//   data: {
//     body: "Here is the new post body that is updated. Cool...",
//     published: true
//   }
// }, '{ id title body published }').then(data => {
//   console.log(data)
//   return prisma.query.posts(null, '{ id title body published author { id name } }')
// }).then(data => {
//   console.log(JSON.stringify(data, undefined, 2))
// })
