"use strict";

/*
 * The MIT License (MIT)
 *
 * Copyright (c) Franco Cavestri
 *
 * https://github.com/cavestri/themoviedb-javascript-library
 *
 */

var theMovieDb = {};

theMovieDb.common = {
    api_key: "532f680f186ee3009db06b2e2efe9aab",
    base_uri: "http://api.themoviedb.org/3/",
    images_uri: "http://image.tmdb.org/t/p/",
    timeout: 1000,
    language: "ru-RU",
    generateQuery: function generateQuery(options) {
        'use strict';

        var myOptions, query, option;

        myOptions = options || {};
        query = "?api_key=" + theMovieDb.common.api_key + "&language=" + theMovieDb.common.language;

        if (Object.keys(myOptions).length > 0) {
            for (option in myOptions) {
                if (myOptions.hasOwnProperty(option) && option !== "id" && option !== "body") {
                    query = query + "&" + option + "=" + myOptions[option];
                }
            }
        }
        return query;
    },
    validateCallbacks: function validateCallbacks(success, error) {
        'use strict';

        if (typeof success !== "function" || typeof error !== "function") {
            throw "success and error parameters must be functions!";
        }
    },
    validateRequired: function validateRequired(args, argsReq, opt, optReq, allOpt) {
        'use strict';

        var i, allOptional;

        allOptional = allOpt || false;

        if (args.length !== argsReq) {
            throw "The method requires  " + argsReq + " arguments and you are sending " + args.length + "!";
        }

        if (allOptional) {
            return;
        }

        if (argsReq > 2) {
            for (i = 0; i < optReq.length; i = i + 1) {
                if (!opt.hasOwnProperty(optReq[i])) {
                    throw optReq[i] + " is a required parameter and is not present in the options!";
                }
            }
        }
    },
    getImage: function getImage(options) {
        'use strict';

        return theMovieDb.common.images_uri + options.size + "/" + options.file;
    },
    client: function client(options, success, error) {
        'use strict';

        var method, status, xhr;

        method = options.method || "GET";
        status = options.status || 200;
        xhr = new XMLHttpRequest();

        xhr.ontimeout = function () {
            error('{"status_code":408,"status_message":"Request timed out"}');
        };

        xhr.open(method, theMovieDb.common.base_uri + options.url, true);

        if (options.method === "POST") {
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Accept", "application/json");
        }

        xhr.timeout = theMovieDb.common.timeout;

        xhr.onload = function (e) {
            if (xhr.readyState === 4) {
                if (xhr.status === status) {
                    success(xhr.responseText);
                } else {
                    error(xhr.responseText);
                }
            } else {
                error(xhr.responseText);
            }
        };

        xhr.onerror = function (e) {
            error(xhr.responseText);
        };
        if (options.method === "POST") {
            xhr.send(JSON.stringify(options.body));
        } else {
            xhr.send(null);
        }
    }
};

theMovieDb.configurations = {
    getConfiguration: function getConfiguration(success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 2);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "configuration" + theMovieDb.common.generateQuery()
        }, success, error);
    },
    getCountries: function getCountries(success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 2);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "configuration/countries" + theMovieDb.common.generateQuery()
        }, success, error);
    },
    getJobs: function getJobs(success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 2);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "configuration/jobs" + theMovieDb.common.generateQuery()
        }, success, error);
    },
    getLanguages: function getLanguages(success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 2);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "configuration/languages" + theMovieDb.common.generateQuery()
        }, success, error);
    },
    getPrimaryTranslations: function getPrimaryTranslations(success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 2);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "configuration/primary_translations" + theMovieDb.common.generateQuery()
        }, success, error);
    },
    getTimezones: function getTimezones(success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 2);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "configuration/timezones" + theMovieDb.common.generateQuery()
        }, success, error);
    }
};

