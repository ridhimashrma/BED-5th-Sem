const Blog=require("../model/blog.js")
const Users=require("../model/user.js")

module.exports.postAddBlog=async(req,res)=>{
    let { title, body } = req.body;
       let userId = req.userId; 
   
       let user = await Users.findById(userId);
       if (!user) {
           return res.json({
               success: false,
               message: "Invalid user"
           });
       }
   
       let blog = {
           title: title,
           body: body,
           date: Date.now(),
           userId: userId
       };
   
       let newBlog = new Blog(blog);
       await newBlog.save();
   
       user.blogs.push(newBlog._id);
       await user.save();
   
       res.json({
           success: true,
           message: "Blog added successfully",
           data: newBlog
       });
}


module.exports.deleteOneBlog=async (req, res) => {
    let blogId = req.params.blogId;
    let userId = req.userId;

    let blogExist = await Blog.findById(blogId);
    if (!blogExist) {
        return res.json({
            success: false,
            message: "Blog does not exist"
        });
    }

    if (blogExist.userId != userId) {
        return res.json({
            success: false,
            message: "Permission denied"
        });
    }

    await Blog.findByIdAndDelete(blogId);
    res.json({
        success: true,
        message: "Blog deleted successfully"
    });
}


module.exports.getAllBlogs= async (req, res) => {
    let allBlogs = await Blog.find();
    res.json({
        success: true,
        message: "Blogs fetched successfully",
        data: allBlogs
    });
}


module.exports.getOneBlog= async (req, res) => {
    let id = req.params.id;
    let blog = await Blog.findById(id);
    res.json({
        success: true,
        message: "Blog fetched successfully",
        data: blog
    });
}