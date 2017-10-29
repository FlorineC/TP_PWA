function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

var name = document.getElementById('speakerName');
var bio = document.getElementById('speakerBio');
var sessions = document.getElementById('sessions');
speakerInfos = document.getElementById('speakerInfos');
var speakerId = getURLParameter("id");

fetch('https://raw.githubusercontent.com/DevInstitut/conference-data/master/speakers.json')
    .then(function (response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        // lecture du corps de la réponse en tant que JSON.
        return response.json();
    })
    .then(function (speakersJson) {
        // traitement de l'objet

        let speaker = Object.values(speakersJson).find(e => e.id === parseInt(speakerId));
        name.innerHTML = speaker.name;
        bio.innerHTML = speaker.bio;
        sessionsPromise = findSessions(speaker.id);
        speakerInfos.style.background = "url('https://devfest.gdgnantes.com" + speaker.photoUrl + "') center / cover";
        sessionsPromise.then(function (sessionsDetails) {
            for (i in sessionsDetails) {
                sessions.innerHTML += "<div class=\"mdl-cell mdl-cell--12-col\">" +
                    "<i class=\"material-icons mdl-list__item-icon\">today</i> " +
                    "<a href=\"sessionDetails.html?id=" + sessionsDetails[i].id + "\">" +
                    sessionsDetails[i].title +
                    "</a></div>";
            }
        });
    });

function findSessions(speaker) {
    return fetch('https://raw.githubusercontent.com/DevInstitut/conference-data/master/sessions.json')
        .then(function (response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            // lecture du corps de la réponse en tant que JSON.
            return response.json();
        })
        .then(function (sessionsJson) {
            // traitement de l'objet
            let sessionsDetails = [];
            for (i in sessionsJson) {
                for (j in sessionsJson[i].speakers) {
                    if (speaker === sessionsJson[i].speakers[j]) {
                        let sessionDetail = { title: sessionsJson[i].title, id: sessionsJson[i].id };
                        sessionsDetails.push(sessionDetail);
                    }
                }
            }
            return sessionsDetails;
        });
};

