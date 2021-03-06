# History

```js
meteor add ivansglazunov:history
```

History for logging.

* Typed logging.
* Data attribute.
* Links to document in any collection.
* Insert, update and remove watching.

## Using

Just insert your history.

Example with [matb33:collection-hooks](https://github.com/matb33/meteor-collection-hooks):
```js
MyCollection.after.insert(function(userId, doc) {
    History.insert({
        ref: doc.Ref(),
        type: 'insert',
        user: Meteor.users.findOne(userId)
    });
});
```

Custom data.
```js
MyCollection.after.update(function(userId, doc) {
    History.insert({
        ref: doc.Ref(),
        type: 'update',
        user: Meteor.users.findOne(userId),
        data: { x: doc.x, y: doc.y }
    });
});
```

Or wrap your collection:
```js
History.watchInsert(MyCollection);
History.watchUpdate(MyCollection);
History.watchRemove(MyCollection);
```

## Versions

### 0.0.2
* Watchers.

### 0.0.1
* User field is Ref.
* Not autoValue for user field.