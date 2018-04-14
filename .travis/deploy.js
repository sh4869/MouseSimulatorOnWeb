const ghpages = require("gh-pages");
const path = require("path");

const GH_TOKEN = process.env.GH_TOKEN;
const repo = "@github.com/sh4869/MouseSimulatorOnWeb.git"
ghpages.publish(
    path.join(__dirname, '..', 'build'),
    {
        repo: 'https://' + GH_TOKEN + repo,
        user: {
            name: "sh4869",
            email: "nobuk4869@gmail.com",
        },
        message: "[ci skip] UPDATEE WEBPAGE",
        branch: "gh-pages"
    },
    function (err) {
        if(err){
            console.log(err);
            process.exit(1);
        } else {
            console.log("Update WebPage");
        }
    }
);