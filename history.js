History = new Mongo.Collection('ivansglazunov:history');

History.attachSchema(new SimpleSchema({
    ref: {
        type: Refs.Schema
    },
    type: {
        type: String
    },
    user: {
        type: String,
        optional: true,
        autoValue: function() {
            if (this.isInsert && this.userId) return this.userId;
        }
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