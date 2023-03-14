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
    const selectedOrg = useRecoilValue(selectedOrgState);

    const { data, isLoading } = useQuery<IIssueDetails>(
        ["issue", id],
        () => getIssueDetail(selectedOrg.org, selectedOrg.rep, Number(id))
    );
    
    
    // Octokit과 useEffect를 이용하여 데이터 불러오기
    // useEffect 안에서 fetch 함수를 한번 불러옴.
    
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await octokit.rest.issues.get({
    //             owner: "Angular",
    //             repo: "Angular-cli",
    //             issue_number: Number(id),
    //         });
    //         setIssueData(response.data as IIssueData);
    //     };
    //     fetchData();
    // }, [id]);
   
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