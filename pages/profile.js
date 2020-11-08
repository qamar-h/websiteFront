import React from 'react'
import Head from 'next/head'
import Parser from 'html-react-parser'
import axios from 'axios'
import Loading from "../Components/Loading";

export default class profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            skills:[],
            loading:true,
        }
    }

    componentDidMount() {
        this.loadSkills();
    }

    /**
     * Permet de charger les skills
     *
     * @returns {Promise<AxiosResponse<any> | void>}
     */
    loadSkills() {
        return axios.get(process.env.api + '/skills')
            .then(res => {
                this.setState({skills:res.data['hydra:member']},() => this.setState({loading:false}))
            })
            .catch(error => console.log(error));
    }

    render() {
        if(this.state.loading) return <Loading />
        return (<>
            <Head>
                <title>Profile | {this.props.items.find(i => i.name == "fullname") != undefined && this.props.items.find(i => i.name == "fullname").value }
                </title>
            </Head>

            <header className="head">

                <div className="container">

                    <div className="row">
                        <div className="col-xs-8 col-sm-11 col-lg-11">
                            <img className="logo-page" src="./assets/img/qamar-avatar.jpg" alt="qamarh" style={{width:"70px",borderRadius:"50px"}}/>

                            <h2 className="title">Profil</h2>

                            <h4 className="sub-title">Un petit aperçu</h4>
                        </div>
                        <div className="col-xs-4 col-sm-1 col-lg-1 text-right">
                            <a className="btn-close hover-animate" onClick={() => this.props.nav("index")}></a>
                        </div>
                    </div>

                </div>

            </header>

            <section className="content border-bottom padding-block">

                <div className="container">

                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-lg-7 padding-bottom">
                            <h3 className="title">
                                {this.props.items.find(i => i.name == "description") != undefined && this.props.items.find(i => i.name == "description").label}
                            </h3>
                            <p>
                                {
                                    this.props.items.find(i => i.name == "description") != undefined &&
                                    Parser(this.props.items.find(i => i.name == "description").value)
                                }
                            </p>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-lg-5">
                            <div className="block-grey">
                                <table>
                                    <tr>
                                        <td className="font-weight-m">Nom</td>
                                        <td className="text-right">
                                            {this.props.items.find(i => i.name == "fullname") != undefined && this.props.items.find(i => i.name == "fullname").value}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-weight-m">Age</td>
                                        <td className="text-right">
                                            {this.props.items.find(i => i.name == "age") != undefined && this.props.items.find(i => i.name == "age").value}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-weight-m">Nationalité</td>
                                        <td className="text-right">
                                            {this.props.items.find(i => i.name == "nationality") != undefined && this.props.items.find(i => i.name == "nationality").value}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-weight-m">Poste</td>
                                        <td className="text-right">
                                            {this.props.items.find(i => i.name == "functionMin") != undefined && this.props.items.find(i => i.name == "functionMin").value}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-weight-m">E-mail</td>
                                        <td className="text-right">
                                            {this.props.items.find(i => i.name == "email") !== undefined &&
                                            <a href={"mailto:" + this.props.items.find(i => i.name == "email").value } ></a>
                                            }
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>

            </section>

            <section className="skills border-bottom padding-block">

                <div className="container">

                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-lg-6 language-skills">
                            <h3 className="title title-skills">Compétences</h3>

                            {this.state.skills.map((l,i) => {
                                if(l.secondary == false || l.secondary == null) {
                                    let rate = l.rate;
                                    const rating = () => {
                                        if (rate > 0) {
                                            rate--;
                                            return 'rate-full';
                                        }
                                        return 'rate-empty';
                                    }
                                    return (
                                        <div key={i} className="progress">
                                            <label className="progress-bar-label">{l.name}</label>
                                            <span className="ratyli">
                                        <span className={"rate " + rating()} style={{cursor: "default"}}><i
                                            className="fa fa-star"></i></span>
                                        <span className={"rate " + rating()} style={{cursor: "default"}}><i
                                            className="fa fa-star"></i></span>
                                        <span className={"rate " + rating()} style={{cursor: "default"}}><i
                                            className="fa fa-star"></i></span>
                                        <span className={"rate " + rating()} style={{cursor: "default"}}><i
                                            className="fa fa-star"></i></span>
                                        <span className={"rate " + rating()} style={{cursor: "default"}}><i
                                            className="fa fa-star"></i></span>
                                    </span>
                                        </div>
                                    )
                                }
                            })}

                        </div>
                        <div className="col-xs-12 col-sm-12 col-lg-6 knowledge">
                            <h3 className="title title-skills">Compétences annexes</h3>
                            <div className="col-md-12">
                                {this.state.skills.map((o) => {
                                    if(o.secondary == true) {
                                        return <div className={"col-xs-6 col-sm-6 col-lg-6"}> <ul><li>{o.name}</li></ul></div>
                                    }
                                })}
                            </div>
                        </div>
                    </div>

                </div>

            </section>

            <section className="my-thoughts padding-block text-center">

                <div className="container">

                    {this.props.items.find(i => i.name == "thoughts") !== undefined &&
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-lg-12">
                            <h3 className="title">{this.props.items.find(i => i.name == "thoughts").label}</h3>
                            <div className="animated">
                                <i className="fa fa-quote-left ukie-icons hover-animate"></i>
                            </div>
                            <p className="thoughts">{Parser(this.props.items.find(i => i.name == "thoughts").value)}</p>
                        </div>
                    </div>}

                </div>

            </section>

        </>)
    }

}
