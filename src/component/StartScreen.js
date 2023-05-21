import '../style/StartScreen.css';

export default function StartScreen({handleClick}) {
    return (
        <div className='start-screen'>
            <p className='start-text'>
                TWO PLAYER PONG<br />
                <br />
                Player 1 - W and S<br />
                Player 2 - Arrows
            </p>
            <button onClick={handleClick} className='button-start'>START</button>
        </div>
    );
}