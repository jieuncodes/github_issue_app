import { Helmet } from "react-helmet";
import { Octokit } from "octokit";
import { Loader, PageContainer } from "../utils/globalStyles";
import { useState } from "react";
import styled from "styled-components";
import IssueItem from "../components/IssueItem";
import { useRecoilValue } from "recoil";
import { issueNameState } from "../atoms";

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
const HOST_URL = process.env.REACT_REACT_APP_HOST_URL;
const CONTENT_TYPE = "application/json";

const octokit = new Octokit({ 
    auth: GITHUB_TOKEN,
});

const Modal = styled.div`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    width: 300px;
    height: 100px;
    background-color: #fff;
    color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Footer = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    background-color: ${props => props.theme.black.veryDark};
    .col-6 {
        padding: 15px 10px;
    }
    @media only screen and (min-width: 768px) {
        .col-6 {
            padding: 15px;
            text-align: center;
        }
    }
`;
const Button = styled.button`
    width: 100%;
    height: 40px;
    border-radius: 8px;
    border: 1px solid #000;
    font-size: 16px;
    @media only screen and (min-width: 768px) {
        width: 200px;
    }
`;
const GetButton = styled(Button)`
    border-color: ${props => props.theme.green};
    background-color: ${props => props.theme.green};
    color: ${props => props.theme.white.lighter};
`;
const ResetButton = styled(Button)`
    border-color: ${props => props.theme.white.lighter};
    background-color: ${props => props.theme.white.lighter};
    color: ${props => props.theme.green};
`;

interface IIssueParams {
    owner: string;
    repo: string;
    state: string;
    sort: string;
    per_page: number;
    page?: number;
}

function ListIssues() {
    const getIssueNames = useRecoilValue(issueNameState);
    const defaultIssueName = getIssueNames[0];
    const [isLoading, setIsLoading] = useState(false);
    const [issueList, setIssueList] = useState([1]);
    const [contentPage, setContentPage] = useState(1);
    
    const getIssueList = async (page : number) => {        
        try {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
            const response = await octokit.request("GET /repos/{owner}/{repo}/issues", {
                owner: defaultIssueName.org,
                repo: defaultIssueName.rep,
                state: "open",
                sort: "comments",
                per_page: 10,
                page,
                headers: {
                    "content-type": CONTENT_TYPE,
                    "x-github-api-version": "2022-11-28",
                },
            });
            const successMsg = `Success! Status: ${response.status}. 
                Rate limit remaining: ${response.headers["x-ratelimit-remaining"]}`;
            console.log(successMsg);
        } catch (error) {
            setIsLoading(false);
            console.log("error", error);
        }
    };    
    
    return (<>
        <Helmet>
            <title>List Issues</title>
        </Helmet>
        {isLoading && <Modal>issue 10개 로딩 시작</Modal>}

        <PageContainer>


            <Footer>
                <div className="row">
                    <div className="col-6">
                        <GetButton onClick={() => getIssueList(contentPage)}>
                            {isLoading ? (
                                <Loader>
                                    <div>
                                        <div></div><div></div>
                                    </div>
                                </Loader>
                            ) : (<>
                                LOAD
                            </>)}
                        </GetButton>
                    </div>
                    <div className="col-6">
                        <ResetButton>
                            RESET
                        </ResetButton>
                    </div>
                </div>
                
            </Footer>
        </PageContainer>
    </>);
}

export default ListIssues;