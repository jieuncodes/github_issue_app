import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';

interface IIssueName {
    org: string;
    rep: string;
}
interface IUser {
    login: string;
}
export interface Iissue {
    id: number;
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

const { persistAtom } = recoilPersist({
    key: 'issueListSet',
    storage: localStorage,
});

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
    effects_UNSTABLE: [persistAtom],
});