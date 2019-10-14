const users = [
  {
    id: '1',
    name: 'Clint',
    email: 'email@email.com',
    age: 38
  },
  {
    id: '2',
    name: 'Mellissa',
    email: 'emailMellissa@email.com',
    age: 39
  }
]

const posts = [
  {
    id: '1',
    title: 'Post 1, Sweet!',
    body: 'This is the body of my post #1.',
    published: true,
    author: '1'
  },
  {
    id: '2',
    title: 'Post 2 That is Cool',
    body: 'This is the body of my post #2 that has more body text.',
    published: false,
    author: '2'
  }
]

const comments = [
  {
    id: '101',
    text: 'This is comment one.',
    author: '1',
    post: '2'
  },
  {
    id: '102',
    text: 'Cool comment number 2.',
    author: '1',
    post: '2'
  },
  {
    id: '103',
    text: 'Another interesting comment here.',
    author: '2',
    post: '1'
  },
  {
    id: '104',
    text: 'Here is a cool comment.',
    author: '1',
    post: '2'
  }
]

const db = {
  users,
  posts,
  comments
}

export { db as default }