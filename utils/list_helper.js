const dummy = (blogs) => {
  // ...

  return 1;
};

const totalLikes = (blogs) => {
  let sum = 0;
  blogs.forEach((blog) => {
    sum += blog.likes;
  });

  return sum;
};

const favouriteBlog = (blogs) => {
  const arrayOfLikes = [];

  blogs.forEach((blog) => {
    arrayOfLikes.push(blog.likes);
  });

  const maxNum = Math.max(...arrayOfLikes);

  const foundObj = blogs.find((blog) => {
    return blog.likes === maxNum;
  });

  return foundObj;
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
};
