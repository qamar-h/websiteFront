const contact = {

    form:{
        name:{
            value:null,
            required:true,
            label:'Nom',
            regex:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/
        },
        email:{
            value:null,
            required:true,
            label:'Email',
            regex:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        },
        subject:{
            value:null,
            required:true,
            label:'Objet',
            regex:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/
        },
        message:{
            value:null,
            required:true,
            label:'Message',
            regex:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/
        },
    },
    success: {
        message: 'Message envoyé avec succès',
    }

}
export default contact