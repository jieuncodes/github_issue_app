import { Helmet } from "react-helmet";
import { Octokit} from "octokit";
import { Loader } from "../utils/globalStyles";
import { useState } from "react";
import styled from "styled-components";
import IssueItem from "../components/IssueItem";
import axios from "axios";

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
const HOST_URL = process.env.REACT_REACT_APP_HOST_URL;
const ORG_NAME = 'Angular';
const REPO_NAME = 'Angular-cli';
const CONTENT_TYPE = "application/vnd.github+json";

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
const GetButton = styled.button`
    width: 100%;
    height: 40px;
    border-radius: 8px;
    border: 1px solid ${props => props.theme.green};
    background-color: ${props => props.theme.green};
    color: ${props => props.theme.white.lighter};
    font-size: 20px;
    @media only screen and (min-width: 768px) {
        width: 200px;
    }
`;

function ListIssues() {
    const [isLoading, setIsLoading] = useState(null || false);
    const [issueList, setIssueList] = useState(null || [] as number[]);
    const [contentPage, setContentPage] = useState(0);
    

    const getIssueList = () => {
        setContentPage((prev) => prev += 1);
        setIssueList((prev) => prev.push(contentPage) as unknown as number[]);
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000)
    }
    
    
    return (<>
        <Helmet>
            <title>List Issues</title>
        </Helmet>
        {isLoading? (
            <Modal>issue 10개 로딩 시작</Modal>
        ) : (
            issueList?.map((issue) => <IssueItem key={issue} page={issue} />)
        )}
       
        <GetButton onClick={getIssueList}>
            {isLoading ? (
                <Loader>
                    <div>
                        <div></div><div></div>
                    </div>
                </Loader>
            ) : (<>
                load
            </>)}
        </GetButton>
    </>);
}

export default ListIssues;