import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState({
    title_en: "",
    title_tr: "",
    title_ar: "",
    description_en: "",
    description_tr: "",
    description_ar: "",
    images: [],
    category_id: "",
    date: new Date().toISOString().slice(0, 10),
    link: "boş",
    author: "boş",
    tags: {
      tr: [""],
      en: [""],
      ar: [""],
    },
  });
  const [currentImage, setCurrentImage] = useState("");
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchCategories();
    if (id) {
      fetchBlog(id);
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://localhost:4411/api/Category");
      setCategories(response.data.$values || []);
    } catch (error) {
      console.error("Kategoriler alınırken hata oluştu:", error);
    }
  };

  const fetchBlog = async (blogId) => {
    try {
      const response = await axios.get(
        `https://localhost:4411/api/Blog/${blogId}`
      );
      const blog = response.data;
      setBlogData({
        title_en: blog.titleEn || "",
        title_tr: blog.titleTr || "",
        title_ar: blog.titleAr || "",
        description_en: blog.descriptionEn || "",
        description_tr: blog.descriptionTr || "",
        description_ar: blog.descriptionAr || "",
        category_id: blog.categoryId || "",
        date: blog.date || new Date().toISOString().slice(0, 10),
        link: blog.link || "boş",
        author: blog.author || "boş",
        images: [],
        tags: {
          tr: blog.blogTags.$values
            .filter((tag) => tag.tag.nameTr !== null)
            .map((tag) => tag.tag.nameTr)
            .flat(),
          en: blog.blogTags.$values
            .filter((tag) => tag.tag.nameEn !== null)
            .map((tag) => tag.tag.nameEn)
            .flat(),
          ar: blog.blogTags.$values
            .filter((tag) => tag.tag.nameAr !== null)
            .map((tag) => tag.tag.nameAr)
            .flat(),
        },
      });
      setCurrentImage(blog.imgSrc);
    } catch (error) {
      console.error("Blog verisi getirirken hata oluştu:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };

  const handleQuillChange = (name, value) => {
    setBlogData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setBlogData({ ...blogData, images: [file] });
  };

  const handleTagChange = (language, index, value) => {
    const newTags = { ...blogData.tags };
    newTags[language][index] = value;
    setBlogData({ ...blogData, tags: newTags });
  };

  const addTagField = (language) => {
    const newTags = { ...blogData.tags };
    newTags[language].push("");
    setBlogData({ ...blogData, tags: newTags });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!blogData.title_en)
      newErrors.title_en = "Blog Başlığı (İngilizce) gerekli";
    if (!blogData.description_en)
      newErrors.description_en = "Blog Açıklaması (İngilizce) gerekli";
    if (!blogData.title_tr)
      newErrors.title_tr = "Blog Başlığı (Türkçe) gerekli";
    if (!blogData.description_tr)
      newErrors.description_tr = "Blog Açıklaması (Türkçe) gerekli";
    if (!blogData.title_ar)
      newErrors.title_ar = "Blog Başlığı (Arapça) gerekli";
    if (!blogData.description_ar)
      newErrors.description_ar = "Blog Açıklaması (Arapça) gerekli";
    if (!blogData.category_id) newErrors.category_id = "Kategori gerekli";
    if (!blogData.date) newErrors.date = "Tarih gerekli";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    if (blogData.images.length > 0) {
      formData.append("file", blogData.images[0]);
    } else if (id) {
      formData.append("currentImage", currentImage);
    }

    formData.append("CategoryId", blogData.category_id);
    formData.append("TitleTr", blogData.title_tr);
    formData.append("DescriptionTr", blogData.description_tr);
    formData.append("TitleEn", blogData.title_en);
    formData.append("DescriptionEn", blogData.description_en);
    formData.append("TitleAr", blogData.title_ar);
    formData.append("DescriptionAr", blogData.description_ar);
    formData.append("Date", blogData.date);
    formData.append("Link", blogData.link);
    formData.append("Author", blogData.author);

    blogData.tags.tr.forEach((tag) => {
      formData.append("TagsTr", tag);
    });

    blogData.tags.en.forEach((tag) => {
      formData.append("TagsEn", tag);
    });

    blogData.tags.ar.forEach((tag) => {
      formData.append("TagsAr", tag);
    });

    try {
      const url = id
        ? `https://localhost:4411/api/Blog/${id}`
        : "https://localhost:4411/api/Blog/create";
      const method = id ? "put" : "post";

      await axios({
        method,
        url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(`Blog başarıyla ${id ? "güncellendi" : "eklendi"}!`);
      navigate("/blog-list");
    } catch (error) {
      console.error("Blog kaydetme/güncelleme hatası:", error);
      if (error.response) {
        console.error("Sunucu hatası:", error.response.data);
        alert("Hata: " + JSON.stringify(error.response.data.errors));
      }
    }
  };

  return (
    <div className="page-content">
      <form onSubmit={handleSubmit} className="add-blog-form">
        <h2>{id ? "Blog Güncelle" : "Blog Ekle"}</h2>
        <div className="mb-4">
          <h5 className="mb-3">Kategori</h5>
          <select
            className="form-control"
            name="category_id"
            value={blogData.category_id}
            onChange={handleChange}
          >
            <option value="">Kategori Seçin</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.nameTr}
              </option>
            ))}
          </select>
          {errors.category_id && (
            <div className="text-danger">{errors.category_id}</div>
          )}
        </div>
        <div className="mb-4">
          <h5 className="mb-3 mt-5">Blog Başlığı (İngilizce)</h5>
          <input
            type="text"
            className="form-control"
            placeholder="write title here...."
            name="title_en"
            value={blogData.title_en}
            onChange={handleChange}
          />
          {errors.title_en && (
            <div className="text-danger">{errors.title_en}</div>
          )}
        </div>
        <div className="mb-4">
          <h5 className="mb-3">Blog Açıklaması (İngilizce)</h5>
          <ReactQuill
            value={blogData.description_en}
            onChange={(value) => handleQuillChange("description_en", value)}
            theme="snow"
            className="quill-editor"
            placeholder="write a description here.."
          />
          {errors.description_en && (
            <div className="text-danger">{errors.description_en}</div>
          )}
        </div>

        <div className="mb-4">
          <h5 className="mb-3 mt-5">Blog Başlığı (Türkçe)</h5>
          <input
            type="text"
            className="form-control"
            placeholder="başlığı buraya yazın...."
            name="title_tr"
            value={blogData.title_tr}
            onChange={handleChange}
          />
          {errors.title_tr && (
            <div className="text-danger">{errors.title_tr}</div>
          )}
        </div>
        <div className="mb-4">
          <h5 className="mb-3">Blog Açıklaması (Türkçe)</h5>
          <ReactQuill
            value={blogData.description_tr}
            onChange={(value) => handleQuillChange("description_tr", value)}
            theme="snow"
            className="quill-editor"
            placeholder="açıklamayı buraya yazın.."
          />
          {errors.description_tr && (
            <div className="text-danger">{errors.description_tr}</div>
          )}
        </div>

        <div className="mb-4">
          <h5 className="mb-3 mt-5">Blog Başlığı (Arapça)</h5>
          <input
            type="text"
            className="form-control"
            placeholder="başlığı buraya yazın...."
            name="title_ar"
            value={blogData.title_ar}
            onChange={handleChange}
          />
          {errors.title_ar && (
            <div className="text-danger">{errors.title_ar}</div>
          )}
        </div>
        <div className="mb-4">
          <h5 className="mb-3">Blog Açıklaması (Arapça)</h5>
          <ReactQuill
            value={blogData.description_ar}
            onChange={(value) => handleQuillChange("description_ar", value)}
            theme="snow"
            className="quill-editor"
            placeholder="açıklamayı buraya yazın.."
          />
          {errors.description_ar && (
            <div className="text-danger">{errors.description_ar}</div>
          )}
        </div>

        <div className="mb-4">
          <h5 className="mb-3 mt-5">Tarih</h5>
          <input
            type="text"
            className="form-control"
            placeholder="Tarih"
            name="date"
            value={blogData.date}
            onChange={handleChange}
          />
          {errors.date && <div className="text-danger">{errors.date}</div>}
        </div>

        <div className="mb-4">
          <h5 className="mb-3">Resim Yükle</h5>
          <input
            type="file"
            className="form-control"
            name="images"
            accept=".jpg, .png, image/jpeg, image/png"
            onChange={handleImageUpload}
          />
          {currentImage && (
            <img
              src={`https://localhost:4411${currentImage}`}
              alt="Current"
              style={{ width: "100px", height: "100px" }}
            />
          )}
        </div>

        <div className="mb-4">
          <h5 className="mb-3 mt-5">Etiketler (Türkçe)</h5>
          {blogData.tags.tr.map((tag, index) => (
            <div key={index} className="d-flex align-items-center mb-2">
              <input
                type="text"
                className="form-control me-2"
                value={tag}
                onChange={(e) => handleTagChange("tr", index, e.target.value)}
              />
              {index === blogData.tags.tr.length - 1 && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => addTagField("tr")}
                >
                  +
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mb-4">
          <h5 className="mb-3">Etiketler (İngilizce)</h5>
          {blogData.tags.en.map((tag, index) => (
            <div key={index} className="d-flex align-items-center mb-2">
              <input
                type="text"
                className="form-control me-2"
                value={tag}
                onChange={(e) => handleTagChange("en", index, e.target.value)}
              />
              {index === blogData.tags.en.length - 1 && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => addTagField("en")}
                >
                  +
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mb-4">
          <h5 className="mb-3">Etiketler (Arapça)</h5>
          {blogData.tags.ar.map((tag, index) => (
            <div key={index} className="d-flex align-items-center mb-2">
              <input
                type="text"
                className="form-control me-2"
                value={tag}
                onChange={(e) => handleTagChange("ar", index, e.target.value)}
              />
              {index === blogData.tags.ar.length - 1 && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => addTagField("ar")}
                >
                  +
                </button>
              )}
            </div>
          ))}
        </div>

        <button type="submit" className="btn btn-primary">
          {id ? "Güncelle" : "Kaydet"}
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
