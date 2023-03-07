import { atom } from "recoil";

interface IIssueName {
    org: string;
    rep: string;
}
interface IUser {
    login: string;
}
export interface Iissue {
    number: number;
    title: string;
    created_at: string;
    user: IUser;
    comments: number;
}
export interface IIssueList {
    page?: number;
    issueList: Iissue[];
}

export const issueNameState = atom<IIssueName[]>({
    key: "issueName",
    default: [
        {
            org: "Angular",
            rep: "Angular-cli",
        }
    ],
});

export const issueListSetState = atom<IIssueList[]>({
    key: "issueListSet",
    default: [],
});