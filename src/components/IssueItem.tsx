import { useQuery } from "react-query";
import { getIssueListResults, IissueItem } from "../api";

interface Ipage {
    page: number;
}

function IssueItem({ page }: Ipage) {
    const {data, isLoading} = useQuery<IissueItem>(
        ['angular', page], 
        () => getIssueListResults(page)
    );

    return (<>
        {isLoading ? <div>Loading...</div> : (
           <div>
                
           </div>
        )}
    </>);
}

export default IssueItem;