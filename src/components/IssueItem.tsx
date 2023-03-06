import { useQuery } from "react-query";
import { getIssueListResults, Iissue } from "../api";

interface Ipage {
    page: number;
}

function IssueItem({ page }: Ipage) {
    const {data, isLoading} = useQuery<Iissue[]>(
        [`angular${page}`, page], 
        () => getIssueListResults(page)
    );

    return (<>
        {!isLoading && (
           <div>
                {data?.map((content) => <div>
                    {content.number}
                    {content.title}
                    {content.user.login}
                    {content.comments}
                </div>)}
           </div>
        )}
    </>);
}

export default IssueItem;