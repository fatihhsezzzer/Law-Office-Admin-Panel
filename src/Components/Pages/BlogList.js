import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("https://localhost:4411/api/Blog");
      setBlogs(response.data.blogs.$values);
    } catch (error) {
      console.error("Blogları getirirken hata oluştu:", error);
    }
  };

  const deleteBlog = async (id) => {
    const confirmDelete = window.confirm(
      "Bu blogu silmek istediğinize emin misiniz?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://localhost:4411/api/Blog/${id}`);
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (error) {
      console.error("Blog silinirken hata oluştu:", error);
    }
  };

  const editBlog = (id) => {
    navigate(`/add-blog/${id}`);
  };

  return (
    <div className="page-content blog-list">
      <h2>Blog Listesi</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Başlık (TR)</th>
            <th>Açıklama (TR)</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>{blog.id}</td>
              <td>{blog.titleTr}</td>
              <td>{blog.descriptionTr}</td>
              <td>
                <button
                  onClick={() => editBlog(blog.id)}
                  className="btn btn-primary"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => deleteBlog(blog.id)}
                  className="btn btn-danger ms-3"
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogList;
