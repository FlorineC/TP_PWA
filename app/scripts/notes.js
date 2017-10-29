function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

let sessionId = getURLParameter("id");
let title = document.getElementById('sessionTitle');
let notes = document.getElementById('notes');
let exists = false;

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
    })
    .catch(function (error) {
        console.log('Une erreur est survenue : ', error);
    });

fetch('data.no.cache.json')
    .then(function (response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        // lecture du corps de la réponse en tant que JSON.
        return response.json();
    })
    .then(function (notesJson) {
        // traitement de l'objet
        let note = Object.values(notesJson.notes).find(e => e.id === parseInt(sessionId));
        if (note !== undefined) {
            exists = true;
            notes.value = note.Note;
        }

    })
    .catch(function (error) {
        console.log('Une erreur est survenue : ', error);
    });



function valider() {
    let title = document.getElementById('sessionTitle').innerHTML;
    let note = document.getElementById('notes').value;
    console.log(exists);

    fetch('http://localhost:3000/notes/' + (exists ? sessionId : ''), {
        method: exists ? 'PATCH' : 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: '{"Titre":"' + title + '", "Note":"' + note + '", "id":' + sessionId + '}'
    })
        .then(function (response) {
            if (response.ok) {
                exists = true;
            }
        })

};