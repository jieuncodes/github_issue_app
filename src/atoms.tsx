import { atom } from "recoil";

interface IIssueName {
    org: string;
    rep: string;
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