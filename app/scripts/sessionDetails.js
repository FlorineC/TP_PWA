function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

var title = document.getElementById('sessionTitle');
var text = document.getElementById('sessionText');
var speakers = document.getElementById('speakers');
var sessionId = getURLParameter("id");
notes.setAttribute('href', 'notes.html?id=' + sessionId);

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
        let session = Object.values(sessionsJson).find(e => e.id === parseInt(sessionId));
        title.innerHTML = session.title;
        text.innerHTML = session.description;
        speakersPromise = findSpeakersName(session.speakers);
        speakersPromise.then(function (speakersDetails) {
            for (i in speakersDetails) {
                speakers.innerHTML += "<div class=\"mdl-cell mdl-cell--12-col\">" +
                    "<i class=\"material-icons mdl-list__item-icon\">person</i> " +
                    "<a href=\"speakerDetails.html?id=" + speakersDetails[i].id + "\">" +
                    speakersDetails[i].name +
                    "</a></div>";
            }
        });
    })
    .catch(function (error) {
        console.log('Une erreur est survenue : ', error);
    });

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
            let speakersDetails = [];
            for (i in speakersJson) {
                for (j in speakers) {
                    if (speakers[j] === speakersJson[i].id) {
                        let speakerDetail = { name: speakersJson[i].name, id: speakersJson[i].id };
                        speakersDetails.push(speakerDetail);
                    }
                }
            }
            return speakersDetails;
        });
};

