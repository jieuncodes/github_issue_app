import { atom, selector } from "recoil";
import { recoilPersist } from 'recoil-persist';

interface ISelectedOrg {
    setId: string;
    org: string;
    rep: string;
};
interface IIssueName {
    id: number;
    org: string;
    rep: string[];
};
interface IUser {
    login: string;
};
export interface Iissue {
    number: number;
    title: string;
    created_at: string;
    user: IUser;
    comments: number;
};
export interface IIssueList {
    page?: number;
    issueList: Iissue[];
};
export interface IOrgIssueList {
    [key: string]: IIssueList[];
};

const { persistAtom } = recoilPersist({
    key: 'issueListSet',
    storage: localStorage,
});

export const issueNameState = atom<IIssueName[]>({
    key: "issueName",
    default: [
        {
            id: 0,
            org: "reactjs",
            rep: ["reactjs.org"],
        },{
            id: 1,
            org: "Angular",
            rep: ["angular", "components", "angular-cli"],
        },{
            id: 2,
            org: "microsoft",
            rep: ["TypeScript", "vscode"],
        },{
            id: 3,
            org: "Redux",
            rep: ["redux", "react-redux"],
        },
    ],
});

export const selectedOrgState = atom<ISelectedOrg>({
    key: "selectedOrg",
    default: {
        setId: "1_1",
        org: "Angular",
        rep: "components",
    },
    effects_UNSTABLE: [persistAtom],
})

export const orgIssueListSetState = atom<IOrgIssueList>({
    key: "issueListSet",
    default: {},
    effects_UNSTABLE: [persistAtom],
});

export const orgIssueSelector = selector({
    key: "orgIssueSelector",
    get: ({ get }) => {
        const selectedOrg = get(selectedOrgState);
        const orgIssueListSet = get(orgIssueListSetState);
        return orgIssueListSet[selectedOrg.setId];
    },
});