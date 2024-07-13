import React from 'react';

const TopHeader = () => {
    return (
        <header className="top-header">
            <nav className="navbar navbar-expand justify-content-between">
                <div className="btn-toggle-menu">
                    <span className="material-symbols-outlined">menu</span>
                </div>
                <div className="d-lg-block d-none search-bar">
                    <button
                        className="btn btn-sm w-100 d-flex align-items-center"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                    >
                        <span className="material-symbols-outlined">search</span>Search
                    </button>
                </div>
                <ul className="navbar-nav top-right-menu gap-2">
                    <li
                        className="nav-item d-lg-none d-block"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                    >
                        <a className="nav-link" href="javascript:;">
                            <span className="material-symbols-outlined"> search </span>
                        </a>
                    </li>
                    <li className="nav-item dark-mode">
                        <a className="nav-link dark-mode-icon" href="javascript:;">
                            <span className="material-symbols-outlined">dark_mode</span>
                        </a>
                    </li>
                    <li className="nav-item dropdown dropdown-app">
                        <a
                            className="nav-link dropdown-toggle dropdown-toggle-nocaret"
                            data-bs-toggle="dropdown"
                            href="javascript:;"
                        >
                            <span className="material-symbols-outlined"> apps </span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end mt-lg-2 p-0">
                            <div className="app-container p-2 my-2">
                                <div className="row gx-0 gy-2 row-cols-3 justify-content-center p-2">
                                    {[
                                        { imgSrc: 'slack.png', name: 'Slack' },
                                        { imgSrc: 'behance.png', name: 'Behance' },
                                        { imgSrc: 'google-drive.png', name: 'Dribble' },
                                        { imgSrc: 'outlook.png', name: 'Outlook' },
                                        { imgSrc: 'github.png', name: 'GitHub' },
                                        { imgSrc: 'stack-overflow.png', name: 'Stack' },
                                        { imgSrc: 'figma.png', name: 'Stack' },
                                        { imgSrc: 'twitter.png', name: 'Twitter' },
                                        { imgSrc: 'google-calendar.png', name: 'Calendar' },
                                        { imgSrc: 'spotify.png', name: 'Spotify' },
                                        { imgSrc: 'google-photos.png', name: 'Photos' },
                                        { imgSrc: 'pinterest.png', name: 'Photos' },
                                        { imgSrc: 'linkedin.png', name: 'LinkedIn' },
                                        { imgSrc: 'dribble.png', name: 'Dribble' },
                                        { imgSrc: 'youtube.png', name: 'YouTube' },
                                        { imgSrc: 'google.png', name: 'News' },
                                        { imgSrc: 'envato.png', name: 'Envato' },
                                        { imgSrc: 'safari.png', name: 'Safari' },
                                    ].map((app, index) => (
                                        <div className="col" key={index}>
                                            <a href="javascript:;">
                                                <div className="app-box text-center">
                                                    <div className="app-icon">
                                                        <img
                                                            src={`assets/images/icons/${app.imgSrc}`}
                                                            width="30"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="app-name">
                                                        <p className="mb-0 mt-1">{app.name}</p>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="nav-item dropdown dropdown-large">
                        <a
                            className="nav-link dropdown-toggle dropdown-toggle-nocaret"
                            href="javascript:;"
                            data-bs-toggle="dropdown"
                        >
                            <div className="position-relative">
                                <span className="notify-badge">8</span>
                                <span className="material-symbols-outlined">
                                    notifications_none
                                </span>
                            </div>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end mt-lg-2">
                            <a href="javascript:;">
                                <div className="msg-header">
                                    <p className="msg-header-title">Notifications</p>
                                    <p className="msg-header-clear ms-auto">Marks all as read</p>
                                </div>
                            </a>
                            <div className="header-notifications-list">
                                {[
                                    { icon: 'add_shopping_cart', title: 'New Orders', time: '2 min ago', info: 'You have received new orders', color: 'text-primary' },
                                    { icon: 'account_circle', title: 'New Customers', time: '14 Sec ago', info: '5 new user registered', color: 'text-danger' },
                                    { icon: 'picture_as_pdf', title: '24 PDF File', time: '19 min ago', info: 'The pdf files generated', color: 'text-success' },
                                    { icon: 'store', title: 'New Product Approved', time: '2 hrs ago', info: 'Your new product has approved', color: 'text-info' },
                                    { icon: 'event_available', title: 'Time Response', time: '28 min ago', info: '5.1 min average time response', color: 'text-warning' },
                                    { icon: 'forum', title: 'New Comments', time: '4 hrs ago', info: 'New customer comments received', color: 'text-danger' },
                                    { icon: 'local_florist', title: 'New 24 authors', time: '1 day ago', info: '24 new authors joined last week', color: 'text-primary' },
                                    { icon: 'park', title: 'Your item is shipped', time: '5 hrs ago', info: 'Successfully shipped your item', color: 'text-success' },
                                    { icon: 'elevation', title: 'Defense Alerts', time: '2 weeks ago', info: '45% less alerts last 4 weeks', color: 'text-warning' },
                                ].map((notification, index) => (
                                    <a className="dropdown-item" href="javascript:;" key={index}>
                                        <div className="d-flex align-items-center">
                                            <div className={`notify ${notification.color} border`}>
                                                <span className="material-symbols-outlined">{notification.icon}</span>
                                            </div>
                                            <div className="flex-grow-1">
                                                <h6 className="msg-name">
                                                    {notification.title}
                                                    <span className="msg-time float-end">{notification.time}</span>
                                                </h6>
                                                <p className="msg-info">{notification.info}</p>
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                            <a href="javascript:;">
                                <div className="text-center msg-footer">View All</div>
                            </a>
                        </div>
                    </li>
                  
                </ul>
            </nav>
        </header>
    );
};

export default TopHeader;
