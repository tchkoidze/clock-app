import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

function App() {
  const [time, setTime] = useState(null);
  const [quote, setQuote] = useState(null);
  const [location, setLocation] = useState("");
  const [clicked, setClicked] = useState(false);

  let x = "";
  if (time) {
    const clock = new Date(time.datetime);
    console.log(clock);
    const hour = clock.getHours();
    const minute = clock.getMinutes();
    x = `${hour}:${minute}`;
  }

  console.log(time);
  const requestQuotes = async () => {
    try {
      const response = await axios.get("https://api.adviceslip.com/advice");
      const data = await response.data;
      console.log(data);
      setQuote(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const requestTime = async () => {
    try {
      const response = await axios.get("https://worldtimeapi.org/api/ip");
      const data = await response.data;
      console.log(data);
      setTime(data);
      console.log(data.datetime);
    } catch (error) {
      console.error(error.message);
    }
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
        {!clicked ? (
          <QuoteBox>
            <Quote>{quote ? quote.slip.advice : null}</Quote>

            <div style={{ width: "18px", height: "18px" }}>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 18 18"
                onClick={() => {
                  requestQuotes();
                }}
              >
                <path d="M7.188 10.667a.208.208 0 01.147.355l-2.344 2.206a5.826 5.826 0 009.578-2.488l2.387.746A8.322 8.322 0 013.17 14.94l-2.149 2.022a.208.208 0 01-.355-.148v-6.148h6.52zm7.617-7.63L16.978.958a.208.208 0 01.355.146v6.23h-6.498a.208.208 0 01-.147-.356L13 4.765A5.825 5.825 0 003.43 7.26l-2.386-.746a8.32 8.32 0 0113.76-3.477z" />
              </Svg>
            </div>
          </QuoteBox>
        ) : null}

        <InformationBox>
          <TimeLocationBox>
            <GreetingBox>
              {5 > parseFloat(x) <= 23 ? (
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11.78 19.417c.594 0 1.083.449 1.146 1.026l.006.125v1.842a1.152 1.152 
                    0 01-2.296.125l-.007-.125v-1.842c0-.636.516-1.151 1.152-1.151zM6.382 17.18a1.15 
                    1.15 0 01.09 1.527l-.09.1-1.302 1.303a1.152 1.152 0 01-1.718-1.528l.09-.1 1.302-1.302a1.15
                    1.15 0 011.628 0zm12.427 0l1.303 1.303a1.15 1.15 0 11-1.628 1.627L17.18 18.81a1.15 1.15
                    0 111.628-1.628zM11.781 5.879a5.908 5.908 0 015.901 5.902 5.908 5.908 0 01-5.901 5.902 
                    5.908 5.908 0 01-5.902-5.902 5.908 5.908 0 015.902-5.902zm10.63 4.75a1.151 1.151 0 110 
                    2.303h-1.843a1.151 1.151 0 110-2.303h1.842zm-19.418 0a1.151 1.151 0 01.126
                    2.296l-.125.007H1.15a1.151 1.151 0 01-.125-2.296l.125-.007h1.842zm1.985-7.268l.1.09
                    1.303 1.302a1.151 1.151 0 01-1.528 1.718l-.1-.09L3.45 5.08A1.15 1.15 0 014.978
                    3.36zm15.133.09c.45.449.45 1.178 0 1.628L18.808 6.38a1.151 1.151 0 
                    11-1.628-1.628l1.303-1.303c.449-.449 1.178-.449 1.628 0zM11.781 0c.636 0 1.151.515 
                    1.151 1.151v1.843a1.152 1.152 0 01-2.303 0V1.15C10.63.515 11.145 0 11.781 0z"
                    fill="#FFF"
                    fillRule="nonzero"
                  />
                </svg>
              ) : (
                <svg width="23" height="24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M22.157 17.366a.802.802 0 00-.891-.248 8.463 8.463 0 01-2.866.482c-4.853 0-8.8-3.949-8.8-8.8a8.773 8.773 0 013.856-7.274.801.801 0 00-.334-1.454A7.766 7.766 0 0012 0C5.382 0 0 5.382 0 12s5.382 12 12 12c4.2 0 8.02-2.134 10.218-5.709a.805.805 0 00-.061-.925z"
                    fill="#FFF"
                    fillRule="nonzero"
                  />
                </svg>
              )}
              <Greeting>
                {5 < parseFloat(x) <= 23 ? "GOOD MORNING" : "GOOD EVENING"}
              </Greeting>
            </GreetingBox>
            <TimeBox>
              <Time>{x}</Time>
              <BST>BST</BST>
            </TimeBox>

            <Location>
              {/*location
                ? `${location.region.name}, ${location.country.alpha2}`
              : null*/}
              lonon
            </Location>
          </TimeLocationBox>
          <ShowMoreBtn onClick={() => setClicked(!clicked)}>
            {clicked ? "less" : "more"}
            <ArrowBox clicked={clicked}></ArrowBox>
          </ShowMoreBtn>
        </InformationBox>
        {clicked ? (
          <AdditionalInfoBox>
            <AdditionalInfo>
              <Feature>CURRENT TIMEZONE</Feature>
              <Meaning>{time.timezone}</Meaning>
            </AdditionalInfo>

            <AdditionalInfo>
              <Feature>Day of the year</Feature>
              <Meaning>{time.day_of_year}</Meaning>
            </AdditionalInfo>

            <AdditionalInfo>
              <Feature>Day of the week</Feature>
              <Meaning>{time.day_of_week}</Meaning>
            </AdditionalInfo>

            <AdditionalInfo>
              <Feature>Week number</Feature>
              <Meaning>{time.week_number}</Meaning>
            </AdditionalInfo>
          </AdditionalInfoBox>
        ) : null}
      </Main>
    </>
  );
}

export default App;

const Main = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  background-size: cover;
  background-image: ${(props) =>
    5 < props.hour <= 12
      ? `linear-gradient(
          rgba(0, 0, 0, 0.5),
          rgba(0, 0, 0, 0.5)
        ), url(./public/mobile/bg-image-daytime.jpg)`
      : `url(./public/mobile/bg-image-nighttime.jpg)`};
  background-repeat: no-repeat;
  @media (min-width: 768px) {
    background-image: ${(props) =>
      5 < props.hour <= 12
        ? `linear-gradient(
          rgba(0, 0, 0, 0.5),
          rgba(0, 0, 0, 0.5)
        ), url(./public/tablet/bg-image-daytime.jpg)`
        : `url(./public/tablet/bg-image-nighttime.jpg)`};
  }
  @media (min-width: 1440px) {
    background-image: ${(props) =>
      5 < props.hour <= 12
        ? `linear-gradient(
          rgba(0, 0, 0, 0.5),
          rgba(0, 0, 0, 0.5)
        ), url(./public/desktop/bg-image-daytime.jpg)`
        : `url(./public/desktop/bg-image-nighttime.jpg)`};
  }
`;

const QuoteBox = styled.div`
  display: flex;
  gap: 16px;
  padding: 0 26px;
  margin-top: 32px;
  @media (min-width: 768px) {
    padding: 0 132px 0 64px;
    margin-top: 80px;
  }
  @media (min-width: 1440px) {
    padding: 0 165px;
  }
`;

const Quote = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 22px;
  color: #fff;
  @media (min-width: 768px) {
    font-size: 18px;
    line-height: 28px;
  }
`;

const Svg = styled.svg`
  width: 16px;
  height: 16px;
  opacity: 0.5;
  margin-top: 5px;
  path {
    fill: #fff;
    fill-rule: nonzero;
  }
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

const InformationBox = styled.div`
  padding: 0 26px;
  margin: 99px 0 40px;
  @media (min-width: 768px) {
    padding: 0 64px;
    margin: 153px 0 64px;
  }
  @media (min-width: 1440px) {
    display: flex;
    justify-content: space-between;
    padding: 0 165px;
    margin: 56px 0;
  }
`;

const TimeLocationBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media (min-width: 768px) {
    gap: 16px;
  }
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
  @media (min-width: 768px) {
    font-size: 18px;
    line-height: 28px;
    line-height: 3.6px;
  }
  @media (min-width: 1440px) {
    font-size: 20px;
    line-height: 4px;
  }
`;

const TimeBox = styled.div`
  display: flex;
`;

const Time = styled.p`
  font-weight: 700;
  font-size: 100px;
  line-height: 100px;
  letter-spacing: -2.5px;
  @media (min-width: 768px) {
    font-size: 175px;
    line-height: 175px;
    letter-spacing: -4.375px;
  }
  @media (min-width: 1440px) {
    font-size: 200px;
    line-height: 200px;
    letter-spacing: -5px;
  }
`;

const BST = styled.span`
  align-self: flex-end;
  margin-bottom: 10px;
  @media (min-width: 768px) {
    font-size: 32px;
    line-height: 28px;
    margin-bottom: 20px;
  }
  @media (min-width: 1440px) {
    font-size: 40px;
    margin-bottom: 30px;
  }
`;

const LocationBox = styled.div`
  display: flex;
`;

const City = styled.p`
  margin-right: 8px;
`;
const Country = styled.p``;

const Location = styled.p`
  font-size: 15px;
  line-height: 28px;
  letter-spacing: 3px;
  text-transform: uppercase;
  @media (min-width: 768px) {
    font-size: 18px;
    letter-spacing: 3.6px;
  }
  @media (min-width: 1440px) {
    font-size: 24px;
    letter-spacing: 4.8px;
  }
`;

const ShowMoreBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 15px;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 3.75px;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.5);
  padding: 3px 4px 4px 17px;
  border: none;
  border-radius: 28px;
  margin-top: 48px;
  &:hover {
    cursor: pointer;
  }
  @media (min-width: 768px) {
    font-size: 16px;
    line-height: 28px;
    letter-spacing: 5px;
    padding: 8px 9px 8px 21px;
  }
  @media (min-width: 1440px) {
    align-self: flex-end;
  }
`;

const ArrowBox = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #303030;

  &:hover {
    background-color: #999999;
  }

  background-image: ${(props) =>
    props.clicked
      ? `url(/desktop/icon-arrow-up.svg)`
      : `url(/desktop/icon-arrow-down.svg)`};

  background-repeat: no-repeat;
  background-position: center;
  @media (min-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;
//<img src="/icon-refresh.svg" alt="" />

const AdditionalInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 48px 26px;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(20.3871px);
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 120px 64px;
    gap: 49px;
  }
  @media (min-width: 1440px) {
    padding: 74px 165px;
    gap: 42px;
  }
`;

const AdditionalInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (min-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
  @media (min-width: 1440px) {
    gap: 9px;
  }
`;

const Feature = styled.p`
  font-weight: 400;
  font-size: 10px;
  line-height: 28px;
  letter-spacing: 2px;
  text-transform: uppercase;

  color: #303030;
  @media (min-width: 1440px) {
    font-size: 15px;
    letter-spacing: 3px;
  }
`;
const Meaning = styled.p`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: #303030;
  @media (min-width: 768px) {
    font-size: 40px;
    line-height: 48px;
  }
  @media (min-width: 1440px) {
    font-size: 56px;
    line-height: 68px;
  }
`;