theMovieDb.account = {
    getInformation: function getInformation(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["session_id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "account" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getLists: function getLists(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "account/" + options.id + "/lists" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getFavoritesMovies: function getFavoritesMovies(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "account/" + options.id + "/favorite/movies" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getFavoritesTvShows: function getFavoritesTvShows(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "account/" + options.id + "/favorite/tv?" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    addFavorite: function addFavorite(options, success, error) {
        'use strict';

        var body;

        theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id", "media_type", "media_id", "favorite"]);

        theMovieDb.common.validateCallbacks(success, error);

        body = {
            "media_type": options.media_type,
            "media_id": options.media_id,
            "favorite": options.favorite
        };

        theMovieDb.common.client({
            url: "account/" + options.id + "/favorite" + theMovieDb.common.generateQuery(options),
            status: 201,
            method: "POST",
            body: body
        }, success, error);
    },
    getRatedMovies: function getRatedMovies(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "account/" + options.id + "/rated/movies" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getRatedTvShows: function getRatedTvShows(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "account/" + options.id + "/rated/tv" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getRatedTvEpisodes: function getRatedTvEpisodes(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "account/" + options.id + "rated/tv/episodes" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getMovieWatchlist: function getMovieWatchlist(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "account/" + options.id + "/watchlist/movies" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getTvShowsWatchlist: function getTvShowsWatchlist(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "account/" + options.id + "/watchlist/tv" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    addToWatchlist: function addToWatchlist(options, success, error) {
        'use strict';

        var body;

        theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id", "media_type", "media_id", "watchlist"]);

        theMovieDb.common.validateCallbacks(success, error);

        body = {
            "media_type": options.media_type,
            "media_id": options.media_id,
            "watchlist": options.watchlist
        };

        theMovieDb.common.client({
            url: "account/" + options.id + "/watchlist" + theMovieDb.common.generateQuery(options),
            method: "POST",
            status: 201,
            body: body
        }, success, error);
    }
};

theMovieDb.authentication = {
    generateToken: function generateToken(success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 2);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "authentication/token/new" + theMovieDb.common.generateQuery()
        }, success, error);
    },
    askPermissions: function askPermissions(options) {
        'use strict';

        window.open("https://www.themoviedb.org/authenticate/" + options.token + "?redirect_to=" + options.redirect_to);
    },
    validateUser: function validateUser(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["request_token", "username", "password"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "authentication/token/validate_with_login" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    generateSession: function generateSession(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["request_token"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "authentication/session/new" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    generateGuestSession: function generateGuestSession(success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 2);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "authentication/guest_session/new" + theMovieDb.common.generateQuery()
        }, success, error);
    }
};

theMovieDb.certifications = {
    getMovieList: function getMovieList(success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 2);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "certification/movie/list" + theMovieDb.common.generateQuery()
        }, success, error);
    },
    getTvList: function getTvList(success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 2);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "certification/tv/list" + theMovieDb.common.generateQuery()
        }, success, error);
    }
};

theMovieDb.changes = {
    getMovieChanges: function getMovieChanges(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "movie/changes" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getPersonChanges: function getPersonChanges(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "person/changes" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getTvChanges: function getTvChanges(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "tv/changes" + theMovieDb.common.generateQuery(options)
        }, success, error);
    }
};

theMovieDb.collections = {
    getDetails: function getDetails(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "collection/" + options.id + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getImages: function getImages(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "collection/" + options.id + "/images" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getTranslations: function getTranslations(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "collection/" + options.id + "/translations" + theMovieDb.common.generateQuery(options)
        }, success, error);
    }
};

theMovieDb.companies = {
    getDetails: function getDetails(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "company/" + options.id + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getAlternativeNames: function getAlternativeNames(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "company/" + options.id + "/alternative_names" + theMovieDb.common.generateQuery(options)
        }, success, error);
    }

};

theMovieDb.credits = {
    getDetails: function getDetails(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "credit/" + options.id + theMovieDb.common.generateQuery(options)
        }, success, error);
    }
};

