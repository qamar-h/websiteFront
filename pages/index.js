import {useState} from 'react'
import Head from 'next/head'
import Parser from "html-react-parser";
import Nav from "../Components/Nav";
import Social from "../Components/Social";

export default function Home({nav,items,socials}) {

    const [avatar,setAvatar] = useState('qamar-avatar');

    return (
        <>
            <Head>
                <title>{items.find(i => i.name == "fullname") != undefined && items.find(i => i.name == "fullname").value }</title>
            </Head>
            <section className="home-header border-bottom padding-block">

                <div className="container">

                    <div className="row">
                        <div className="col-xs-12 col-sm-5 col-lg-5 text-center border-right">

                            <div className="foto">
                                <a onClick={() => nav('profile')} >
                                    <img src={"./assets/img/" + avatar + ".jpg"}
                                        onMouseOver={() => setAvatar('qamar-avatar2') }
                                        onMouseOut={() => setAvatar('qamar-avatar') }
                                    />
                                </a>
                            </div>

                        </div>
                        <div className="col-xs-12 col-sm-7 col-lg-7 text-center">

                            <h1 className="title">
                                {items.find(i => i.name == "fullname") != undefined && items.find(i => i.name == "fullname").value}
                            </h1>

                            <h3 className="sub-title">
                                {items.find(i => i.name == "function") != undefined && Parser(items.find(i => i.name == "function").value)}
                            </h3>

                            <Social socials={socials} />

                        </div>
                    </div>

                </div>

            </section>

            <Nav nav={(page) => nav(page) }/>
        </>
    )

}
