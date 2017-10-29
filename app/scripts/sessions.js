fetch('https://raw.githubusercontent.com/DevInstitut/conference-data/master/sessions.json')
    .then(function (response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        // lecture du corps de la réponse en tant que JSON.
        return response.json();
    })
    .then(function (sessionsJson) {
        // traitement de l'objet
        var keynote = document.getElementById('keynote');
        var talk = document.getElementById('talk');
        var quicky = document.getElementById('quicky');

        for (i in sessionsJson) {
            if ('keynote' === sessionsJson[i].type) {
                speakersPromise = findSpeakersName(sessionsJson[i].speakers);
                let title = sessionsJson[i].title;
                let id = sessionsJson[i].id;
                speakersPromise.then(function (speakers) {
                    keynote.innerHTML += createSessionCard(id, title, speakers);
                })
            } else if ('talk' === sessionsJson[i].type) {
                speakersPromise = findSpeakersName(sessionsJson[i].speakers);
                let title = sessionsJson[i].title;
                let id = sessionsJson[i].id;
                speakersPromise.then(function (speakers) {
                    talk.innerHTML += createSessionCard(id, title, speakers);
                })
            }
            else if ('quicky' === sessionsJson[i].type) {
                speakersPromise = findSpeakersName(sessionsJson[i].speakers);
                let title = sessionsJson[i].title;
                let id = sessionsJson[i].id;
                speakersPromise.then(function (speakers) {
                    quicky.innerHTML += createSessionCard(id, title, speakers);
                })
            }
        };
    })
    .catch(function (error) {
        console.log('Une erreur est survenue : ', error);
    });


function createSessionCard(id, title, speakers) {
     return "<section class=\"section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp\">" +
        "<div class=\"mdl-card mdl-cell mdl-cell--12-col\">" +
        "<div class=\"mdl-card__supporting-text\">" +
        "<h5><span class=\"mdl-list__item-primary-content\">" +
        "<i class=\"material-icons mdl-list__item-icon\">today</i> " +
        title + " - " + speakers +
        "</span></h5>" +
        "</div>" +
        "<div class=\"mdl-card__actions\">" +
        "<a href=\"sessionDetails.html?id=" + id + "\" class=\"mdl-button\">Détails</a>" +
        "</div>" +
        "</div>" +
        "</section>";
}

function findSpeakersName(speakers) {
    return fetch('https://raw.githubusercontent.com/DevInstitut/conference-data/master/speakers.json')
        .then(function (response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            // lecture du corps de la réponse en tant que JSON.
            return response.json();
        })
        .then(function (speakersJson) {
            // traitement de l'objet
            let speakersName = [];
            for (i in speakersJson) {
                for (j in speakers) {
                    if (speakers[j] === speakersJson[i].id) {
                        speakersName.push(speakersJson[i].name);
                    }
                }
            }
            return speakersName;
        });
};

