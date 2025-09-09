export default function ButtonsComp(props) {
    return (
        <div>
            <button className={`animated-button ${props.className}`}>{props.name}</button>
        </div>
    )
}