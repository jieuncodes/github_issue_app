import { Helmet } from "react-helmet";
import { Octokit } from "octokit";
import { Loader } from "../utils/globalStyles";
import { useState } from "react";
import styled from "styled-components";
import IssueItem from "../components/IssueItem";
import { useRecoilState, useRecoilValue } from "recoil";
import { issueListSetState, issueNameState, IIssueList } from "../atoms";

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
const CONTENT_TYPE = "application/json";

const octokit = new Octokit({ 
    auth: GITHUB_TOKEN,
});

const Modal = styled.div`
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 50;
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
    z-index: 100;
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

function ListIssues() {
    const getIssueNames = useRecoilValue(issueNameState);
    const [issueListSet, setIssueListSet] = useRecoilState(issueListSetState);
    const defaultIssueName = getIssueNames[0];
    const [isLoading, setIsLoading] = useState(false);
    const [contentPage, setContentPage] = useState(1);
    
    const settingIssueList = ({ page, issueList }: IIssueList) => {
        const newIssueList = {
            page,
            issueList,
        };
        setIssueListSet((oldList) => {
            let newList = [];
            if(oldList.length > 0) {
                newList = [...oldList, newIssueList];
            } else {
                newList = [newIssueList];
            }
            return newList;
        });
        setContentPage((prev) => prev += 1);
    };

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
                },
            });

            const args = {
                page,
                issueList: response.data
            } as IIssueList;
            settingIssueList(args);

            const successMsg = `Success! Status: ${response.status}. 
                Rate limit remaining: ${response.headers["x-ratelimit-remaining"]}`;
            console.log(successMsg);
        } catch (error) {
            setIsLoading(false);
            console.log("error", error);
        }
    }; 
    
    const handleReset = () => {
        setIssueListSet([]);
        setContentPage(1);
    };

    return (<>
        <Helmet>
            <title>List Issues</title>
        </Helmet>
        {isLoading && <Modal>issue 10개 로딩 시작</Modal>}

        {/* ---------------------------[이슈 리스트]--------------------------- */}
        <div className="page-container">
            {issueListSet && 
            issueListSet.map((issueSet, i) => 
            <IssueItem key={i} issueList={issueSet.issueList} />)}

            
        </div>

        {/* ---------------------------[버튼 영역]---------------------------- */}
        <Footer>
            <div className="row">
                {/* load button */}
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
                {/* reset button */}
                <div className="col-6">
                    <ResetButton onClick={handleReset}>
                        RESET
                    </ResetButton>
                </div>
            </div>
        </Footer>
    </>);
}

export default ListIssues;