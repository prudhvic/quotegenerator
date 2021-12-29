window.addEventListener("DOMContentLoaded", () => {
  let newQuote = document.getElementById("new-quote-text");
  let newAuthor = document.getElementById("author");
  let tweetBtn = document.getElementById("tweet-btn");
  let newQuoteBtn = document.getElementById("new-quote");
  let loader = document.getElementById("loader");
  let main = document.querySelector("main");
  let quotes = [];
  function loading() {
    loader.hidden = false;
    main.style.display = "none";
  }
  function completed() {
    loader.hidden = true;
    main.style.display = "block";
  }
  function getRandomQuote() {
    loading();
    let rnum = Math.floor(Math.random() * quotes.length);
    let quote = quotes[rnum];
    newQuote.textContent = quote.text ? quote.text : "No quote found try later";
    newAuthor.textContent = quote.author ? quote.author : "unknown";
    completed();
  }
  let tweetQuote = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${newQuote.textContent}-${newAuthor.textContent}`,
      "_blank"
    );
  };
  let fetchQuotes = async () => {
    loading();

    try {
      let quoteUrl = "https://type.fit/api/quotes";
      let response = await fetch(quoteUrl);
      let json = await response.json();
      quotes = json;
    } catch (err) {}
    getRandomQuote();
    completed();
  };
  fetchQuotes();
  loading();

  newQuoteBtn.addEventListener("click", getRandomQuote);
  tweetBtn.addEventListener("click", tweetQuote);
});