theMovieDb.discover = {
    getMovies: function getMovies(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "discover/movie" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getTvShows: function getTvShows(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "discover/tv" + theMovieDb.common.generateQuery(options)
        }, success, error);
    }

};

theMovieDb.find = {
    getById: function getById(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id", "external_source"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "find/" + options.id + theMovieDb.common.generateQuery(options)
        }, success, error);
    }
};

theMovieDb.genres = {
    getMovieList: function getMovieList(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "genre/movie/list" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getMovies: function getMovies(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "genre/" + options.id + "/movies" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getTvList: function getTvList(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "genre/tv/list" + theMovieDb.common.generateQuery(options)
        }, success, error);
    }

};

theMovieDb.guestSession = {
    getRatedMovies: function getRatedMovies(success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "guest_session/" + options.id + "/rated/movies" + theMovieDb.common.generateQuery()
        }, success, error);
    },
    getRatedTvShows: function getRatedTvShows(success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "guest_session/" + options.id + "/rated/tv" + theMovieDb.common.generateQuery()
        }, success, error);
    },
    getRatedTvEpisodes: function getRatedTvEpisodes(success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "guest_session/" + options.id + "/rated/tv/episodes" + theMovieDb.common.generateQuery()
        }, success, error);
    }
};

theMovieDb.keywords = {
    getById: function getById(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "keyword/" + options.id + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getMovies: function getMovies(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "keyword/" + options.id + "/movies" + theMovieDb.common.generateQuery(options)
        }, success, error);
    }
};

theMovieDb.lists = {
    getById: function getById(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "list/" + options.id + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getStatusById: function getStatusById(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id", "movie_id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "list/" + options.id + "/item_status" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    addList: function addList(options, success, error) {
        'use strict';

        var body;

        theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "name", "description"]);

        theMovieDb.common.validateCallbacks(success, error);

        body = {
            "name": options.name,
            "description": options.description
        };

        delete options.name;
        delete options.description;

        if (options.hasOwnProperty("language")) {
            body["language"] = options.language;

            delete options.language;
        }

        theMovieDb.common.client({
            method: "POST",
            status: 201,
            url: "list" + theMovieDb.common.generateQuery(options),
            body: body
        }, success, error);
    },
    addItem: function addItem(options, success, error) {
        'use strict';

        var body;

        theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id", "media_id"]);

        theMovieDb.common.validateCallbacks(success, error);

        body = {
            "media_id": options.media_id
        };

        theMovieDb.common.client({
            method: "POST",
            status: 201,
            url: "list/" + options.id + "/add_item" + theMovieDb.common.generateQuery(options),
            body: body
        }, success, error);
    },
    removeItem: function removeItem(options, success, error) {
        'use strict';

        var body;

        theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id", "media_id"]);

        theMovieDb.common.validateCallbacks(success, error);

        body = {
            "media_id": options.media_id
        };

        theMovieDb.common.client({
            method: "POST",
            status: 201,
            url: "list/" + options.id + "/remove_item" + theMovieDb.common.generateQuery(options),
            body: body
        }, success, error);
    },
    removeList: function removeList(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            method: "DELETE",
            status: 204,
            url: "list/" + options.id + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    clearList: function clearList(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id", "confirm"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            method: "POST",
            status: 204,
            body: {},
            url: "list/" + options.id + "/clear" + theMovieDb.common.generateQuery(options)
        }, success, error);
    }
};

