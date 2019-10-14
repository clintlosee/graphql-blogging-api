import getUserId from '../utils/getUserId'

const User = {
  posts: {
    fragment: 'fragment userId on User { id }',
    resolve(parent, args, { prisma }, info) {
      return prisma.query.posts({
        where: {
          published: true,
          author: {
            id: parent.id
          }
        }
      })
    }
  },

  email: {
    fragment: 'fragment userId on User { id }',
    resolve(parent, args, { request }, info) {
      const userId = getUserId(request, false)

      if (userId && userId === parent.id) {
        return parent.email
      } else {
        return null
      }
    }
  }


  //* Not necessary when using Prisma
  // posts(parent, args, { db }, info) {
  //   return db.posts.filter((post) => {
  //     return post.author === parent.id
  //   })
  // },

  // comments(parent, args, { db }, info) {
  //   return db.comments.filter(comment => {
  //     return comment.author === parent.id
  //   })
  // }
}

export { User as default }
