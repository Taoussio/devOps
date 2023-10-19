const form = document.querySelector<HTMLFormElement>("form")!;
const ageInput = document.querySelector<HTMLInputElement>("#age")!;
const themesInput = document.querySelector<HTMLInputElement>("#themes")!;
const submitButton = document.querySelector<HTMLButtonElement>("button")!;
const footer = document.querySelector<HTMLElement>("footer")!;
const OPENAI_API_KEY = "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";

// transformer les valeurs des inputs a un prompt a passer a chatgpt
const generatePromptByAgeAndThemes = (age:number, themes="") => {
    let prompt = `Propose moi, avec un ton joyeux et amical, 5 idées de cadeau pour une personne agée de ${age} ans`;

    if(themes.trim()) {
        prompt += ` et qui aime ${themes}`;
    }

    return prompt + " !";
};

// Mettre le bouton et le footer en mode "loading"
const setLoadingItems = () => {
    footer.textContent = "Chargement de super idées en cours !";
    footer.setAttribute("aria-busy", "true");
    submitButton.setAttribute("aria-busy", "true");
    submitButton.disabled = true;
};

// Enlever le mode "loading" du bouton et du footer
const removeLoadingItems = () => {
    footer.setAttribute("aria-busy", "false");
    submitButton.setAttribute("aria-busy", "false");
    submitButton.disabled = false;
};

// Lancer le système lorseque le formulaire est soumis
form.addEventListener("submit", (e: SubmitEvent)=> {
    // Annuler le rechargement de la page
    e.preventDefault();

    // Mettre en mode "loading" le footer et le bouton
    setLoadingItems();
});

// Appeler l'API en lui passant la question
fetch(`https://api.openai.com/v1/complections` , {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
        prompt: generatePromptByAgeAndThemes(
            ageInput.valueAsNumber,
            themesInput.value
        ),
        max_tokens: 2000,
        model: "text-davinci-003", 
    }),
})
.then((reponse) => reponse.json())
.then(data => console.log(data));