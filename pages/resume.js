import Parser from "html-react-parser"
import Head from 'next/head'
import Loading from "../Components/Loading";
import axios from 'axios'

export default class resume extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formations:[],
            experiences:[],
            hobbies:[],
            loading:true,
        }
    }

    componentDidMount() {
        this.loadData();
    }

    /**
     * Permet de charger l'ensemble des datas nécessaire au component [formations,expériences,hobbies]
     *
     * @returns {Promise<void>}
     */
    loadData() {
        return axios.get(process.env.api + '/formations')
            .then(res => this.setState({formations:res.data['hydra:member']}))
            .then(() => axios.get(process.env.api + '/experiences'))
            .then(res => this.setState({experiences:res.data['hydra:member']}) )
            .then(() => axios.get(process.env.api + '/hobbies'))
            .then(res => this.setState({hobbies:res.data['hydra:member']}))
            .then(() => this.setState({loading:false}))
            .catch(error => console.log('error'));
    }

    render() {
        if(this.state.loading) return <Loading />
        return (<>
            <Head>
                <title>Parcours |
                    {this.props.items.find(i => i.name == "fullname") != undefined && this.props.items.find(i => i.name == "fullname").value }
                </title>
            </Head>
            <header className="head">
                <div className="container">

                    <div className="row">
                        <div className="col-xs-8 col-sm-11 col-lg-11">
                            <img className="logo-page" src="./assets/img/resume_l.png" alt={this.props.items.find(i => i.name == "fullname") != undefined && this.props.items.find(i => i.name == "fullname").value }
                            />

                            <h2 className="title">Parcours</h2>
                            <h4 className="sub-title">Découvrez mon parcours</h4>
                        </div>
                        <div className="col-xs-4 col-sm-1 col-lg-1 text-right">
                            <a className="btn-close hover-animate" onClick={() => this.props.nav('index')}></a>
                        </div>
                    </div>

                </div>

            </header>

            <section className="content padding-block border-bottom">

                <div className="container">

                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-lg-6 padding-bottom">
                            <h3 className="title title-resume">Formations</h3>
                            <div className="block-grey">
                                <div id="education-slider">

                                    {this.state.formations.map((f) => {
                                        return (
                                            <div className="item">
                                                <div className={"label date"}>
                                                    {f.year}
                                                </div>
                                                <table>
                                                    <tr>
                                                        <td className="font-weight-m width-td">Intitulé</td>
                                                        <td><strong>{f.name}</strong></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="font-weight-m width-td">Ecole</td>
                                                        <td>{f.school}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="font-weight-m">Période</td>
                                                        <td>{f.period}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="font-weight-m">Niveau</td>
                                                        <td>{f.level}</td>
                                                    </tr>
                                                </table>
                                                <p>{Parser(f.description)}</p>
                                            </div>
                                        )
                                    })}

                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-lg-6">
                            <h3 className="title title-resume">Expériences</h3>
                            <div className="block-grey">
                                <div id="work-slider">

                                    {this.state.experiences.map((w) => {
                                        return (
                                            <div className="item">
                                                <div className={"label date"}>
                                                    {w.year}
                                                </div>
                                                <table>
                                                    <tr>
                                                        <td className="font-weight-m">Poste</td>
                                                        <td><strong>{w.posteName}</strong></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="font-weight-m width-td1">Entreprise</td>
                                                        <td>{w.companyName}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="font-weight-m">Période</td>
                                                        <td>{w.period}</td>
                                                    </tr>
                                                </table>
                                                <p>{Parser(w.description)}</p>
                                            </div>
                                        )
                                    })}

                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </section>

            <section className="info border-bottom padding-block text-center">

                <div className="container">

                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-lg-12">
                            <h3 className="title">Centre d'interêt</h3>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-lg-12">
                            {this.state.hobbies.map((h) => {
                                return (
                                    <div className="circle-block ">
                                        <span className="icon hover-animate"><i className={h.faIcon}></i></span>
                                        <span className="name hover-animate">{h.name}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                </div>

            </section>

        </>)
    }


}

