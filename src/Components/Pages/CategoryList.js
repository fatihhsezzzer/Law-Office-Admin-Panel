import React, { useState, useEffect } from "react";
import axios from "axios";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    nameTr: "",
    nameEn: "",
    nameAr: "",
  });
  const [editCategory, setEditCategory] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://localhost:4411/api/Category");
      setCategories(response.data.$values);
    } catch (error) {
      console.error("Kategorileri getirirken hata oluştu:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditCategory({ ...editCategory, [name]: value });
  };

  const addCategory = async () => {
    try {
      await axios.post("https://localhost:4411/api/Category", newCategory);
      setNewCategory({ nameTr: "", nameEn: "", nameAr: "" });
      fetchCategories();
    } catch (error) {
      console.error("Kategori eklerken hata oluştu:", error);
    }
  };

  const updateCategory = async (id) => {
    try {
      await axios.put(
        `https://localhost:4411/api/Category/${id}`,
        editCategory
      );
      setEditCategory(null);
      setIsEdit(false);
      fetchCategories();
    } catch (error) {
      console.error("Kategori güncellerken hata oluştu:", error);
    }
  };

  const deleteCategory = async (id) => {
    const confirmDelete = window.confirm(
      "Bu kategoriyi silmek istediğinize emin misiniz?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://localhost:4411/api/Category/${id}`);
      fetchCategories();
    } catch (error) {
      console.error("Kategori silinirken hata oluştu:", error);
    }
  };

  const startEdit = (category) => {
    setEditCategory(category);
    setIsEdit(true);
  };

  return (
    <div className="page-content category-list">
      <h2>Kategori Listesi</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Ad (TR)</th>
            <th>Ad (EN)</th>
            <th>Ad (AR)</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.nameTr}</td>
              <td>{category.nameEn}</td>
              <td>{category.nameAr}</td>
              <td>
                <button
                  onClick={() => startEdit(category)}
                  className="btn btn-primary"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => deleteCategory(category.id)}
                  className="btn btn-danger ms-3"
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="add-category">
        <h3>Kategori Ekle</h3>
        <input
          type="text"
          name="nameTr"
          placeholder="Ad (TR)"
          value={newCategory.nameTr}
          onChange={handleInputChange}
          className="form-control mb-2"
        />
        <input
          type="text"
          name="nameEn"
          placeholder="Ad (EN)"
          value={newCategory.nameEn}
          onChange={handleInputChange}
          className="form-control mb-2"
        />
        <input
          type="text"
          name="nameAr"
          placeholder="Ad (AR)"
          value={newCategory.nameAr}
          onChange={handleInputChange}
          className="form-control mb-2"
        />
        <button onClick={addCategory} className="btn btn-success">
          Ekle
        </button>
      </div>

      {isEdit && editCategory && (
        <div className="edit-category">
          <h3>Kategori Düzenle</h3>
          <input
            type="text"
            name="nameTr"
            placeholder="Ad (TR)"
            value={editCategory.nameTr}
            onChange={handleEditInputChange}
            className="form-control mb-2"
          />
          <input
            type="text"
            name="nameEn"
            placeholder="Ad (EN)"
            value={editCategory.nameEn}
            onChange={handleEditInputChange}
            className="form-control mb-2"
          />
          <input
            type="text"
            name="nameAr"
            placeholder="Ad (AR)"
            value={editCategory.nameAr}
            onChange={handleEditInputChange}
            className="form-control mb-2"
          />
          <button
            onClick={() => updateCategory(editCategory.id)}
            className="btn btn-primary"
          >
            Güncelle
          </button>
          <button
            onClick={() => setIsEdit(false)}
            className="btn btn-secondary ms-2"
          >
            İptal
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
