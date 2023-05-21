import '../style/Board.css'
import Score from './Score';

export default function Board({ translation, translationBall, leftStickRef, rightStickRef, ballRef, borderBottomRef, borderTopRef, score, boardRef }) {
    return (
        <div ref={boardRef} tabIndex={-1} className='main-board'>
            <Score score={score} />
            <div ref={borderTopRef} className='border-top'></div>
            <div className='middle-line'></div>
            <div ref={leftStickRef} className='left-stick' style={{top: `${translation[1]}%`}}></div>
            <div ref={ballRef} className='ball' style={{top: `${translationBall[1]}%`, left: `${translationBall[0]}%`}}></div>
            <div ref={rightStickRef} className='right-stick' style={{top: `${translation[0]}%`}}></div>
            <div ref={borderBottomRef} className='border-bottom'></div>
        </div>
    );
}