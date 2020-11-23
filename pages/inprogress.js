import Head from "next/head";

export default function inprogress({nav,items}) {

    return (<>
        <Head>
            <title>En cours de développement |
                {items.find(i => i.name == "fullname") != undefined && items.find(i => i.name == "fullname").value }
            </title>
        </Head>
        <header className="head">

            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-lg-12 text-right">
                        <a className="btn-close hover-animate" onClick={() => nav('index')}></a>
                    </div>
                </div>

            </div>

        </header>
        <section className="content padding-block">

            <div className="container">

                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-lg-12 text-center">
                        <img style={{maxWidth:"100%"}} src="./assets/img/inprogress.gif" />
                        <h3 className="title1">Page en développement</h3>
                        <p>Encore un peu de patience ...</p>
                        <a href="#" className="btn btn-color" onClick={() => nav('index')}>Retour à l'accueil</a>
                    </div>
                </div>

            </div>

        </section>
    </>)

}
