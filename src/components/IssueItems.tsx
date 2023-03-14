import { Link } from "react-router-dom";
import styled from "styled-components";
import { IIssueList } from "../atoms";

const AD_PATH = `${process.env.PUBLIC_URL}/lazy_sleep.png`;
const AD_ERROR_PATH = `${process.env.PUBLIC_URL}/no_image.jpg`;
const AD_LINK = 'https://github.com/eee0930/github_issue_app';

const AdImg = styled.img`
    height: 65px;
    width: auto;
    border-radius: 7px;
    @media only screen and (min-width: 768px) {
        width: 300px;
    }
`;
const IssueBox = styled.div`
    width: 100%;
    min-height: 70px;
    border-radius: 10px;
    margin-bottom: 15px;
    border: 1px solid ${props => props.theme.black.lighter};
    background-color: ${props => props.theme.black.lighter};
    color: ${props => props.theme.white.darker};
    padding: 10px;
    font-size: 15px;
    @media only screen and (min-width: 768px) {
        padding: 12px 15px;
    }
    @media only screen and (min-width: 1200px) {
        padding: 15px 20px;
        font-size: 14px;
    }
`;
const AdBox = styled(IssueBox)`
    background-color: transparent;
    text-align: center;
    border: none;
    padding: 5px;
`;
const Span = styled.span`
    padding: 0 5px;
`;
const TitleSection = styled.div`
    margin-bottom: 8px;
    @media only screen and (min-width: 768px) {
        margin-bottom: 10px;
    }
    @media only screen and (min-width: 1200px) {
        margin-bottom: 12px;
    }
`;
const Number = styled(Span)`
    color: ${props => props.theme.red};
`;
const IssueTitle = styled(Span)`
    color: ${props => props.theme.green.lighter};
    font-size: 17px;
    padding-bottom: 5px;
    @media only screen and (min-width: 1200px) {
        font-size: 16px;
    }
`;
const ContentTitle = styled.div`
    display: none;
    vertical-align: middle;
    padding-right: 5px;
    @media only screen and (min-width: 768px) {
        display: inline-block;
    }
`;
const Comments = styled.div`
    padding: 0 5px;
    .count {
        border-radius: 50%;
        background-color: ${props => props.theme.red};
        width: 35px;
        height: 35px;
        padding: 8px 0;
        display: inline-block;
        vertical-align: middle;
    }
    @media only screen and (min-width: 768px) {
        .count {
            border-radius: 0;
            background-color: transparent;
            width: auto;
            height: auto;
            padding: 0;
            vertical-align: none;
        }
    }
`;

function IssueItems({ issueList }: IIssueList) {
    
    // ad image error가 날 경우 해당 이미지를 대신 보여줌
    const handleImgError = (e: any) => {
        e.target.src = AD_ERROR_PATH;
    };

    return (<>
        {issueList &&
        issueList.map((issueItem) => 
        <IssueBox key={issueItem.number}>
            <Link to={'issue/' + issueItem.number}>
                <div className="row">
                    <div className="col-10 col-md-9">
                        <TitleSection>
                            <Number>#{issueItem.number}</Number> 
                            <IssueTitle>{issueItem.title}</IssueTitle>
                        </TitleSection>
                        <div>
                            <Span>
                                <ContentTitle>writer : </ContentTitle>
                                {issueItem.user.login}
                            </Span>
                            <Span>
                                <ContentTitle>date : </ContentTitle>
                                {issueItem.created_at.slice(0, 10)}
                            </Span>
                        </div>
                    </div>
                    <div className="col-2 col-md-3 text-center align-self-center">
                        <Comments>
                            <ContentTitle className="title">comment : </ContentTitle>
                            <div className="count">{issueItem.comments}</div>
                        </Comments>
                    </div>
                </div>
            </Link>
        </IssueBox>)}
        {/* ----------------------------[광고 영역]---------------------------- */}
        <AdBox>
            <a href={AD_LINK} rel="noopener noreferrer">
                <AdImg src={AD_PATH} 
                    onError={handleImgError}/> 
            </a>
        </AdBox>
    </>);
}

export default IssueItems;