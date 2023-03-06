import styled from "styled-components";

const HeaderContainer = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60px;
    background-color: ${props => props.theme.black.veryDark};
    height: 60px;
    @media only screen and (min-width: 768px) {
        height: 80px;
    }
    @media only screen and (min-width: 1200px) {
        height: 100px;
    }
`;
const Title = styled.h1`
    font-size: 20px;
    @media only screen and (min-width: 768px) {
        font-size: 25px;
    }
    @media only screen and (min-width: 1200px) {
        font-size: 30px;
    }
`;

function Header() {
    return <HeaderContainer>
        <Title>Angular / Angular-cli</Title>
    </HeaderContainer>;
}

export default Header;