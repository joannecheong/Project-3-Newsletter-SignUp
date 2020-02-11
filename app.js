const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
    
})

app.post("/", function(req, res) {
    
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    console.log(firstName + lastName + email);

    var data = {
        members: [
            {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
            }
        ]
    }

    var jsonData = JSON.stringify(data);

    var options = {
        url: "https://us4.api.mailchimp.com/3.0/lists/5a79f39370",
        method: "POST",
        headers: {
            "Authorization": "joannemilktea 0db7978a2cf71d562c17114d022eb563-us4"
        },
        body: jsonData
    }

    request(options, function(error, response, body) {
        if (error){
            res.send("There was an error with signing up, please try again!")   
        } else {
            if (response.statusCode === 200) {
                res.sendFile(__dirname + "/success.html")
            } else {
                res.sendFile(__dirname + "/failure.html")
            }
        }
    })

})
    
app.post("/failure", function(req, res) {
    res.redirect("/");
})

app.listen(3000, function(){
    console.log("Listening on port 3000");
    
})


//api keys 0db7978a2cf71d562c17114d022eb563-us4
//list id 5a79f39370