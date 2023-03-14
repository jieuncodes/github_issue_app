import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { getIssueDetail, IIssueDetails } from "../api";
import { selectedOrgState } from "../atoms";
import { Loader } from "../utils/globalStyles";

function DetailIssue() {
    const { id } = useParams();
    const selectedIssueOrg = useRecoilValue(selectedOrgState);

    const { data, isLoading } = useQuery<IIssueDetails>(
        ["issue", id],
        () => getIssueDetail(selectedIssueOrg.org, selectedIssueOrg.rep[0], Number(id))
    );
    
    useEffect(() => window.scrollTo(0, 0), []);

    return (<>
        <Helmet>
            <title>Issue</title>
        </Helmet>
        <div className="page-container">
            {isLoading? (
                <Loader>
                    <div>
                        <div></div><div></div>
                    </div>
                </Loader>
            ) : (
                <div>
                    {data?.title}
                </div>
            )}
        </div>
    </>);
}

export default DetailIssue;