const Blog = require("../model/blog");
const User = require("../model/user");

exports.createBlog = async (req, res) => {
  let { title, body } = req.body;
  let user = await User.findById(req.userId);

  if (!user) {
    return res.json({ success: false, message: "Invalid user" });
  }

  let blog = new Blog({
    title,
    body,
    date: Date.now(),
    userId: req.userId,
  });

  await blog.save();

  user.blogs.push(blog._id);
  await user.save();

  res.json({ success: true, message: "Blog added successfully", data: blog });
};

exports.deleteBlog = async (req, res) => {
  const blogId = req.params.blogId;
  const blogExist = await Blog.findById(blogId);

  if (!blogExist) {
    return res.json({ success: false, message: "Blog does not exist" });
  }

  if (String(blogExist.userId) !== String(req.userId)) {
    return res.json({ success: false, message: "Permission denied" });
  }

  await Blog.findByIdAndDelete(blogId);
  res.json({ success: true, message: "Blog deleted successfully" });
};

exports.getAllBlogs = async (req, res) => {
  let blogs = await Blog.find();
  res.json({ success: true, message: "All blogs fetched", data: blogs });
};

exports.getBlogById = async (req, res) => {
  let blog = await Blog.findById(req.params.id);
  res.json({ success: true, message: "Blog fetched", data: blog });
};