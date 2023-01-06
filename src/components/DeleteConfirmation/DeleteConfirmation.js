import styled from "styled-components";
import { mainFont } from "../../constants/fonts";

export default function DeleteConfirmation(visible) {
  return (
    <ConfirmationContainer visible={visible}>
      <div>
        <p>
          Are you sure you want
          <br />
          to delete this post?
        </p>
        <div>
            <ButtonStyle color="#1877f2" background="#ffffff">No, go back</ButtonStyle>
            <ButtonStyle color="#ffffff" background="#1877f2">Yes, delete it</ButtonStyle>
        </div>  
      </div>
    </ConfirmationContainer>
  );
}

const ConfirmationContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  min-width: 100vw;
  min-height: 100vh;
  z-index: 2;
  display: ${(props) => props.visible ? "flex" : "none"};
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  > div{
    font-family: ${mainFont};
    font-weight: 700;
    width: 41.46vw;
    height: 18.2vw;
    border-radius: 3.47vw;
    background-color: #333333;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2.5vw;
    p{
        font-size: 2.37vw;
        color: #ffffff;
        text-align: center;
    }
    div{
        display: flex;
        gap: 1.5vw;
    }
  }
`;

const ButtonStyle = styled.button`
    font-weight: 700;
    width: 9.3vw;
    height: 2.6vw;
    border-radius: 0.35vw;
    font-size: 1.25vw;
    color: ${(props) => props.color};
    background-color: ${(props) => props.background};
    border: none;
`