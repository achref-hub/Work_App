exports.mail_cancellation_validator = async (sender, date) => {

    var text = `${sender.firstname} ${sender.lastname} has cancelled a WFH request for ${date}.
    If you want to have more details, please check WorkPoint mobile app or follow the link below.
    https://flexworkingatey.workpoint.tn/web/auth`
    return text

}

exports.mail_cancellation_operation = async (sender, date, slot) => {

    var text = `${sender.firstname} ${sender.lastname} has cancelled a WFH slot for the day ${date} ${slot}.
    If you want to have more details, please check WorkPoint mobile app or follow the link below.
    https://flexworkingatey.workpoint.tn/web/auth`
    return text

}

exports.mail_cancellation_operation_REMOTE = async (
    sender,
    datedebut,
    datefin,
  ) => {
    var text = `${sender.firstname} ${sender.lastname} has cancelled a Remote Working request from ${datedebut} to ${datefin}.
      If you want to have more details, please check WorkPoint mobile app or follow the link below.
      https://flexworkingatey.workpoint.tn/web/auth`;
    return text;
  };

exports.mail_submission_validator = async (sender, date) => {
    var text = `You have a new work from home request from ${sender.firstname} ${sender.lastname} for ${date}
    You can check WorkPoint mobile app or follow the link below to approve or reject it.
    https://flexworkingatey.workpoint.tn/web/auth`
    return text
}


exports.mail_new_user = async (email, password) => {
    var text = `WorkPoint app has been specially developed to help you schedule your office work journey. With a few clicks, it allows you to search, choose and book your desk or parking spot when you plan to come to office. You can also manage WFH requests.
                      
    Please find in the following your login information:

    Your Login : ${email}

    Your password : ${password}

    Let’s start by downloading the app, you can follow the links below:
    Android : https://play.google.com/store/apps/details?id=workpoint.app
    IOS :  https://apps.apple.com/app/id1570657484

    We would be happy to receive your valuable feedback. Your comments and suggestions will help us enhance the user experience or develop additional features ! You can also reach us at support@workpoint.tn .
 
      `
    // Plain text body
    //html: '<b>Hello {{req.body.lastname}}</b><br>',
    // html: `<!doctype html>
    //   <html ⚡4email>
    //     <head>
    //       <meta charset="utf-8">
    //       <style amp4email-boilerplate>body{visibility:hidden}</style>
    //       <script async src="https://cdn.ampproject.org/v0.js"></script>
    //       <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
    //     </head>
    //     <body>
    //     <br><br><br>
    //     <center><img width="100px" src="https://workpoint.tn/assets/img/logo.png"></img>
    //     <br><br>
    //     <fieldset style=" width: 80%;
    //               margin: 20px;
    //               padding: 0 10px 10px;
    //               border: 2px solid #e8eaed;
    //               border-radius: 8px;
    //               box-shadow: 0 0 10px #e8eaed;
    //               padding-top: 10px;">
    //       <p><b>Hello ${req.body.firstname}</b> </p><br>
    //       <p>Welcome to WorkPoint BetaTest program ! </p>
    //       <p>WorkPoint app has been specially developed to help you schedule your office work journey. With a few clicks, it allows you to search, choose and book your desk or parking spot when you plan to come to office.</p>
    //       <p>Let’s start by downloading the app !</p>

    //       <center>
    //       <a style="margin: 10px;" href="https://play.google.com/store/apps/details?id=workpoint.app"><img width="50px" src="https://image.flaticon.com/icons/png/512/226/226770.png" /></a>
    //       <a style="margin: 10px;" href="https://apps.apple.com/app/id1570657484"><img width="60px" src="https://cdn3.iconfinder.com/data/icons/social-media-logos-glyph/2048/5315_-_Apple-512.png" /></a>
    //       </center>
          
    //       <p>Please find in the following your login information:<p>
    //       <br>
    //       <p>Your Login : ${req.body.Email}</p>
    //       <p>Your password : ${req.body.password}</p>
    //       <p>To know more about WorkPoint features, we invite you to watch the video below.</p>
    //       <a href="https://www.youtube.com/watch?v=yscKSYswlLE">https://www.youtube.com/watch?v=yscKSYswlLE</a>
    //       <p>We would be happy to receive your valuable feedback. Your comments and suggestions will help us enhance the user experience or develop additional features ! You can also reach us at support@workpoint.tn .</p>

    //       <br>
    //       <p>--------------------------</p>
    //       <p>Kind regards,</p>
    //       <p>WorkPoint Team</p>
          
    //       <a href="www.workpoint.tn">www.workpoint.tn</a>
          


          

    //       </fieldset>
    //       </center>
          
    //     </body>
    //   </html>`
    return text
}



exports.mail_submission_personNotif = async (sender, date) => {
    var text = `${sender.firstname} ${sender.lastname} wants to notify you about a WFH request for ${date}`
    return text
}

exports.mail_submissionRemote_validator = async (sender, start, end) => {
    var text = `You have a new remote working request from ${sender.firstname} ${sender.lastname} for the period between ${start} and ${end}
    You can check WorkPoint mobile app or follow the link below to approve or reject it.
    https://flexworkingatey.workpoint.tn/web/auth`
    return text
}

exports.mail_submissionRemote_personNotif = async (sender, date) => {
    var text = `${sender.firstname} ${sender.lastname} wants to notify you about a remote working request for the period between ${start} and ${end}`
    return text
}

exports.mail_approval = async () => {
    var text = `The validator has approved your WFH request.
      You can check WorkPoint mobile app or follow the link below to see more details.
      https://flexworkingatey.workpoint.tn/web/auth`
    return text
}

exports.mail_rejection = async (date) => {
    var text = `The validator has rejected your WFH request created at ${date}.
    You can check WorkPoint mobile app or follow the link below to see more details.
    https://flexworkingatey.workpoint.tn/web/auth`
    return text
}

exports.notif_cancellation = async () => {
    var text = ''
    return text
}

exports.notif_add = async () => {
    var text = ''
    return text
}

exports.notif_update = async () => {
    var text = ''
    return text
}