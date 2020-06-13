let mongoose = require('mongoose');
let moment = require('moment')

let Schema = mongoose.Schema;

let AuthorSchema = new Schema(
    {
        first_name: {type: String, required: true, max: 100},
        family_name: {type: String, required: true, max: 100},
        date_of_birth: {type: Date},
        date_of_death: {type: Date},
    }
);

AuthorSchema
    .virtual('name')
    .get(function () {
        var fullname = '';
        if (this.first_name && this.family_name) {
            fullname = this.family_name + ', ' + this.first_name
        }
        if (!this.first_name || !this.family_name) {
            fullname = '';
        }

        return fullname;
    });

AuthorSchema
    .virtual('lifespan')
    .get(function () {
        return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
    });

AuthorSchema
    .virtual('url')
    .get(function () {
        return '/catalog/author/' + this._id;
    });

AuthorSchema
    .virtual('date_of_birth_formatted')
    .get(function () {
        return moment(this.date_of_birth).format('MMMM Do, YYYY');
    })

AuthorSchema
    .virtual('date_of_death_formatted')
    .get(function () {
        return moment(this.date_of_death).format('MMMM Do, YYYY');
    })

module.exports = mongoose.model('Author', AuthorSchema);
