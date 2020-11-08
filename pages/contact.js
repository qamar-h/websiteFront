import React from 'react'
import Head from 'next/head'
import config from '../Config/contact'
import axios from 'axios'

export default class contact extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            form: JSON.parse(JSON.stringify(config.form)),
            error:false,
            errorMessage:[],
            success:false,
            submited:false,
        }

    }

    /**
     * Permet de mettre à jour le formulaire dans le state
     *
     * @param e
     */
    formChange(e){
        const {name,value} = e.target;
        this.setState({
            form:{
                ...this.state.form,
                [name]:{
                    ...this.state.form[name],
                    value:value,
                }
            }
        })
    }

    /**
     * Permet de gérer la soumission du formulaire
     *
     * @param e
     */
    handleSubmit(e) {

        this.setState({
            ...this.state,
            error:false,
            errorMessage:[],
            submited:true,
        })

        let validation = true
        let errorMessage = []
        const error = (message) => {
            validation = false;
            errorMessage.push(message);
        }
        Object.keys(this.state.form).map((i) => {
            const {value,label,regex,required} = this.state.form[i];
            if(required){

                if(value == null || value == "") {
                    error(label + ' est requis')
                }else if(!value.match(regex)){
                    error(label + ' est invalide')
                }

            }else{
                if(value != null && value !== "" && !value.match(regex)) error(label + ' est invalide')
            }
        })

        if(validation) {

            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today =  yyyy + '-' + mm + '-' + dd;

             axios.post(process.env.api + '/mails',{
                name: this.state.form.name.value,
                email: this.state.form.email.value,
                subject: this.state.form.subject.value,
                message: this.state.form.message.value,
                createdAt: today + 'T00:00:00.081Z'
            })
            .then(() => {
                this.setState({...this.state, error:false, errorMessage:[],success:true},() => {
                    document.getElementById('contact-form').reset()
                    setTimeout(() => this.setState({success:false,form:JSON.parse(JSON.stringify(config.form))}),2000)
                })
            })
            .catch(error => {
                console.log(error);
            })
             .finally(() => this.setState({submited:false}));

        }else{
            this.setState({...this.state, error:true, errorMessage,submited:false})
        }

        e.preventDefault();
    }

    render() {
        return (<>
            <Head>
                <title>Contact |
                    {this.props.items.find(i => i.name == "fullname") != undefined && this.props.items.find(i => i.name == "fullname").value }
                </title>
            </Head>

            <header class="head">

                <div class="container">

                    <div class="row">
                        <div class="col-xs-8 col-sm-11 col-lg-11">
                            <img class="logo-page" src="./assets/img/contact_l.png" alt="qamarh"/>

                            <h2 class="title">Contact</h2>

                            <h4 class="sub-title">N'hesitez pas à me contacter</h4>
                        </div>
                        <div class="col-xs-4 col-sm-1 col-lg-1 text-right">
                            <a class="btn-close hover-animate" onClick={() => this.props.nav('index') }></a>
                        </div>
                    </div>

                </div>

            </header>

            <section class="content padding-block border-bottom">

                <div class="container">

                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-lg-6 padding-bottom">
                            <h3 class="title title-contact">Informations</h3>
                            <div class="block-grey">
                                <table>
                                    <tr>
                                        <td class="font-weight-m width-td">Nom</td>
                                        <td>{this.props.items.find(i => i.name == "fullname") != undefined && this.props.items.find(i => i.name == "fullname").value}</td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-m">E-mail</td>
                                        <td>
                                            {this.props.items.find(i => i.name == "email") !== undefined &&
                                                <a href={"mailto:" + this.props.items.find(i => i.name == "email").value } ></a>
                                            }
                                        </td>
                                    </tr>
                                </table>

                                <div class="social">
                                    <ul>
                                        <li><a class="ukie-icons hover-animate" href={process.env.socials.linkedin} target={'_blank'}><i class="fa fa-linkedin"></i></a>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-lg-6">
                            <h3 class="title title-contact">Formulaire</h3>

                            <div class="contact-form">
                                <form onSubmit={this.handleSubmit.bind(this)} id="contact-form" >
                                    <input type="text" id="user-name" name="name" placeholder="Nom" onChange={this.formChange.bind(this)} />
                                    <input type="email" id="user-email" name="email"  placeholder="Email" onChange={this.formChange.bind(this)} />
                                    <input type="text" id="user-name" name="subject"  placeholder="Object" onChange={this.formChange.bind(this)} />
                                    <textarea id="user-message" name="message" placeholder="Message" onChange={this.formChange.bind(this)} ></textarea>
                                    <div class="footer-form">

                                        {this.state.error && <div className={"alert alert-danger"}>
                                            <ul>
                                                {this.state.errorMessage.map((e) => <li>{e}</li>)}
                                            </ul>
                                        </div> }

                                        {this.state.success && <div className={"alert alert-success"}>
                                            <i className={"fa fa-check"}></i> {config.success.message}
                                        </div> }

                                        {this.state.submited &&
                                            <img src={"./assets/img/loading.gif"} style={{display:"block", margin: "auto", width:"30px"}}/>
                                        }

                                        <input type="submit" id="submit-btn" class="btn btn-color hover-animate" value="Envoyer"/>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>

                </div>

            </section>

        </>)
    }

}