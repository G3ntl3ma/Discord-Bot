const apiKey = '7a16aa231e494dc59e3193ee84711a99';
const url = 'https://api.rebrandly.com/v1/links';

module.exports = {
    name : "short",
    description : 'Gives back a shorter Link from the given Link.',
    execute(message, link){

        (async ()=>{

            //Turns the link into a json-string
            const data = JSON.stringify({destination: link});
            //calls the API to shorten the link
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                    'apikey': apiKey
                },
                body: data
            })
            var jsonResponse;
            if(response.ok){
            jsonResponse = await response.json();
            } else {
                throw new Error('Something went wrong!')
            }
            
            if(jsonResponse.errors){
                message.channel.send('Sorry, your link could not be formated :(')
            }
            else{
                message.channel.send('Here is your shortened link: '+ jsonResponse.shortUrl);
                console.log(jsonResponse.shortUrl)
            }
           
            })();
    }
    }
