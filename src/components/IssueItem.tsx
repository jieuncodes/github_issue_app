import { Link } from "react-router-dom";
import styled from "styled-components";

const AD_PATH = 'https://hellobot-test.s3.ap- northeast-2.amazonaws.com/image/01fdd797-0477-4717-8d70-8551150463f7';
const AD_LINK = 'https://thingsflow.com/ko/home';
const AdImg = styled.img`
    width: 100%;
    @media only screen and (min-width: 768px) {
        width: 300px;
    }
`;

interface IUser {
    login: string;
}
interface Iissue {
    number: number;
    title: string;
    user: IUser;
    comments: number;
}
interface Ipage {
    page: number;
}

function IssueItem({ page }: Ipage) {
    

    return (<>
        <Link to={AD_LINK}>
            <AdImg src={AD_PATH} />
        </Link>
    </>);
}

export default IssueItem;