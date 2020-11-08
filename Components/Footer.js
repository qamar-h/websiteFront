
export default function Footer({nav}) {

    return (
        <footer className="footer">

            <div className="container">

                <div className="row">

                    <div className="col-xs-12 col-sm-6 col-lg-3">
                        <a onClick={() => nav('contact')} className="hover-animate" title={"Contact"}>
                                <span className="ukie-icons hover-animate"><i
                                    className="fa fa-paper-plane"></i></span>
                        </a>
                    </div>

                    <div className="col-xs-12 col-sm-6 col-lg-3 text-right">
                        <span className="copyright">Copyright © 2020 All right reserved</span>
                    </div>

                </div>

            </div>

        </footer>
    )

}