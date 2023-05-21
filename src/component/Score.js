import '../style/Score.css'

export default function Score({ score }) {
    return (
        <>
            <div className="score">
                <span className="score-left">{`${score[0]}`}</span>
                <span className="score-right">{`${score[1]}`}</span>
            </div>
        </>
    );
}