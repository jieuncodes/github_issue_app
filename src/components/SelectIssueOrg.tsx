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
    const [issueOrg, setIssueOrg] = useRecoilState(selectedOrgState);
    const orgId = Number(issueOrg.setId.split('_')[0]);
    const [issueRepList, setIssueRepList] = useState(getIssueNames[orgId].rep);

    const handleOrgChange = (event : any) => {
        const value = event.target.value;
        const newIssueRepList = getIssueNames[value].rep;
        setIssueRepList(newIssueRepList);
        const newIssueOrg = {
            setId: `${value}_0`,
            org: getIssueNames[value].org,
            rep: newIssueRepList[0],
        }
        setIssueOrg(newIssueOrg);
    };
    const handleRepChange = (event : any) => {
        const value = event.target.value;
        setIssueOrg((prevOrg) => {
            const newOrg = {
                setId: `${orgId}_${value}`,
                org: prevOrg.org,
                rep: getIssueNames[orgId].rep[value],
            }
            return newOrg;
        });
    };
    return (<>
        <Select onChange={handleOrgChange}>
            {getIssueNames.map((issue, i) => 
                <option key={issue.org}
                    value={i} 
                    defaultValue={issueOrg.org}
                    selected={issue.org === issueOrg.org}>
                    {issue.org}
                </option>
            )}
        </Select>
        <Select onChange={handleRepChange}>
            {issueRepList.map((rep, i) => 
                <option key={rep}
                    value={i} 
                    defaultValue={issueOrg.rep}
                    selected={rep === issueOrg.rep}>
                    {rep}
                </option>
            )}
        </Select>
    </>);
}

export default SelectIssueOrg;