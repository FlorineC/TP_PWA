fetch('https://raw.githubusercontent.com/DevInstitut/conference-data/master/speakers.json')
    .then(function (response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        // lecture du corps de la réponse en tant que JSON.
        return response.json();
    })
    .then(function (speakersJson) {
        var presentateurs = document.getElementById('listePresentateurs');
        // traitement de l'objet
        for (i in speakersJson) {
            presentateurs.innerHTML += createSpeakerCard(speakersJson[i].name, speakersJson[i].id);
        }
    });

function createSpeakerCard(name, id) {
    return "<section class=\"section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp\">" +
        "<div class=\"mdl-card mdl-cell mdl-cell--12-col\">" +
        "<div class=\"mdl-card__supporting-text\">" +
        "<h5><span class=\"mdl-list__item-primary-content\">" +
        "<i class=\"material-icons mdl-list__item-icon\">person</i> " +
        name +
        "</span></h5>" +
        "</div>" +
        "<div class=\"mdl-card__actions\">" +
        "<a href=\"speakerDetails.html?id=" + id + "\" class=\"mdl-button\">Détails</a>" +
        "</div>" +
        "</div>" +
        "</section>"
}