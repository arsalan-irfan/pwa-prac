//realtime listener
db.collection('recipes').onSnapshot(snapshot=>{
    //console.log(snapshot.docChanges());
    snapshot.docChanges().forEach(change => {
        console.log(change,change.doc.data(),change.doc.id);
    });
})