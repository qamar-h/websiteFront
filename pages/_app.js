import '../public/assets/fonts/font-awesome/css/font-awesome.min.css'
import '../public/assets/boostrap-files/css/bootstrap.min.css'
import '../public/assets/css/animate.css'
import '../public/assets/css/component.css'
import '../public/assets/css/contact.form.css'
import '../public/assets/css/style.css'
import '../public/assets/css/switcher.css'
import '../public/assets/css/colour-scheme/color-blue.css'
import '../public/assets/css/respons.css'

import React from "react";
import Footer from "../Components/Footer";
import Contact from "./contact";
import Loading from "../Components/Loading";
import Index from "./index"
import Resume from "./resume"
import Profile from "./profile";
import Inprogress from "./inprogress"
import ERROR404 from "./404"
import axios from 'axios';


export default class MyApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page:'index',
            loading:true,
            items:[]
        }
    }

    /**
     * Chargement des items
     */
    componentDidMount() {
        const {Component} = this.props;
        this.loadItem();
        if(Component.name != "Home") {
            this.setState({page:Component.name})
        }
    }

    /**
     * Permet des charger les items
     *
     * @returns {Promise<void>}
     */
    loadItem() {
        return axios.get(process.env.api + '/items')
            .then(res => this.setState({items:res.data['hydra:member']}))
            .then(() => this.setState({loading:false}))
            .catch(error => console.log(error))
    }

    /**
     * Permet de gérer la navigation inter Component
     *
     * @param page
     */
    nav(page) {
        this.setState({loading:true});
        this.historyChance(page)
        this.setState({page},() => this.setState({loading:false}))
        return;
    }

    /**
     * Mise à jour de l'history (URL)
     *
     * @param page
     */
    historyChance(page) {
        let url = "/";
        if(page != "index")  url = page;
        history.replaceState(null,'Title',url);
    }

    /**
     * Permet de rendre le bon Component
     *
     * @returns {*}
     */
    pageRender() {

        switch (this.state.page) {

            case  'index':
                return <Index nav={(page) => this.nav(page) } items={this.state.items} />
            case  'profile':
                return <Profile nav={(page) => this.nav(page) } items={this.state.items} />
            case  'inprogress':
                return <Inprogress nav={(page) => this.nav(page) } items={this.state.items}/>
            case 'resume':
                return <Resume nav={(page) => this.nav(page)} items={this.state.items} />
            case 'contact':
                return <Contact nav={(page) => this.nav(page)} items={this.state.items} />
            default:
                return <ERROR404 nav={(page) => this.nav(page)} items={this.state.items} />

        }

    }


    render() {
        return (
            <div id="wraper">
                {this.state.loading && <Loading />}
                {!this.state.loading && this.pageRender()}
                <Footer nav={(page) => this.nav(page)} />
            </div>
        )
    }


}
