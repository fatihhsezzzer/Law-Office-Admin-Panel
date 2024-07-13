import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AddCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState({
    nameTr: "",
    nameEn: "",
    nameAr: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      fetchCategory(id);
    }
  }, [id]);

  const fetchCategory = async (categoryId) => {
    try {
      const response = await axios.get(
        `https://localhost:4411/api/Category/${categoryId}`
      );
      const category = response.data;
      setCategoryData({
        nameTr: category.nameTr || "",
        nameEn: category.nameEn || "",
        nameAr: category.nameAr || "",
      });
    } catch (error) {
      console.error("Kategori verisi getirirken hata oluştu:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({ ...categoryData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!categoryData.nameTr)
      newErrors.nameTr = "Kategori Adı (Türkçe) gerekli";
    if (!categoryData.nameEn)
      newErrors.nameEn = "Kategori Adı (İngilizce) gerekli";
    if (!categoryData.nameAr)
      newErrors.nameAr = "Kategori Adı (Arapça) gerekli";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const url = id
        ? `https://localhost:4411/api/Category/${id}`
        : "https://localhost:4411/api/Category";
      const method = id ? "put" : "post";

      await axios({
        method,
        url,
        data: categoryData,
      });

      alert(`Kategori başarıyla ${id ? "güncellendi" : "eklendi"}!`);
      navigate("/category-list");
    } catch (error) {
      console.error("Kategori kaydetme/güncelleme hatası:", error);
      if (error.response) {
        console.error("Sunucu hatası:", error.response.data);
        alert("Hata: " + JSON.stringify(error.response.data.errors));
      }
    }
  };

  return (
    <div className="page-content">
      <form onSubmit={handleSubmit} className="add-category-form">
        <h2>{id ? "Kategori Güncelle" : "Kategori Ekle"}</h2>
        <div className="mb-4">
          <h5 className="mb-3">Kategori Adı (Türkçe)</h5>
          <input
            type="text"
            className="form-control"
            placeholder="Kategori Adı (Türkçe)"
            name="nameTr"
            value={categoryData.nameTr}
            onChange={handleChange}
          />
          {errors.nameTr && <div className="text-danger">{errors.nameTr}</div>}
        </div>
        <div className="mb-4">
          <h5 className="mb-3">Kategori Adı (İngilizce)</h5>
          <input
            type="text"
            className="form-control"
            placeholder="Kategori Adı (İngilizce)"
            name="nameEn"
            value={categoryData.nameEn}
            onChange={handleChange}
          />
          {errors.nameEn && <div className="text-danger">{errors.nameEn}</div>}
        </div>
        <div className="mb-4">
          <h5 className="mb-3">Kategori Adı (Arapça)</h5>
          <input
            type="text"
            className="form-control"
            placeholder="Kategori Adı (Arapça)"
            name="nameAr"
            value={categoryData.nameAr}
            onChange={handleChange}
          />
          {errors.nameAr && <div className="text-danger">{errors.nameAr}</div>}
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? "Güncelle" : "Kaydet"}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
