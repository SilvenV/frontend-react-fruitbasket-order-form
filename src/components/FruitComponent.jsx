import './FruitComponent.css'

function FruitComponent({ title, fruit, fruitCountSetter, fruitName }) {
    return (
        <div className="fruitcomponent">
            <h3>{title}</h3>
            <button
                type="button"
                disabled={parseInt(fruit) === 0}
                onClick={() => fruitCountSetter(fruitName, parseInt(fruit) - 1)}
            >
                -
            </button>
            <p>{fruit}</p>
            <button
                type="button"
                onClick={() => fruitCountSetter(fruitName, parseInt(fruit) + 1)}
            >
                +
            </button>
        </div>
    );
}

export default FruitComponent;