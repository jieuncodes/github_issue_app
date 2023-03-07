import { Helmet } from "react-helmet";
import { useMatch } from "react-router-dom";

function DetailIssue() {
    const bigContentMatch = useMatch(`/issue/:id`);
    const selectedId = bigContentMatch?.params.id;
    return (<>
        <Helmet>
            <title>Issue</title>
        </Helmet>
    </>);
}

export default DetailIssue;