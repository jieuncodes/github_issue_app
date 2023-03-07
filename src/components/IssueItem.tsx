import styled from "styled-components";
import { IIssueList } from "../atoms";

const AD_PATH = 'https://hellobot-test.s3.ap- northeast-2.amazonaws.com/image/01fdd797-0477-4717-8d70-8551150463f7';
const AD_LINK = 'https://thingsflow.com/ko/home';
const AdImg = styled.img`
    width: 100%;
    @media only screen and (min-width: 768px) {
        width: 300px;
    }
`;

const IssueBox = styled.div`
    width: 100%;
    border-radius: 10px;
    margin-bottom: 15px;
    background-color: ${props => props.theme.black.lighter};
    color: ${props => props.theme.white.darker};
    padding: 10px;
    font-size: 15px;
    @media only screen and (min-width: 768px) {
        padding: 15px;
    }
    @media only screen and (min-width: 1200px) {
        padding: 20px;
        font-size: 14px;
    }
`;
const Span = styled.span`
    padding: 0 5px;
`;
const IssueTitle = styled(Span)`
    color: ${props => props.theme.green};
    font-size: 17px;
    @media only screen and (min-width: 1200px) {
        font-size: 16px;
    }
`;

function IssueItem({ issueList }: IIssueList) {
    
    return (<>
        {issueList &&
        issueList.map((issueItem) => 
        <IssueBox key={issueItem.number}>
            <div className="row">
                <div className="col-9">
                    <div>
                        <Span>#{issueItem.number}</Span> 
                        <IssueTitle>{issueItem.title}</IssueTitle>
                    </div>
                    <div>
                        <Span>writer: {issueItem.user.login}</Span>
                        <Span>date: {issueItem.created_at.slice(0, 10)}</Span>
                    </div>
                </div>
                <div className="col-3 text-center align-self-center">
                    <Span>comment : {issueItem.comments}</Span>
                </div>
            </div>
        </IssueBox>)}
        {/* ----------------------------[광고 영역]---------------------------- */}
        <a href={AD_LINK} rel="noopener noreferrer">
            <AdImg src={AD_PATH + ',' + process.env.PUBLIC_URL + 'no_image.jpg'} /> 
        </a>
    </>);
}

export default IssueItem;