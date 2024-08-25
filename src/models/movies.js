// const mongoose = require('mongoose')
const validator = require('validator')
const { taskManagerConnection } = require('../db/mongoose');

const MoviesDB = taskManagerConnection.model('Movies', {

    id: { type: Number },
    url: { type: String },
    name: { type: String },
    type: { type: String },
    language: { type: String },
    genres: { type: [String] },
    status: { type: String },
    runtime: { type: Number },
    premiered: { type: String },
    schedule: {
        type: {
            time: { type: String },
            days: { type: [String] },
        }
    },
    rating: {
        type: {
            average: { type: Number },
        }
    },
    weight: { type: Number },
    network: {
        type: {
            id: { type: Number },
            name: { type: String },
            country: {
                type: {
                    name: { type: String },
                    code: { type: String },
                    timezone: { type: String },

                }
            }

        }
    },
    webChannel: { type: String },
    externals: {
        type: {
            tvrage: { type: Number },
            thetvdb: { type: Number },
            imdb: { type: String },
        }
    },

    image: {
        type: {
            medium: { type: String },
            original: { type: String },
        }
    },
    summary: { type: String },
    updated: { type: Number },
    _links: {
        type: {
            self: {
                href: { type: String },
            },
            previousepisode: {
                href: { type: String },
            },
            nextepisode: {
                href: { type: String },
            },
        }
    }


})
module.exports = MoviesDB;