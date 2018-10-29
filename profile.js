// Required modules
const https = require('https');
const http = require('http');

// Print Error Messages
function printError(err) {
    console.error(err.message);
}

// Function to print message to console
function printMessage (username, badgeCount, points) {
    const mesaj = `${username} adlı kullanıcı ${badgeCount} adet badge e ve JavaScript bölümünde ${points} puana sahiptir.`;
    console.log(mesaj);
}

function get(username) {
    try {
        // Connect to the API URL (https://teamtreehouse.com/username.json)
        const talep = https.get(`https://teamtreehouse.com/${username}.json`, (res) => {
            if (res.statusCode === 200) {
                // Read the data
                let body = "";
                res.on('data', (chunk) => {
                    body += chunk.toString();
                })
                res.on('end', () => {
                    try {
                        // Parse the data
                        const profile = JSON.parse(body);
                        // Print the data
                        printMessage(username, profile.badges.length, profile.points.JavaScript);
                    } catch (err) {
                        printError(err);
                    }
                });
            } else {
                const message = `${username} profilini alırken bir problem oluştu. (${http.STATUS_CODES[res.statusCode]})`;
                const statusCodeErr = new Error(message);
                printError(statusCodeErr); 
            }
    });
        talep.on('error', printError);
    } catch (err) {
        printError(err);
    }
}

module.exports.getir = get;