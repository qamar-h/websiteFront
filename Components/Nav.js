import React from 'react';

class Nav extends React.Component {

    render() {
        return (
        <nav className="menu-style1">

            <div className="container">

                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-lg-12">

                        <a className="menu-li" onClick={() => this.props.nav('profile') }>
                            <span className="foto">
                                <img src="./assets/img/menu/style1/profile.png" className="menu-img"  data-img-name="profile" />
                            </span>
                            <span className="name">Profil</span>
                        </a>

                        <a className="menu-li" onClick={() => this.props.nav('resume') }>
                            <span className="foto">
                                <img src="./assets/img/menu/style1/resume.png" className="menu-img"  data-img-name="resume" />
                            </span>
                            <span className="name">Parcours</span>
                        </a>

                        <a  className="menu-li" onClick={() => this.props.nav('inprogress') }>
                            <span className="foto">
                                <img src="./assets/img/menu/style1/portfolio.png" className="menu-img" data-img-name="portfolio" />
                            </span>
                            <span className="name">Portfolio</span>
                        </a>

                        <a className="menu-li" onClick={() => this.props.nav('inprogress') }>
                            <span className="foto">
                                <img src="./assets/img/menu/style1/blog.png" className="menu-img" data-img-name="blog" />
                            </span>
                            <span className="name">Blog</span>
                        </a>

                        <a className="menu-li" onClick={() => this.props.nav('contact') }>
                            <span className="foto">
                                <img src="./assets/img/menu/style1/contact.png" className="menu-img" data-img-name="contact" />
                            </span>
                            <span className="name">Contact</span>
                        </a>

                    </div>
                </div>

            </div>

        </nav>
        )
    }

}

export default Nav