theMovieDb.movies = {
    getById: function getById(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "movie/" + options.id + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getAccountStates: function getAccountStates(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "movie/" + options.id + "/account_states" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getAccountStatesGuest: function getAccountStatesGuest(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["guest_session_id", "id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "movie/" + options.id + "/account_states" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getAlternativeTitles: function getAlternativeTitles(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "movie/" + options.id + "/alternative_titles" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getChanges: function getChanges(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "movie/" + options.id + "/changes" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getCredits: function getCredits(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "movie/" + options.id + "/credits" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getExternalIds: function getExternalIds(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "movie/" + options.id + "/external_ids" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getImages: function getImages(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "movie/" + options.id + "/images" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getKeywords: function getKeywords(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "movie/" + options.id + "/keywords" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getReleases: function getReleases(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "movie/" + options.id + "/release_dates" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getVideos: function getVideos(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "movie/" + options.id + "/videos" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getTranslations: function getTranslations(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "movie/" + options.id + "/translations" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getRecommendations: function getRecommendations(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "movie/" + options.id + "/recommendations" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getSimilarMovies: function getSimilarMovies(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "movie/" + options.id + "/similar" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getReviews: function getReviews(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "movie/" + options.id + "/reviews" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getLists: function getLists(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "movie/" + options.id + "/lists" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getLatest: function getLatest(success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 2);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "movie/latest" + theMovieDb.common.generateQuery()
        }, success, error);
    },
    getUpcoming: function getUpcoming(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "movie/upcoming" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getNowPlaying: function getNowPlaying(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "movie/now_playing" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getPopular: function getPopular(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "movie/popular" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getTopRated: function getTopRated(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "movie/top_rated" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    rate: function rate(options, _rate, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 4, options, ["session_id", "id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            method: "POST",
            status: 201,
            url: "movie/" + options.id + "/rating" + theMovieDb.common.generateQuery(options),
            body: {
                "value": _rate
            }
        }, success, error);
    },
    rateGuest: function rateGuest(options, rate, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 4, options, ["guest_session_id", "id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            method: "POST",
            status: 201,
            url: "movie/" + options.id + "/rating" + theMovieDb.common.generateQuery(options),
            body: {
                "value": rate
            }
        }, success, error);
    },
    removeRate: function removeRate(options, rate, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 4, options, ["session_id", "id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            method: "DELETE",
            status: 200,
            url: "movie/" + options.id + "/rating" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    removeRateGuest: function removeRateGuest(options, rate, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 4, options, ["guest_session_id", "id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            method: "DELETE",
            status: 200,
            url: "movie/" + options.id + "/rating" + theMovieDb.common.generateQuery(options)
        }, success, error);
    }
};

theMovieDb.networks = {
    getById: function getById(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "network/" + options.id + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getAlternativeNames: function getAlternativeNames(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "network/" + options.id + "/alternative_names" + theMovieDb.common.generateQuery(options)
        }, success, error);
    }
};

theMovieDb.people = {
    getById: function getById(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "person/" + options.id + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getMovieCredits: function getMovieCredits(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "person/" + options.id + "/movie_credits" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getTvCredits: function getTvCredits(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "person/" + options.id + "/tv_credits" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getCredits: function getCredits(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "person/" + options.id + "/combined_credits" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getExternalIds: function getExternalIds(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "person/" + options.id + "/external_ids" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getImages: function getImages(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "person/" + options.id + "/images" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getTaggedImages: function getTaggedImages(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "person/" + options.id + "/tagged_images" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getChanges: function getChanges(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "person/" + options.id + "/changes" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getPopular: function getPopular(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "person/popular" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getLatest: function getLatest(success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 2);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "person/latest" + theMovieDb.common.generateQuery()
        }, success, error);
    }
};

theMovieDb.reviews = {
    getById: function getById(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "review/" + options.id + theMovieDb.common.generateQuery(options)
        }, success, error);
    }
};

theMovieDb.search = {
    getMovie: function getMovie(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["query"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "search/movie" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getCollection: function getCollection(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["query"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "search/collection" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getTv: function getTv(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["query"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "search/tv" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getPerson: function getPerson(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["query"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "search/person" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getCompany: function getCompany(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["query"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "search/company" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getKeyword: function getKeyword(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["query"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "search/keyword" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getMulti: function getMulti(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["query"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "search/multi" + theMovieDb.common.generateQuery(options)
        }, success, error);
    }
};

theMovieDb.tv = {
    getById: function getById(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "tv/" + options.id + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getAccountStates: function getAccountStates(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "tv/" + options.id + "/account_states" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getAccountStatesGuest: function getAccountStatesGuest(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["guest_session_id", "id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "tv/" + options.id + "/account_states" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getAlternativeTitles: function getAlternativeTitles(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "tv/" + options.id + "/alternative_titles" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getChanges: function getChanges(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "tv/" + options.id + "/changes" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getContentRatings: function getContentRatings(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "tv/" + options.id + "/content_ratings" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getCredits: function getCredits(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "tv/" + options.id + "/credits" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getExternalIds: function getExternalIds(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "tv/" + options.id + "/external_ids" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getImages: function getImages(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "tv/" + options.id + "/images" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getKeywords: function getKeywords(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "tv/" + options.id + "/keywords" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getRecommendations: function getRecommendations(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "tv/" + options.id + "/recommendations" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getReviews: function getReviews(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "tv/" + options.id + "/reviews" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getScreenedTheatrically: function getScreenedTheatrically(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "tv/" + options.id + "/screened_theatrically" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getSimilar: function getSimilar(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "tv/" + options.id + "/similar" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getTranslations: function getTranslations(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "tv/" + options.id + "/translations" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getVideos: function getVideos(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "tv/" + options.id + "/videos" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getAiringToday: function getAiringToday(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "tv/airing_today" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getLatest: function getLatest(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "tv/latest" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getOnTheAir: function getOnTheAir(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "tv/on_the_air" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getPopular: function getPopular(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "tv/popular" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getTopRated: function getTopRated(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "tv/top_rated" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    rate: function rate(options, _rate2, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 4, options, ["session_id", "id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            method: "POST",
            status: 201,
            url: "tv/" + options.id + "/rating" + theMovieDb.common.generateQuery(options),
            body: {
                "value": _rate2
            }
        }, success, error);
    },
    rateGuest: function rateGuest(options, rate, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 4, options, ["guest_session_id", "id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            method: "POST",
            status: 201,
            url: "tv/" + options.id + "/rating" + theMovieDb.common.generateQuery(options),
            body: {
                "value": rate
            }
        }, success, error);
    },
    removeRate: function removeRate(options, rate, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 4, options, ["session_id", "id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            method: "DELETE",
            status: 200,
            url: "tv/" + options.id + "/rating" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    removeRateGuest: function removeRateGuest(options, rate, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 4, options, ["guest_session_id", "id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            method: "DELETE",
            status: 200,
            url: "tv/" + options.id + "/rating" + theMovieDb.common.generateQuery(options)
        }, success, error);
    }
};

theMovieDb.tvSeasons = {
    getById: function getById(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["season_number", "id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "tv/" + options.id + "/season/" + options.season_number + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getChanges: function getChanges(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "tv/season/" + options.id + "/changes" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getAccountStates: function getAccountStates(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "season_number", "id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "tv/" + options.id + "/season/" + options.season_number + "/account_states" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getAccountStatesGuest: function getAccountStatesGuest(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["guest_session_id", "season_number", "id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "tv/" + options.id + "/season/" + options.season_number + "/account_states" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getCredits: function getCredits(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["season_number", "id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "tv/" + options.id + "/season/" + options.season_number + "/credits" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getExternalIds: function getExternalIds(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["season_number", "id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "tv/" + options.id + "/season/" + options.season_number + "/external_ids" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getImages: function getImages(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["season_number", "id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "tv/" + options.id + "/season/" + options.season_number + "/images" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getVideos: function getVideos(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["season_number", "id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "tv/" + options.id + "/season/" + options.season_number + "/videos" + theMovieDb.common.generateQuery(options)
        }, success, error);
    }
};

theMovieDb.tvEpisodes = {
    getById: function getById(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["episode_number", "season_number", "id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getChanges: function getChanges(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "tv/episode/" + options.id + "/changes" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getAccountStates: function getAccountStates(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "episode_number", "season_number", "id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + "/account_states" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getAccountStatesGuest: function getAccountStatesGuest(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["guest_session_id", "episode_number", "season_number", "id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + "/account_states" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getCredits: function getCredits(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["episode_number", "season_number", "id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + "/credits" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getExternalIds: function getExternalIds(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["episode_number", "season_number", "id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + "/external_ids" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getImages: function getImages(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["episode_number", "season_number", "id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + "/images" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    getVideos: function getVideos(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["episode_number", "season_number", "id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + "/videos" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    rate: function rate(options, _rate3, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 4, options, ["episode_number", "season_number", "session_id", "id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            method: "POST",
            status: 201,
            url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + "/rating" + theMovieDb.common.generateQuery(options),
            body: {
                "value": _rate3
            }
        }, success, error);
    },
    rateGuest: function rateGuest(options, rate, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 4, options, ["episode_number", "season_number", "guest_session_id", "id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            method: "POST",
            status: 201,
            url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + "/rating" + theMovieDb.common.generateQuery(options),
            body: {
                "value": rate
            }
        }, success, error);
    },
    removeRate: function removeRate(options, rate, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 4, options, ["episode_number", "season_number", "session_id", "id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            method: "DELETE",
            status: 200,
            url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + "/rating" + theMovieDb.common.generateQuery(options)
        }, success, error);
    },
    removeRateGuest: function removeRateGuest(options, rate, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 4, options, ["episode_number", "season_number", "guest_session_id", "id"]);

        theMovieDb.common.validateCallbacks(success, error);

        theMovieDb.common.client({
            method: "DELETE",
            status: 200,
            url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + "/rating" + theMovieDb.common.generateQuery(options)
        }, success, error);
    }
};
'use strict';

var errorCB = function errorCB(res) {
    var obj = JSON.parse(res);
    console.log(obj);
};

var successCB = function successCB(res) {
    var obj = JSON.parse(res);
    updateView(obj.results);
};

var getPopular = function getPopular() {
    theMovieDb.movies.getPopular({}, successCB, errorCB);
};

var result = document.querySelector('.videos');
var idInput = document.querySelector('#idInput');

var htmlTpl = document.querySelector('#card').textContent.trim();
var compiled = _.template(htmlTpl);

var updateView = function updateView(users) {
    var htmlString = '';
    users.forEach(function (user) {
        htmlString += compiled(user);
    });
    result.innerHTML = htmlString;
};

var renderSearchResult = function renderSearchResult(data) {

    var parsedData = JSON.parse(data);

    updateView(parsedData.results);
};

var searchByName = function searchByName(name, cb) {
    var data = {};
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            cb(this.response);
        }
    });
    xhr.open("GET", 'https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=' + name + '&language=ru-RU&api_key=532f680f186ee3009db06b2e2efe9aab');
    xhr.send(data);
};

getPopular();

var onClickHandler = function onClickHandler(event) {
    event.preventDefault(0);
    if (event.target.value = '') return;
    if (event.target.classList.contains('idBtn')) {
        searchByName(idInput.value, renderSearchResult);
    }
};

document.addEventListener('click', onClickHandler);
'use strict';

// const result = document.querySelector('.result');
var htmlTempl = document.querySelector('#Extendcard').textContent.trim();
var compile = _.template(htmlTempl);

//Добавить onclick="showMovie(<%- id%>)" в шаблон маленькой карточки на класс "render-card"

function showMovie(id) {
  renderFullCard(id);
}

var updateViewMoview = function updateViewMoview(data) {
  var htmlString = compile(data);
  result.innerHTML = htmlString;
};

var renderFullCard = function renderFullCard(id) {

  axios.get('https://api.themoviedb.org/3/movie/' + id + '?language=ru-RU&api_key=532f680f186ee3009db06b2e2efe9aab').then(function (response) {
    var _response$data = response.data,
        genres = _response$data.genres,
        overview = _response$data.overview,
        poster = _response$data.poster_path,
        countries = _response$data.production_countries,
        date = _response$data.release_date,
        runtime = _response$data.runtime,
        tagline = _response$data.tagline,
        title = _response$data.title;

    axios.get('https://api.themoviedb.org/3/movie/' + id + '/images?api_key=532f680f186ee3009db06b2e2efe9aab').then(function (resp) {
      var backdrops = resp.data.backdrops;

      axios.get('https://api.themoviedb.org/3/movie/' + id + '/credits?language=ru-RU&api_key=532f680f186ee3009db06b2e2efe9aab').then(function (rsp) {
        var _rsp$data = rsp.data,
            cast = _rsp$data.cast,
            crew = _rsp$data.crew;

        axios.get('https://api.themoviedb.org/3/movie/' + id + '/videos?api_key=532f680f186ee3009db06b2e2efe9aab').then(function (respo) {
          var key = respo.data.results[0].key;
          updateViewMoview({ title: title, genres: genres, overview: overview, poster: poster, countries: countries, date: date, runtime: runtime, tagline: tagline, backdrops: backdrops, cast: cast, crew: crew, key: key });
        });
      }).catch(function (e) {
        console.log(e);
      });
    }).catch(function (err) {
      console.log(error);
    });
  }).catch(function (error) {
    console.log(error);
  });
};
'use strict';

var menu = document.querySelector('.header__menu');
var stub = document.querySelector('.stub');
var aside = document.querySelector('.aside');
var asideList = document.querySelector('.aside__list');
var asideItem = document.querySelectorAll('.aside__item');
var category = document.querySelectorAll('.category__list');
var searchBtn = document.querySelector('.hidden-search');
var hiddenBlock = document.querySelector('.hidden');

var toggleAside = function toggleAside() {
  aside.classList.toggle('js-show-aside');
  stub.classList.add('js-show-stub');
};

menu.addEventListener('click', toggleAside);

var toggleCategorys = function toggleCategorys(evt) {
  if (evt.target.classList.contains('aside__item')) {
    evt.target.classList.toggle('aside__item-active');
    evt.target.firstElementChild.classList.toggle('js-show-category-list');
  }
};

asideList.addEventListener('click', toggleCategorys);

var toggleHiddenBlock = function toggleHiddenBlock() {
  hiddenBlock.classList.toggle('js-show-hidden');
  stub.classList.add('js-show-stub');
};

searchBtn.addEventListener('click', toggleHiddenBlock);

var hideBlocks = function hideBlocks(evt) {
  if (stub.classList.contains('js-show-stub')) {
    hiddenBlock.classList.remove('js-show-hidden');
    aside.classList.remove('js-show-aside');
    stub.classList.remove('js-show-stub');
  }
  // if (evt.target.clssList.contains9('hidden__logo-block'))
};
// const logo = document.querySelector('.header__logo-link');
// logo.addEventListener('click', getPopular());
stub.addEventListener('click', hideBlocks);
function categorySwitcher() {
  var categories = document.querySelector('.category-list'); //
  var categoryItems = document.querySelectorAll('.category-item'); //
  var videoItem = document.querySelectorAll('.videos-item');
  var currentCategory = document.querySelector('.сategory');
  var topForm = document.querySelector('.top-form');

  categories.addEventListener('click', onCetegoryClick);

  function onCetegoryClick(event) {
    topForm.classList.add('top-form--active');
    categoryItems.forEach(function (elem) {
      elem.classList.remove('category-item--active');
    });
    event.target.classList.add('category-item--active');
    currentCategory.textContent = event.target.textContent;
  }
}

categorySwitcher();