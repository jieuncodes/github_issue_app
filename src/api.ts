
const HOST_URL = process.env.REACT_REACT_APP_HOST_URL;
const ORG_NAME = 'Angular';
const REPO_NAME = 'Angular-cli';

export interface IissueItem {
    issueItem: Iissue[];
}
interface IUser {
    login: string;
}

export interface Iissue {
    number: number;
    title: string;
    user: IUser;
    comments: number;
}


export function getIssueListResults(page: number) {
    const PARAMS = 'state=open&sort=comments&per_page=10'
    return fetch(`${HOST_URL}/repos/${ORG_NAME}/${REPO_NAME}/issues?${PARAMS}&page={page}`).then(
        (response) => response.json()
    );
};