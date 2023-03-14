import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { issueNameState, selectedOrgState } from "../atoms";

const Select = styled.select`
    width: 130px;
    font-size: 15px;
    padding: 3px 8px;
    border-radius: 5px;
    border: solid 2px ${props => props.theme.green.darker};
    background-color: #fff;
    option: {
        color: ${props => props.theme.green.darker};
    }
`;


function SelectIssueOrg() {
    const getIssueNames = useRecoilValue(issueNameState);
    const [selectedOrg, setSelectedOrg] = useRecoilState(selectedOrgState);
    const [issueRepList, setIssueRepList] = useState(getIssueNames[selectedOrg.org]);

    const handleOrgChange = (event:React.FormEvent<HTMLSelectElement>) => {
        const value = event.currentTarget.value as string;
        const newIssueRepList = getIssueNames[value];
        setIssueRepList(newIssueRepList);
        const newIssueOrg = {
            setId: `${value}_0`,
            org: value,
            rep: newIssueRepList[0],
        }
        setSelectedOrg(newIssueOrg);
    };
    const handleRepChange = (event:React.FormEvent<HTMLSelectElement>) => {
        const value = event.currentTarget.value;
        setSelectedOrg((prevOrg) => {
            const newOrg = {
                setId: `${prevOrg.org}_${value}`,
                org: prevOrg.org,
                rep: getIssueNames[prevOrg.org][+value],
            }
            return newOrg;
        });
    };
    return (<>
        <Select defaultValue={selectedOrg.org} onChange={handleOrgChange}>
            {Object.keys(getIssueNames).map((orgName) => 
                <option key={orgName} value={orgName} >
                    {orgName}
                </option>
            )}
        </Select>
        <Select defaultValue={selectedOrg.rep} onChange={handleRepChange}>
            {issueRepList.map((rep, i) => 
                <option key={rep} value={i} >
                    {rep}
                </option>
            )}
        </Select>
    </>);
}

export default SelectIssueOrg;