History = new Mongo.Collection('ivansglazunov:history');

History.attachSchema(new SimpleSchema({
    ref: {
        type: Refs.Schema
    },
    type: {
        type: String
    },
    user: {
        type: Refs.Schema
    },
    date: {
		type: Date,
		optional: true,
		autoValue: function() {
			if (this.isInsert) return new Date();
		}
    },
    data: {
        type: Object,
        optional: true
    }
}));

History.deny({
    insert: function() { return true; },
    update: function() { return true; },
    remove: function() { return true; }
});

// (collection: Mongo.Collection, handler: .call(this, userId, doc, query))
History.watchInsert = function(collection, handler) {
	collection.after.insert(function(userId, doc) {
	    var doc = collection._transform(doc);
        var query = {
            ref: doc.Ref(),
            type: 'insert',
            user: userId?Meteor.users.findOne(userId).Ref():undefined
    	};
    	if (handler) handler.call(this, userId, doc, query);
    	History.insert(query);
	});
}

// (collection: Mongo.Collection, handler: .call(this, userId, doc, fieldNames, modifier, options, query))
History.watchUpdate = function(collection, handler) {
	collection.after.update(function(userId, doc, fieldNames, modifier, options) {
	    var doc = collection._transform(doc);
        var query = {
            ref: doc.Ref(),
            type: 'update',
            user: userId?Meteor.users.findOne(userId).Ref():undefined
    	};
    	if (handler) handler.call(this, userId, doc, fieldNames, modifier, options, query);
    	History.insert(query);
	});
}

// (collection: Mongo.Collection, handler: .call(this, userId, doc, query))
History.watchRemove = function(collection, handler) {
	collection.after.remove(function(userId, doc) {
	    var doc = collection._transform(doc);
        var query = {
            ref: doc.Ref(),
            type: 'remove',
            user: userId?Meteor.users.findOne(userId).Ref():undefined
    	};
    	if (handler) handler.call(this, userId, doc, query);
    	History.insert(query);
	});
}