import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Components/Pages/Home';
import ProductList from './Components/Pages/ProductList';
import AddBlog from './Components/Pages/AddBlog';
import BlogList from './Components/Pages/BlogList';
import FAQList from './Components/Pages/FAQList';
import AddEditFaq from './Components/Pages/AddFaq';
import LoginForm from './Components/Pages/Login';
import CategoryList from './Components/Pages/CategoryList';
import AddCategory from './Components/Pages/AddCategory';

import Header from './Components/SingleComponents/Header';
import Sidebar from './Components/SingleComponents/Sidebar';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <Router>
      <div className="App">
        {isLoggedIn && <Header />}
        {isLoggedIn && <Sidebar />}
        <div className="content">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/productlist" element={<ProductList />} />


              <Route path="/add-blog" element={<AddBlog />} />
              <Route path="/add-blog/:id" element={<AddBlog />} />
              <Route path="/blog-list" element={<BlogList />} />

              <Route path="/add-category" element={<AddCategory />} />
              <Route path="/add-category/:id" element={<AddCategory />} />
              <Route path="/category-list" element={<CategoryList />} />

              <Route path="/faq-list" element={<FAQList />} />
              <Route path="/add-faq" element={<AddEditFaq />} />
              <Route path="/edit-faq/:id" element={<AddEditFaq />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;