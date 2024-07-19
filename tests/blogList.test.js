const { test, after, beforeEach } = require('node:test');
const Blog = require('../models/blog');

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  blogs.forEach(async (blog) => {
    let blogObj = new Blog(blog);
    await blogObj.save();
  });
});

test('returns all blogs', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  assert.strictEqual(response.body.length, blogs.length);
});

test('verifies that the unique id is named id', async () => {
  const response = await api.get('/api/blogs');
  const id = response.body.map((e) => e.id);
  assert(id.includes(blogs[0]._id));
});

test.only('adds new blog post and checks length of blog', async () => {
  const blogAdded = {
    title: ' removing soon',
    author: 'Babajide Oluwaferanmi',
    url: 'deletingsoon.com',
    likes: 69,
  };

  await api.post('/api/blogs').send(blogAdded).expect(201);

  const blogsInDb = await Blog.find({});

  assert.strictEqual(blogsInDb.length, blogs.length + 1);
});

after(async () => {
  await mongoose.connection.close();
});
