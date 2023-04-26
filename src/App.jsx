import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

function App() {
  const [count, setCount] = useState(0);
  const [quote, setQuote] = useState(null);

  const requestQuotes = async () => {
    const response = await axios.get("https://api.adviceslip.com/advice");
    const data = await response.data;
    console.log(data);
    setQuote(data);
  };
  //requestQuotes();
  useEffect(() => {
    requestQuotes();
  }, []);

  return (
    <>
      <Main>
        <QuoteBox>
          <Quote>{quote ? quote.slip.advice : null}</Quote>
          <img style={{ height: "18px" }} src="/icon-refresh.svg" alt="" />
          {/*<svg width="18" height="18" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.188 10.667a.208.208 0 01.147.355l-2.344 2.206a5.826 5.826 0 009.578-2.488l2.387.746A8.322 8.322 0 013.17 14.94l-2.149 2.022a.208.208 0 01-.355-.148v-6.148h6.52zm7.617-7.63L16.978.958a.208.208 0 01.355.146v6.23h-6.498a.208.208 0 01-.147-.356L13 4.765A5.825 5.825 0 003.43 7.26l-2.386-.746a8.32 8.32 0 0113.76-3.477z"
              fill="#FFF"
              fillRule="nonzero"
              opacity=".5"
            />
          </svg>*/}
        </QuoteBox>
      </Main>
    </>
  );
}

export default App;

const Main = styled.main`
  height: 100vh;
  padding: 0 26px;
`;

const QuoteBox = styled.div`
  display: flex;
  //justify-content: space-between;
  gap: 16px;
  background-color: blue;
`;

const Quote = styled.p``;

//<img src="/icon-refresh.svg" alt="" />
