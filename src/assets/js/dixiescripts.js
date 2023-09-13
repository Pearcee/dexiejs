var db = new Dexie("FriendDatabase");

// DB with single table "friends" with primary key "id" and
// indexes on properties "name" and "age"
db.version(1).stores({
    friends: `
        id,
        name,
        age`,
});

// Now add some values.
db.friends.bulkPut([
    { id: 1, name: "Josephine", age: 21 },
    { id: 2, name: "Per", age: 75 },
    { id: 3, name: "Simon", age: 5 },
    { id: 4, name: "Sara", age: 50, notIndexedProperty: 'foo' }
]).then(() => {

    return db.friends.where("age").between(0, 25).toArray();

}).then(friends => {

    console.log("Found young friends: " +
        friends.map(friend => friend.name));

    return db.friends
        .orderBy("age")
        .reverse()
        .toArray();

}).then(friends => {

    console.log("Friends in reverse age order: " +
        friends.map(friend => `${friend.name} ${friend.age}`));

    return db.friends.where('name').startsWith("S").keys();

}).then(friendNames => {

    console.log("Friends on 'S': " + friendNames);

}).catch(err => {

    console.log("Ouch... " + err);

});