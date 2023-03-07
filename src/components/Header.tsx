import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { issueNameState } from "../atoms";

const HeaderContainer = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;    
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
    const getIssueNames = useRecoilValue(issueNameState);
    const defaultIssueName = getIssueNames[0];

    return <HeaderContainer>
        <Title>{defaultIssueName.org} / {defaultIssueName.rep}</Title>
    </HeaderContainer>;
}

export default Header;