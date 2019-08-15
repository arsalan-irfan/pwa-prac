//offline data
db.enablePersistence()
    .catch(err => {
        if (error.code == 'failed-precondition') {
            //probably multiple tabs open at once
            console.log("Persistence Failed")
        }
        else if (err.code == 'unimplemented') {
            console.log('Persistence is not available')
        }
    })


//realtime listener
db.collection('recipes').onSnapshot(snapshot => {
    //console.log(snapshot.docChanges());
    snapshot.docChanges().forEach(change => {
        //console.log(change,change.doc.data(),change.doc.id);
        if (change.type === 'added') {
            renderRecipe(change.doc.data(), change.doc.id);
        }
        if (change.type === 'removed') {

        }
    });
})