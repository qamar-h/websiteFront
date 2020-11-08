import Footer from "../Components/Footer";
import Head from "next/head";

export default function err404({nav}) {

    return (<>
        <Head>
            <title>Page non trouvée | 404</title>
        </Head>
        <header className="head">

            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-lg-12 text-right">
                        <a className="btn-close hover-animate" onClick={() => nav('index') }></a>
                    </div>
                </div>

            </div>

        </header>
        <section className="content padding-block">

                <div className="container">

                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-lg-12 text-center">
                            <img src="./assets/img/404.gif" alt="UkieWeb" />
                                <h3 className="title1">Page non trouvée</h3>
                                <p>The page you are looking for was moved, removed, renamed or
                                    might never existed.</p>
                                <a href="#" className="btn btn-color" onClick={() => nav('index') } >Retour à l'accueil</a>
                        </div>
                    </div>

                </div>

            </section>
    </>)

}