import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [text, setText] = useState<string>("");
  const [quotes, setQuotes] = useState<any[]>([]);
  const [index, setIndex] = useState(0);
  const handleClick = async (e) => {
    console.log(e);
    e.preventDefault();
    if (quotes.length === 0) {
      const response = await fetch("https://dummyjson.com/quotes");
      let data = await response.json();
      setQuotes(data.quotes);
      setText(data.quotes[0].quote); // first author
      setIndex(1);
    } else {
      // Show next author
      setText(quotes[index].quote);
      setIndex((prev) => (prev + 1) % quotes.length);
    }
  };

  return (
    <form className="quote-form">
      <input type="text" value={text} readOnly className="quote-input" />
      <button
        type="button"
        onClick={(e) => handleClick(e)}
        className="quote-button"
      >
        Next Author
      </button>
    </form>
  );
}
