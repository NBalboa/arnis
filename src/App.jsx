import Results from "./components/Results";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import checkDuplicateName from "./utils/checkDuplicateName";
import Badge from "react-bootstrap/Badge";
import setMaxNumber from "./utils/setMaxNumber";
import setMaxFloat from "./utils/setMaxFloat";
import calculateTotalScore from "./utils/calculateTotalScore";
import removeHighestAndLowest from "./utils/removeHighestAndLowest";

function App() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [participants, setParticipants] = useState([
        {
            id: 1,
            contestant: "Pagadian",
            time_finish: "01:01",

            scores: {
                j1: 7,
                j2: 10,
                j3: 1,
                j4: 6,
                j5: 1,
            },
        },
        {
            id: 2,
            contestant: "Test",
            time_finish: "01:01",
            scores: {
                j1: 2,
                j2: 6,
                j3: 7,
                j4: 6,
                j5: 4,
            },
        },
    ]);
    const [contestant, setContestant] = useState("");
    const [minute, setMinute] = useState("");
    const [second, setSecond] = useState("");
    const [j1, setJ1] = useState("");
    const [j2, setJ2] = useState("");
    const [j3, setJ3] = useState("");
    const [j4, setJ4] = useState("");
    const [j5, setJ5] = useState("");
    const [errors, setErrors] = useState({});

    function handleJudgeScore(e, judge) {
        const value = e.target.value;
        judge(value);
    }

    function handleAddParticipants() {
        const mins_check = setMaxNumber(parseInt(minute), 59);
        const secs_check = setMaxNumber(parseInt(second), 59);
        const j1_check = setMaxFloat(parseFloat(j1), 10);
        const j2_check = setMaxFloat(parseFloat(j2), 10);
        const j3_check = setMaxFloat(parseFloat(j3), 10);
        const j4_check = setMaxFloat(parseFloat(j4), 10);
        const j5_check = setMaxFloat(parseFloat(j5), 10);
        if (
            checkDuplicateName(contestant, participants) === false &&
            participants.length > 0 &&
            contestant.length > 0 &&
            mins_check === parseInt(minute) &&
            secs_check === parseInt(second) &&
            j1_check === parseFloat(j1) &&
            j2_check === parseFloat(j2) &&
            j3_check === parseFloat(j3) &&
            j4_check === parseFloat(j4) &&
            j5_check === parseFloat(j5)
            // JSON.stringify(errors) === "{}"
        ) {
            setParticipants((prev) => {
                const id = prev.length + 1;

                const data = {
                    id: id,
                    contestant: contestant,
                    time_finish: `${minute}:${second}`,
                    scores: {
                        j1: j1,
                        j2: j2,
                        j3: j3,
                        j4: j4,
                        j5: j5,
                    },
                };

                return [...prev, data];
            });
            setContestant("");
            setErrors({});
        } else if (
            participants.length === 0 &&
            contestant.length > 0 &&
            mins_check === parseInt(minute) &&
            secs_check === parseInt(second) &&
            j1_check === parseFloat(j1) &&
            j2_check === parseFloat(j2) &&
            j3_check === parseFloat(j3) &&
            j4_check === parseFloat(j4) &&
            j5_check === parseFloat(j5)
            // JSON.stringify(errors) === "{}"
        ) {
            setParticipants((prev) => {
                const id = prev.length + 1;
                const data = {
                    id: id,
                    contestant: contestant,
                    time_finish: `${minute}:${second}`,
                    scores: {
                        j1: j1,
                        j2: j2,
                        j3: j3,
                        j4: j4,
                        j5: j5,
                    },
                };

                return [...prev, data];
            });
        } else if (checkDuplicateName(contestant, participants)) {
            setErrors({ dup_name: "Contestant Name Already Exist" });
        } else if (contestant.length <= 0) {
            setErrors({ empty_name: "Contestant Musn't be Empty" });
        } else if (
            secs_check !== parseInt(second) ||
            mins_check !== parseInt(minute)
        ) {
            if (typeof secs_check === "string") {
                setErrors({ number: secs_check });
            } else if (typeof mins_check === "string") {
                setErrors({ number: mins_check });
            }
        } else if (
            j1_check !== parseInt(j1) ||
            j2_check !== parseInt(j2) ||
            j3_check !== parseInt(j3) ||
            j4_check !== parseInt(j4) ||
            j5_check !== parseInt(j5)
        ) {
            if (typeof j1_check === "string") {
                setErrors({ float: j1_check });
            } else if (typeof j2_check === "string") {
                setErrors({ float: j2_check });
            } else if (typeof j4_check === "string") {
                setErrors({ float: j4_check });
            } else if (typeof j3_check === "string") {
                setErrors({ float: j3_check });
            } else {
                setErrors({ float: j5_check });
            }
        } else {
            alert("Something went wrong");
        }
    }

    useEffect(() => {
        participants.map((item) => {
            const total_score = calculateTotalScore(item.scores);
            item["total_score"] = total_score;
        });

        const sorted = participants.sort(
            (a, b) => b.total_score - a.total_score
        );
        let rank = 0;

        sorted.map((item, index) => {
            rank++;

            if (index !== 0) {
                const current = item;
                const prev = participants[index - 1];

                if (current.total_score > prev.total_score) {
                    item["rank"] = rank;
                } else if (current.total_score === prev.total_score) {
                    const current_scores = removeHighestAndLowest(
                        current.scores
                    );
                    const prev_scores = removeHighestAndLowest(prev.scores);

                    const current_total_score =
                        calculateTotalScore(current_scores);
                    const prev_total_score = calculateTotalScore(prev_scores);

                    if (current_total_score > prev_total_score) {
                        item["rank"] = prev.rank;
                        prev.rank = rank;
                    } else if (prev_total_score > current_total_score) {
                        item["rank"] = rank;
                    } else {
                        item["rank"] = prev.rank;
                        rank--;
                    }
                } else {
                    item["rank"] = rank;
                }
            } else {
                item["rank"] = rank;
            }
        });

        participants.sort((a, b) => a.rank - b.rank);
    }, [participants]);

    return (
        <>
            <h1>Arnis Score Result</h1>
            <Table responsive>
                <thead>
                    <tr>
                        <th scope="col">Contestant</th>
                        <th scope="col">Time Finish</th>
                        <th scope="col">Judge 1</th>
                        <th scope="col">Judge 2</th>
                        <th scope="col">Judge 3</th>
                        <th scope="col">Judge 4</th>
                        <th scope="col">Judge 5</th>
                        <th scope="col">Total Scores</th>
                        <th scope="col">Violations</th>
                        <th scope="col">Rank</th>
                    </tr>
                </thead>
                <tbody>
                    <Results data={participants} />
                </tbody>
            </Table>

            <Button variant="primary" onClick={handleShow}>
                Add Contestant
            </Button>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Contestant Name</Form.Label> {""}
                            {errors?.dup_name ? (
                                <Badge bg="danger">{errors?.dup_name}</Badge>
                            ) : errors?.empty_name ? (
                                <Badge bg="danger">{errors?.empty_name}</Badge>
                            ) : (
                                ""
                            )}
                            <Form.Control
                                type="text"
                                name="contestant"
                                value={contestant}
                                onChange={(e) => setContestant(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Time Finished</Form.Label>{" "}
                            {errors?.number ? (
                                <Badge bg="danger">{errors?.number}</Badge>
                            ) : (
                                ""
                            )}
                            <Row>
                                <Col>
                                    <Form.Control
                                        type="number"
                                        placeholder="Minute/s"
                                        min="0"
                                        max="60"
                                        value={minute}
                                        onChange={(e) =>
                                            setMinute(e.target.value)
                                        }
                                    />
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="number"
                                        placeholder="Second/s"
                                        value={second}
                                        onChange={(e) =>
                                            setSecond(e.target.value)
                                        }
                                        min="0"
                                        max="60"
                                    />
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Score</Form.Label>
                            {errors?.float ? (
                                <Badge bg="danger">{errors?.float}</Badge>
                            ) : (
                                ""
                            )}
                            <Row>
                                <Col>
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Judge 1"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            type="number"
                                            steps={0.01}
                                            min="0"
                                            max="10"
                                            value={j1}
                                            onChange={(e) =>
                                                handleJudgeScore(e, setJ1)
                                            }
                                            placeholder="Jugde 1"
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col>
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Judge 2"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            type="number"
                                            steps={0.01}
                                            min="0"
                                            max="10"
                                            placeholder="Jugde 2"
                                            value={j2}
                                            onChange={(e) =>
                                                handleJudgeScore(e, setJ2)
                                            }
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col>
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Judge 3"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            type="number"
                                            steps={0.01}
                                            min="0"
                                            max="10"
                                            placeholder="Jugde 3"
                                            value={j3}
                                            onChange={(e) =>
                                                handleJudgeScore(e, setJ3)
                                            }
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col>
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Judge 4"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            type="numbr"
                                            steps={0.01}
                                            min="0"
                                            max="10"
                                            placeholder="Jugde 4"
                                            value={j4}
                                            onChange={(e) =>
                                                handleJudgeScore(e, setJ4)
                                            }
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col>
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Judge 5"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            type="number"
                                            steps={0.01}
                                            min="0"
                                            max="10"
                                            placeholder="Jugde 5"
                                            value={j5}
                                            onChange={(e) =>
                                                handleJudgeScore(e, setJ5)
                                            }
                                        />
                                    </FloatingLabel>
                                </Col>
                            </Row>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddParticipants}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default App;
