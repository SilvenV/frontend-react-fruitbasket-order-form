import './App.css'
import {useState} from "react";
import FruitComponent from "./components/FruitComponent.jsx";

function App() {

    const [fruitFormState, setFruitFormState] = useState({
        strawberryCount: '0',
        bananaCount: '0',
        appleCount: '0',
        kiwiCount: '0'
    })

    const [contactFormState, setContactFormState] = useState({
        firstNameValue: '',
        lastNameValue: '',
        ageValue: '0',
        zipCodeValue: '',
        frequencyValue: 'iedere_week',
        timeOfDayValue: '',
        commentValue: '',
        agreeCheckboxValue: false
    })

    function resetFruitCounters() {
        setFruitFormState({
            ...fruitFormState,
            strawberryCount: 0,
            bananaCount: 0,
            appleCount: 0,
            kiwiCount: 0
        })
    }

    function handleSubmit(e) {
        console.log(`
        Naam: ${contactFormState.firstNameValue} ${contactFormState.lastNameValue}.
        Leeftijd: ${contactFormState.ageValue}.
        Adres: ${contactFormState.zipCodeValue}.
        Bezorgfrequentie: ${contactFormState.frequencyValue}, ${contactFormState.timeOfDayValue}.
        Opmerkingen: "${contactFormState.commentValue}".
        Akkoord met de voorwaarden: ${contactFormState.agreeCheckboxValue}.
        
        Bestelling: 
        -Aardbeien: ${fruitFormState.strawberryCount},
        -Bananen: ${fruitFormState.bananaCount},
        -Appels: ${fruitFormState.appleCount},
        -Kiwi's: ${fruitFormState.kiwiCount}`);
        e.preventDefault();
    }

    function handleChange(e) {
        const {name, value, type, checked} = e.target;

        if (name === 'ageValue' && parseInt(value) < 0) return;

        setContactFormState({
            ...contactFormState,
            [name]: type === 'checkbox' ? checked : value
        });
        console.log(contactFormState)
    }

    const updateFruitCount = (fruitName, newCount) => {
        const finalCount = newCount < 0 ? 0 : newCount;
        setFruitFormState(prevState => ({
            ...prevState,
            [fruitName]: finalCount.toString()
        }));
        // console.log(`Aardbeien: ${fruitFormState.strawberryCount},\nBananen: ${fruitFormState.bananaCount},\nAppels: ${fruitFormState.appleCount},\nKiwi's: ${fruitFormState.kiwiCount}`);
    };

    return (
        <>
            <section>
                <FruitComponent
                    title="🍓 Aardbeien"
                    fruit={fruitFormState.strawberryCount}
                    fruitCountSetter={updateFruitCount}
                    fruitName="strawberryCount"
                />
                <FruitComponent
                    title="🍌 Bananen"
                    fruit={fruitFormState.bananaCount}
                    fruitCountSetter={updateFruitCount}
                    fruitName="bananaCount"
                />

                <FruitComponent
                    title="🍏 Appels"
                    fruit={fruitFormState.appleCount}
                    fruitCountSetter={updateFruitCount}
                    fruitName="appleCount"
                />

                <FruitComponent
                    title="🥝 Kiwi's"
                    fruit={fruitFormState.kiwiCount}
                    fruitCountSetter={updateFruitCount}
                    fruitName="kiwiCount"
                />

                <button onClick={resetFruitCounters} type="button" className="reset-button">Reset</button>
            </section>


            <h1>Formulier:</h1>
            <form onSubmit={handleSubmit} className="delivery-form">
                <div className="form-group">
                    <label htmlFor="firstName">Voornaam:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstNameValue"
                        value={contactFormState.firstNameValue}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Achternaam:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastNameValue"
                        value={contactFormState.lastNameValue}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="ageValue">Leeftijd:</label>
                    <input
                        type="number"
                        id="ageValue"
                        name="ageValue"
                        min="0"
                        value={contactFormState.ageValue}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="zipCodeValue">Postcode:</label>
                    <input
                        type="text"
                        id="zipCodeValue"
                        name="zipCodeValue"
                        value={contactFormState.zipCodeValue}
                        onChange={handleChange}
                        required
                        title="Vul een geldige Nederlandse postcode in (bijv. 1234AB)"
                    />
                </div>

                <div className="form-group">
                    <label>Bezorgfrequentie:</label>
                    <select
                        name="frequencyValue"
                        value={contactFormState.frequencyValue}
                        onChange={handleChange}
                        required
                    >
                        <option value="iedere_week">Iedere week</option>
                        <option value="om_de_week">Om de week</option>
                        <option value="iedere_maand">Iedere maand</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Bezorgtijd:</label>
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="timeOfDayValue"
                                value="overdag"
                                checked={contactFormState.timeOfDayValue === 'overdag'}
                                onChange={handleChange}
                                required
                            />
                            Overdag
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="timeOfDayValue"
                                value="avond"
                                checked={contactFormState.timeOfDayValue === 'avond'}
                                onChange={handleChange}
                            />
                            's Avonds
                        </label>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="commentValue">Opmerkingen:</label>
                    <textarea
                        id="commentValue"
                        name="commentValue"
                        value={contactFormState.commentValue}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group checkbox-group">
                    <label>
                        <input
                            type="checkbox"
                            name="agreeCheckboxValue"
                            checked={contactFormState.agreeCheckboxValue}
                            onChange={handleChange}
                            required
                        />
                        Ik ga akkoord met de voorwaarden
                    </label>
                </div>

                <button type="submit" className="submit-button">
                    Verzend
                </button>
            </form>
        </>
    )
}

export default App
