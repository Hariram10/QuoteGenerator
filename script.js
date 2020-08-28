const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const AuthorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//Show loader

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete(){
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

//Get data from api
async function getQuote(){

    loading();
// proxy url created by heroku
const proxyUrl = 'https://warm-basin-97378.herokuapp.com/';


    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        //If author is empty return with Unknown
        if(data.quoteAuthor === ''){
            AuthorText.innerHTML = 'Unknown';
        }else{
            AuthorText.innerHTML = data.quoteAuthor;
        }
        //If the length of the qoute is longer then reduce the font size
        if(data.quoteText.length > 120 ){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }

        // constOfGetElementId.innerHtml = dataRecievedFromResponse.attributeFromTheRespose
        quoteText.innerHTML = data.quoteText;
        //console.log(data);
        complete();
    }catch(error){
        getQuote();
        //console.log('Hey idiottt!!',error);
    }

}


function tweetQuote(){
    const quote = quoteText.innerHTML;
    const author = AuthorText.innerHTML;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}
//EventListner
newQuoteButton.addEventListener('click', getQuote);
twitterButton.addEventListener('click', tweetQuote);

//On Load
getQuote();
// loading();