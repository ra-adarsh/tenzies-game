import './Die.css'

function Die(props) {
    const styles = {
        "borderRadius" : "4px",
        "boxShadow" : "0px 1px 4px #000000",
        "backgroundColor" : props.dieObject.isClicked ? "#59E391" : "#FFFFFF",
        "cursor" : "pointer"
    }
    return (
        <div 
            style={styles} 
            className="dice" 
            onClick={() => props.dieObject.handleClickDie(props.dieObject)}
            onTouchEnd={() => props.dieObject.handleClickDie(props.dieObject)}
            >
            <h1 className="number">{props.dieObject.dieValue}</h1>
        </div>
    )
}
export default Die;