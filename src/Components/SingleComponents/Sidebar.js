import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className="sidebar-wrapper">
            <div className="sidebar-header">
                <div className="logo-icon">
                    <img src="assets/images/logo-icon.png" className="logo-img" alt="" />
                </div>
                <div className="logo-name flex-grow-1">
                    <h5 className="mb-0">Roksyn</h5>
                </div>
                <div className="sidebar-close">
                    <span className="material-symbols-outlined">close</span>
                </div>
            </div>
            <div className="sidebar-nav" data-simplebar="true">
                <ul className="metismenu" id="menu">
                    <li>
                        <Link to="/" >
                            <div className="parent-icon">
                                <span className="material-symbols-outlined">home</span>
                            </div>
                            <div className="menu-title">Dashboard</div>
                        </Link>
                    </li>
                    <li>
                        <a href="javascript:;" className="has-arrow">
                            <div className="parent-icon">
                                <span className="material-symbols-outlined">apps</span>
                            </div>
                            <div className="menu-title">Application</div>
                        </a>
                        <ul>
                            <li>
                                <a href="app-emailbox.html">
                                    <span className="material-symbols-outlined">arrow_right</span>Email
                                </a>
                            </li>
                            <li>
                                <a href="app-chat-box.html">
                                    <span className="material-symbols-outlined">arrow_right</span>Chat Box
                                </a>
                            </li>
                            <li>
                                <a href="app-file-manager.html">
                                    <span className="material-symbols-outlined">arrow_right</span>File Manager
                                </a>
                            </li>
                            <li>
                                <a href="app-contact-list.html">
                                    <span className="material-symbols-outlined">arrow_right</span>Contacts
                                </a>
                            </li>
                            <li>
                                <a href="app-to-do.html">
                                    <span className="material-symbols-outlined">arrow_right</span>Todo List
                                </a>
                            </li>
                            <li>
                                <a href="app-invoice.html">
                                    <span className="material-symbols-outlined">arrow_right</span>Invoice
                                </a>
                            </li>
                            <li>
                                <a href="app-fullcalender.html">
                                    <span className="material-symbols-outlined">arrow_right</span>Calendar
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="javascript:;" className="has-arrow">
                            <div className="parent-icon">
                                <span className="material-symbols-outlined">shopping_cart</span>
                            </div>
                            <div className="menu-title">Hukuk Sitesi</div>
                        </a>
                        <ul>
                            <li>
                                <Link to="/add-blog">
                                    <span className="material-symbols-outlined">arrow_right</span>Blog Yazısı Ekle
                                </Link>
                            </li>
                            <li>
                                <Link to="/blog-list">
                                    <span className="material-symbols-outlined">arrow_right</span>Blog Yazısı Güncelle
                                </Link>
                            </li>
                            <li>
                                <Link to="/add-category">
                                    <span className="material-symbols-outlined">arrow_right</span>Category Ekle
                                </Link>
                            </li>
                            <li>
                                <Link to="/category-list">
                                    <span className="material-symbols-outlined">arrow_right</span>Category Güncelle
                                </Link>
                            </li>
                            <li>
                                <Link to="add-faq">
                                    <span className="material-symbols-outlined">arrow_right</span>SSS Ekle
                                </Link>
                            </li>
                            <li>
                                <Link to="faq-list">
                                    <span className="material-symbols-outlined">arrow_right</span>SSS Güncelle
                                </Link>
                            </li>
                         
                         
                        </ul>
                    </li>
                 
                  
         
             
                </ul>
            </div>
            <div className="sidebar-bottom ">
                <div
                    className=" d-flex align-items-center px-3 gap-3 w-100 h-100"
                >
                    <div className="user-img">
                        <img src="assets/images/avatars/ilayda.jpeg" alt="" />
                    </div>
                    <div className="user-info">
                        <h5 className="mb-0 user-name">İlayda İkizoğlu</h5>
                        <p className="mb-0 user-designation">Avukat</p>
                    </div>
                </div>
                
            </div>
        </aside>
    );
};

export default Sidebar;
