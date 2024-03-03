// eslint-disable-next-line react/prop-types
function Results({ data }) {
    return (
        <>
            {data.map((item) => (
                <tr key={item.id}>
                    <td data-label="Contestant">{item.contestant}</td>
                    <td data-label="Time Finish">{item.time_finish}</td>
                    <td data-label="Judge 1">{item.scores.j1}</td>
                    <td data-label="Judge 2">{item.scores.j2}</td>
                    <td data-label="Judge 3">{item.scores.j3}</td>
                    <td data-label="Judge 4">{item.scores.j4}</td>
                    <td data-label="Judge 5">{item.scores.j5}</td>
                    <td data-label="Total Score">
                        {item.total_score ? item.total_score : 0}
                    </td>
                    <td data-label="Violations"></td>
                    <td data-label="Rank">{item.rank ? item.rank : 0}</td>
                </tr>
            ))}
        </>
    );
}

export default Results;
