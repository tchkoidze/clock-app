import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

function App() {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [quote, setQuote] = useState(null);
  const [location, setLocation] = useState("");

  const requestQuotes = async () => {
    const response = await axios.get("https://api.adviceslip.com/advice");
    const data = await response.data;
    console.log(data);
    setQuote(data);
  };

  const requestTime = async () => {
    const response = await axios.get("http://worldtimeapi.org/api/ip");
    const data = await response.data;

    const datetimeString = data.datetime;
    const date = new Date(datetimeString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    console.log(`${hours}:${minutes}`);
    console.log(data);
    console.log(hour);

    setHour(hours);
    setMinute(minutes);
  };

  const requestLocation = async () => {
    const response = await axios.get(
      "https://api.ipbase.com/v2/info?apikey=F42KW6vxqGf6MXNxj6sIJ41SNbQWNDnhMaTEr1jL"
    );
    const data = await response.data;
    console.log(data.data.location);
    setLocation(data.data.location);
  };

  useEffect(() => {
    requestTime();
    requestQuotes();
    //requestLocation();
  }, []);

  return (
    <>
      <Main>
        <QuoteBox>
          <Quote>{quote ? quote.slip.advice : null}</Quote>
          {/*<img style={{ height: "18px" }} src="/icon-refresh.svg" alt="" />*/}
          <Svg>
            <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.188 10.667a.208.208 0 01.147.355l-2.344 2.206a5.826 5.826 0 009.578-2.488l2.387.746A8.322 8.322 0 013.17 14.94l-2.149 2.022a.208.208 0 01-.355-.148v-6.148h6.52zm7.617-7.63L16.978.958a.208.208 0 01.355.146v6.23h-6.498a.208.208 0 01-.147-.356L13 4.765A5.825 5.825 0 003.43 7.26l-2.386-.746a8.32 8.32 0 0113.76-3.477z"
                fill="#FFF"
                fillRule="nonzero"
                opacity=".5"
              />
            </svg>
          </Svg>
        </QuoteBox>
        <InformationBox>
          <TimeLocationBox>
            <GreetingBox>
              {hour <= 12 ? (
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11.78 19.417c.594 0 1.083.449 1.146 1.026l.006.125v1.842a1.152 1.152 0 01-2.296.125l-.007-.125v-1.842c0-.636.516-1.151 1.152-1.151zM6.382 17.18a1.15 1.15 0 01.09 1.527l-.09.1-1.302 1.303a1.152 1.152 0 01-1.718-1.528l.09-.1 1.302-1.302a1.15 1.15 0 011.628 0zm12.427 0l1.303 1.303a1.15 1.15 0 11-1.628 1.627L17.18 18.81a1.15 1.15 0 111.628-1.628zM11.781 5.879a5.908 5.908 0 015.901 5.902 5.908 5.908 0 01-5.901 5.902 5.908 5.908 0 01-5.902-5.902 5.908 5.908 0 015.902-5.902zm10.63 4.75a1.151 1.151 0 110 2.303h-1.843a1.151 1.151 0 110-2.303h1.842zm-19.418 0a1.151 1.151 0 01.126 2.296l-.125.007H1.15a1.151 1.151 0 01-.125-2.296l.125-.007h1.842zm1.985-7.268l.1.09 1.303 1.302a1.151 1.151 0 01-1.528 1.718l-.1-.09L3.45 5.08A1.15 1.15 0 014.978 3.36zm15.133.09c.45.449.45 1.178 0 1.628L18.808 6.38a1.151 1.151 0 11-1.628-1.628l1.303-1.303c.449-.449 1.178-.449 1.628 0zM11.781 0c.636 0 1.151.515 1.151 1.151v1.843a1.152 1.152 0 01-2.303 0V1.15C10.63.515 11.145 0 11.781 0z"
                    fill="#FFF"
                    fill-rule="nonzero"
                  />
                </svg>
              ) : (
                <svg width="23" height="24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M22.157 17.366a.802.802 0 00-.891-.248 8.463 8.463 0 01-2.866.482c-4.853 0-8.8-3.949-8.8-8.8a8.773 8.773 0 013.856-7.274.801.801 0 00-.334-1.454A7.766 7.766 0 0012 0C5.382 0 0 5.382 0 12s5.382 12 12 12c4.2 0 8.02-2.134 10.218-5.709a.805.805 0 00-.061-.925z"
                    fill="#FFF"
                    fill-rule="nonzero"
                  />
                </svg>
              )}
              <Greeting>
                {hour <= 12 ? "GOOD MORNING" : "GOOD EVENING"}
              </Greeting>
            </GreetingBox>
            <TimeBox>
              <Time>{`${hour}:${minute}`}</Time>
              <BST>BST</BST>
            </TimeBox>

            <Location>
              {location
                ? `${location.region.name}, ${location.country.alpha2}`
                : null}
            </Location>
          </TimeLocationBox>
          <ShowMoreBtn>more</ShowMoreBtn>
        </InformationBox>
      </Main>
    </>
  );
}

export default App;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  padding: 0 26px;

  background-image: linear-gradient(
      rgba(169, 169, 169, 0.5),
      rgba(169, 169, 169, 0.5)
    ),
    url("./mobile/bg-image-daytime.jpg");
  background-size: cover;
`;

const QuoteBox = styled.div`
  display: flex;
  //justify-content: space-between;
  gap: 16px;
  //background-color: blue;
`;

const Quote = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 22px;
  color: #fff;
`;

const Svg = styled.svg`
  width: 18px;
  height: 18px;
`;

const InformationBox = styled.div``;

const TimeLocationBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const GreetingBox = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Greeting = styled.p`
  font-weight: 400;
  font-size: 15px;
  line-height: 25px;
  letter-spacing: 3px;
`;

const TimeBox = styled.div`
  display: flex;
`;

const Time = styled.p`
  font-weight: 700;
  font-size: 100px;
  line-height: 100px;
  letter-spacing: -2.5px;
`;

const BST = styled.span`
  align-self: flex-end;
`;

const LocationBox = styled.div`
  display: flex;
`;

const City = styled.p`
  margin-right: 8px;
`;
const Country = styled.p``;

const Location = styled.p``;

const ShowMoreBtn = styled.button``;
//<img src="/icon-refresh.svg" alt="" />
