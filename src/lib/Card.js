import React from "react";
import styled from "styled-components/macro";

const Container = styled.div`
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 25%), 0px 1px 3px 0px rgb(0 0 0 / 22%);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin: 100px auto;
  width: 500px;
  height: 500px;
  background-color: white;
  border-radius: 6px;
`;

const Title = styled.h1`
font-size: 30px
color: blue;
`;
const SecondaryText = styled.p`
  font-size: 19px;
  color: pink;
`;

const Thumbnail = styled.div`
  width: 100px;
  height: 100px;
  border: 3px solid red;
  border-radius: 50%;
  background-image: url(${(props) => props.url});
  background-size: cover;
  margin: 10px;
`;

const TitleBar = styled.div`
  display: flex;
  align-items: center;
`;
const CoverImg = styled.img`
  height: 400px;
  border-radius: 6px 6px 0 0;
`;
const Container2 = styled.div`
  padding: 20px;
`;

export const Card = ({ title, secondaryText, thumbnailUrl, coverimg }) => {
  return (
    <Container>
      <CoverImg src={coverimg} />
      <Container2>
        <TitleBar>
          {thumbnailUrl && <Thumbnail url={thumbnailUrl} />}
          <div>
            {title && <Title>{title}</Title>}
            Here is my card
            {secondaryText && <SecondaryText>{secondaryText}</SecondaryText>}
          </div>
        </TitleBar>
      </Container2>
    </Container>
  );
};
