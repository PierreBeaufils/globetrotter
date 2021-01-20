const nodemailer = require ("nodemailer") ;

const mailApp = {
    transporter: nodemailer.createTransport({
        host: "smtp.mailgun.org",
        port: 587,
        secure: false,
        auth : {
            user: 'postmaster@sandbox4d8b6e87c5334562a56d85f438edf9ec.mailgun.org',
            pass: 'bb1f765a9b8fe848ff87a628def683f1-53c13666-8734f5dc'
            // /!} Dont forget to pass username and password in .env
        }
    }
    
    ),
    messageConstructor: (recipient,token) => {
        message = {
            from: "test@globetrotter.com",
            to: recipient,
            subject: "Confirmation de votre adresse mail",
            text: `Bienvenue chez GlobeTrotter voyageur, pour vérifier ton compte utilisateur suit le lien suivant : http://localhost.com/?token=${token} ou colle le dans ton navigateur`,
            html: `<h1>Bienvenue chez GlobeTrotter voyageur,</h1>
            <h2>pour vérifier ton compte utilisateur suit le lien suivant :</h2>
            <a href="http://localhost.com/?token=${token}">clique ici</a>
            <p>Tu peux aussi coller ce lien dans ton navigateur : <br>
            http://localhost.com/?token=${token}
                       `};
        return message;
    },
    
};



// sendMail.transporter.verify(function(error,success) {
//     if (error) {console.log(error)}
//     else {
//         console.log("Le serveur nest prêt")
//     }
// });

// Test Authentification parameters of the server

module.exports = mailApp;