const RESPONSE_CONTENT_TYPE = "application/json";
const HOST_URL = process.env.REACT_APP_HOST_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

interface IReactions {
    [key: string]: number;
};
interface IUser {
    login: string;
    avatar_url: string;
    html_url: string;
};
export interface IIssueDetails {
    number: number;
    title: string;
    user: IUser;
    created_at: string;
    body: string;
    reactions: IReactions[];
};

export function getIssueDetail(owner: string, repo: string, issue_number: number) {
    return fetch(`${HOST_URL}/repos/${owner}/${repo}/issues/${issue_number}`, {
        headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
            "content-type": RESPONSE_CONTENT_TYPE,
        },
    }).then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
    });
};