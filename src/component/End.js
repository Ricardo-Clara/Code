import '../style/End.css'

export default function End({ score, handleClick }) {
    return (
        <div className="end-screen">
            <p className="end-text">
                {score[0] === 10 ? 'Player 2 Wins' : 'Player 1 Wins'}<br />
                <br />
                {`${score[1]} - ${score[0]}`}
            </p>
            <button className='button-end' onClick={handleClick}>RESET</button>
        </div>
    );
}