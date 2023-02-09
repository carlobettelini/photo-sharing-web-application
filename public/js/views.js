//EJS Compiled Views - This file was automatically generated on Thu Dec 10 2020 13:29:33 GMT+0100 (Central European Standard Time)
ejs.views_include = function(locals) {
    return function(path, d) {
        console.log("ejs.views_include", path, d);
        return ejs["views_" + path.replace(/\//g, "_")]({...d, ...locals }, null, ejs.views_include(locals));
    }
};
ejs.views_editor = function(locals, escapeFn, include = ejs.views_include(locals), rethrow) {
    rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc) {
        var lines = str.split('\n');
        var start = Math.max(lineno - 3, 0);
        var end = Math.min(lines.length, lineno + 3);
        var filename = esc(flnm);
        // Error context
        var context = lines.slice(start, end).map(function(line, i) {
            var curr = i + start + 1;
            return (curr == lineno ? ' >> ' : '    ') +
                curr +
                '| ' +
                line;
        }).join('\n');

        // Alter exception message
        err.path = filename;
        err.message = (filename || 'ejs') + ':' +
            lineno + '\n' +
            context + '\n\n' +
            err.message;

        throw err;
    };
    escapeFn = escapeFn || function(markup) {
        return markup == undefined ?
            '' :
            String(markup)
            .replace(_MATCH_HTML, encode_char);
    };
    var _ENCODE_HTML_RULES = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&#34;",
            "'": "&#39;"
        },
        _MATCH_HTML = /[&<>'"]/g;

    function encode_char(c) {
        return _ENCODE_HTML_RULES[c] || c;
    };;
    var __line = 1,
        __lines = "<%#\n  #\n  # Web Atelier 2020  Exercise 7 - Single-Page Web Applications with Fetch and Client-side Views\n  #\n  # Student: Carlo Bettelini\n  #\n  # editor.ejs view\n  #\n  #%>\n\n<% let path = \"http://localhost:4000/\"; %>\n<div class=\"edit-area\">\n  <div id=\"edit_form\">\n    <form class=\"edit\" method=\"POST\" action=\"/pictures/<%= current_image._id %>?_method=PUT\">\n      <div class=\"input-field\">\n        <label for=\"title\">Title:</label>\n        <input type=\"text\" name=\"title\" placeholder=\"Write a title here...\" value=\"<%= current_image.title || '' %>\" />\n      </div>\n      <div class=\"input-field\">\n        <label for=\"description\">Description:</label>\n        <textarea type=\"text\" name=\"description\" placeholder=\"Write a description here...\"><%= current_image.description || '' %></textarea>\n      </div>\n      <div class=\"input-field\">\n        <label for=\"favourite\">Favorite:</label>\n        <input type=\"checkbox\" name=\"favourite\" <% if (current_image.favourite) { %>checked <% } %>/>\n      </div>\n      <input type=\"hidden\" name=\"filter\" value=\"<%= current_image.filter %>\">\n      <input class=\"image_edit_button\" type=\"submit\" value=\"Submit changements\" /> \n    </form>\n    <br>\n    <div id=\"editor_other_choices\">\n      <form class=\"back\" method=\"GET\" action=\"/pictures\">\n        <input class=\"image_edit_button\" type=\"submit\" value=\"Back\" /> \n      </form>\n    </div>\n  </div>\n</div>\n  ",
        __filename = undefined;
    try {
        var __output = "";

        function __append(s) { if (s !== undefined && s !== null) __output += s }
        with(locals || {}) {;
            __line = 9;
            __append("\n\n");
            __line = 11;
            let path = "http://localhost:4000/";

            ;
            __append("\n<div class=\"edit-area\">\n  <div id=\"edit_form\">\n    <form class=\"edit\" method=\"POST\" action=\"/pictures/");
            __line = 14;
            __append(escapeFn(current_image._id));
            __append("?_method=PUT\">\n      <div class=\"input-field\">\n        <label for=\"title\">Title:</label>\n        <input type=\"text\" name=\"title\" placeholder=\"Write a title here...\" value=\"");
            __line = 17;
            __append(escapeFn(current_image.title || ''));
            __append("\" />\n      </div>\n      <div class=\"input-field\">\n        <label for=\"description\">Description:</label>\n        <textarea type=\"text\" name=\"description\" placeholder=\"Write a description here...\">");
            __line = 21;
            __append(escapeFn(current_image.description || ''));
            __append("</textarea>\n      </div>\n      <div class=\"input-field\">\n        <label for=\"favourite\">Favorite:</label>\n        <input type=\"checkbox\" name=\"favourite\" ");
            __line = 25;
            if (current_image.favourite) {;
                __append("checked ");
            };
            __append("/>\n      </div>\n      <input type=\"hidden\" name=\"filter\" value=\"");
            __line = 27;
            __append(escapeFn(current_image.filter));
            __append("\">\n      <input class=\"image_edit_button\" type=\"submit\" value=\"Submit changements\" /> \n    </form>\n    <br>\n    <div id=\"editor_other_choices\">\n      <form class=\"back\" method=\"GET\" action=\"/pictures\">\n        <input class=\"image_edit_button\" type=\"submit\" value=\"Back\" /> \n      </form>\n    </div>\n  </div>\n</div>\n  ");
            __line = 38
        }
        return __output;
    } catch (e) {
        rethrow(e, __lines, __filename, __line, escapeFn);
    }

}

ejs.views_filters = function(locals, escapeFn, include = ejs.views_include(locals), rethrow) {
    rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc) {
        var lines = str.split('\n');
        var start = Math.max(lineno - 3, 0);
        var end = Math.min(lines.length, lineno + 3);
        var filename = esc(flnm);
        // Error context
        var context = lines.slice(start, end).map(function(line, i) {
            var curr = i + start + 1;
            return (curr == lineno ? ' >> ' : '    ') +
                curr +
                '| ' +
                line;
        }).join('\n');

        // Alter exception message
        err.path = filename;
        err.message = (filename || 'ejs') + ':' +
            lineno + '\n' +
            context + '\n\n' +
            err.message;

        throw err;
    };
    escapeFn = escapeFn || function(markup) {
        return markup == undefined ?
            '' :
            String(markup)
            .replace(_MATCH_HTML, encode_char);
    };
    var _ENCODE_HTML_RULES = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&#34;",
            "'": "&#39;"
        },
        _MATCH_HTML = /[&<>'"]/g;

    function encode_char(c) {
        return _ENCODE_HTML_RULES[c] || c;
    };;
    var __line = 1,
        __lines = "<% let path = \"http://localhost:4000/\"; %>  \n<% let id = 0 %>\n\n<div class=\"edit-area\">\n    <div id=\"filtered-image\">\n        <h3>Original:</h3>\n        <div class=\"filters\">\n            <div id=\"<%= id %>\" class=\"filter\">\n                <img src=\"<%= path %>thumbnails/<%= current_image.filename %>\" />\n            </div>\n        </div>\n        <% id++ %>\n        \n        <% let i, j, k, l; %>\n        <% let filter; %>\n        \n        <% for (var value in filters) { %>\n            <h3><%= value.split(\" \")[1].split(\"(\")[0] %></h3>\n            <% let part_1 = value.split(',')[0]; %>\n            <% let part_3 = value.split(',')[1]; %>\n            <div class=\"filters\">\n            <% for (i=1, j=0.2, k=10, l=25; i<10; i++, j+=0.2, k+=10, l+=25) { %>\n                <% values = [i, j, k, l]; %>\n                <% filter = part_1 + values[filters[value]] + part_3 %>\n                <div id=\"<%= id %>\" class=\"filter\">\n                    <img src=\"<%= path %>thumbnails/<%= current_image.filename %>\" style=\"<%= filter %>\" />\n                </div>\n                <% id++ %>\n            <% } %>\n            </div>\n        <%} %>\n        <div id=\"editor_other_choices\">\n            <form class=\"back\" method=\"GET\" action=\"/pictures\">\n                <button class=\"image_edit_button\" type=\"submit\">Cancel</button>\n            </form>\n            <form class=\"save\" method=\"POST\" action=\"/pictures/<%= current_image._id %>?_method=PUT\">\n                <button class=\"image_edit_button\" type=\"submit\">Save\n                    <input type=\"hidden\" name=\"title\" value=\"<%= current_image.title %>\" />\n                    <input type=\"hidden\" name=\"description\" value=\"<%= current_image.description %>\" />\n                    <input type=\"hidden\" name=\"favourite\" value=\"<%= current_image.favourite %>\" />\n                </button>\n            </form>\n        </div>\n    </div>\n</div>\n",
        __filename = undefined;
    try {
        var __output = "";

        function __append(s) { if (s !== undefined && s !== null) __output += s }
        with(locals || {}) {;
            let path = "http://localhost:4000/";

            ;
            __append("  \n");
            __line = 2;
            let id = 0;
            __append("\n\n<div class=\"edit-area\">\n    <div id=\"filtered-image\">\n        <h3>Original:</h3>\n        <div class=\"filters\">\n            <div id=\"");
            __line = 8;
            __append(escapeFn(id));
            __append("\" class=\"filter\">\n                <img src=\"");
            __line = 9;
            __append(escapeFn(path));
            __append("thumbnails/");
            __append(escapeFn(current_image.filename));
            __append("\" />\n            </div>\n        </div>\n        ");
            __line = 12;
            id++;
            __append("\n        \n        ");
            __line = 14;
            let i, j, k, l;;
            __append("\n        ");
            __line = 15;
            let filter;;
            __append("\n        \n        ");
            __line = 17;
            for (var value in filters) {;
                __append("\n            <h3>");
                __line = 18;
                __append(escapeFn(value.split(" ")[1].split("(")[0]));
                __append("</h3>\n            ");
                __line = 19;
                let part_1 = value.split(',')[0];;
                __append("\n            ");
                __line = 20;
                let part_3 = value.split(',')[1];;
                __append("\n            <div class=\"filters\">\n            ");
                __line = 22;
                for (i = 1, j = 0.2, k = 10, l = 25; i < 10; i++, j += 0.2, k += 10, l += 25) {;
                    __append("\n                ");
                    __line = 23;
                    values = [i, j, k, l];;
                    __append("\n                ");
                    __line = 24;
                    filter = part_1 + values[filters[value]] + part_3;
                    __append("\n                <div id=\"");
                    __line = 25;
                    __append(escapeFn(id));
                    __append("\" class=\"filter\">\n                    <img src=\"");
                    __line = 26;
                    __append(escapeFn(path));
                    __append("thumbnails/");
                    __append(escapeFn(current_image.filename));
                    __append("\" style=\"");
                    __append(escapeFn(filter));
                    __append("\" />\n                </div>\n                ");
                    __line = 28;
                    id++;
                    __append("\n            ");
                    __line = 29;
                };
                __append("\n            </div>\n        ");
                __line = 31;
            };
            __append("\n        <div id=\"editor_other_choices\">\n            <form class=\"back\" method=\"GET\" action=\"/pictures\">\n                <button class=\"image_edit_button\" type=\"submit\">Cancel</button>\n            </form>\n            <form class=\"save\" method=\"POST\" action=\"/pictures/");
            __line = 36;
            __append(escapeFn(current_image._id));
            __append("?_method=PUT\">\n                <button class=\"image_edit_button\" type=\"submit\">Save\n                    <input type=\"hidden\" name=\"title\" value=\"");
            __line = 38;
            __append(escapeFn(current_image.title));
            __append("\" />\n                    <input type=\"hidden\" name=\"description\" value=\"");
            __line = 39;
            __append(escapeFn(current_image.description));
            __append("\" />\n                    <input type=\"hidden\" name=\"favourite\" value=\"");
            __line = 40;
            __append(escapeFn(current_image.favourite));
            __append("\" />\n                </button>\n            </form>\n        </div>\n    </div>\n</div>\n");
            __line = 46
        }
        return __output;
    } catch (e) {
        rethrow(e, __lines, __filename, __line, escapeFn);
    }

}

ejs.views_pictures = function(locals, escapeFn, include = ejs.views_include(locals), rethrow) {
    rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc) {
        var lines = str.split('\n');
        var start = Math.max(lineno - 3, 0);
        var end = Math.min(lines.length, lineno + 3);
        var filename = esc(flnm);
        // Error context
        var context = lines.slice(start, end).map(function(line, i) {
            var curr = i + start + 1;
            return (curr == lineno ? ' >> ' : '    ') +
                curr +
                '| ' +
                line;
        }).join('\n');

        // Alter exception message
        err.path = filename;
        err.message = (filename || 'ejs') + ':' +
            lineno + '\n' +
            context + '\n\n' +
            err.message;

        throw err;
    };
    escapeFn = escapeFn || function(markup) {
        return markup == undefined ?
            '' :
            String(markup)
            .replace(_MATCH_HTML, encode_char);
    };
    var _ENCODE_HTML_RULES = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&#34;",
            "'": "&#39;"
        },
        _MATCH_HTML = /[&<>'"]/g;

    function encode_char(c) {
        return _ENCODE_HTML_RULES[c] || c;
    };;
    var __line = 1,
        __lines = "<%#\n  #\n  # Web Atelier 2020  Exercise 7 - Single-Page Web Applications with Fetch and Client-side Views\n  #\n  # Student: Carlo\n  #\n  # pictures.ejs view\n  #\n  #%>\n\n<% let path = \"http://localhost:4000/\"; %>\n<% if (search) { %>\n  <h2><%= title %> - <%= search %></h2>\n<% } else { %>\n  <h2><%= title %></h2>\n<% } %>\n<div id=\"thumbnail-images\">\n<h3>Click on an image to modify its informations, click on <b>edit</b> to edit filters.</h3>\n    <% if (list.length == 0) { %>\n        <h3>So empty...</h3>\n    <% } else { %>\n        <% list.forEach( (image) => { %> \n            <% let extension = image.filename.split(\".\")[1]; %>\n            <% if (!image.missing_file &&  (extension == \"jpg\" || extension == \"jpeg\" || extension == \"png\")) { %>\n                <figure id=\"<%= image._id %>\" class=\"gallery_image\">\n                    <div id=\"<%= image._id %>\">\n                        <figcaption>\n                          <h4><%= image.title %></h4>\n                        </figcaption>\n                        <img src=\"<%= path %>thumbnails/<%= image.filename %>\" style=\"<%= image.filter %>\">\n                    </div>\n                    <div id=\"image_gallery_buttons\">\n                      <form class=\"duplicate\" method=\"POST\" action=\"/pictures\">\n                        <input class=\"image_gallery_button\" type=\"submit\" value=\"Duplicate\" />\n                        <input type=\"hidden\" name=\"duplicate\" value=\"true\">\n                        <input type=\"hidden\" name=\"filter\" value=\"<%= image.filter %>\">\n                        <input type=\"hidden\" name=\"filename\" value=\"<%= image.filename %>\">\n                        <input type=\"hidden\" name=\"title\" value=\"<%= image.title %>\"> \n                        <input type=\"hidden\" name=\"description\" value=\"<%= image.desc %>\"> \n                        <input type=\"hidden\" name=\"email\" value=\"<%= image.email %>\"> \n                        <input type=\"hidden\" name=\"quality\" value=\"<%= image.quality %>\"> \n                      </form>\n                      <form class=\"delete\" method=\"POST\" action=\"/pictures/<%= image._id %>?_method=DELETE\">\n                        <input class=\"image_gallery_button\" type=\"submit\" value=\"Delete\" /> \n                      </form>\n                      <form class=\"edit\" action=\"/pictures/<%= image._id %>/edit\" method=\"GET\">\n                        <button class=\"image_gallery_button\" type=\"submit\">Edit</button>\n                        <input type=\"hidden\" name=\"filter\" value=\"<%= image.filter %>\">\n                      </form>\n                      <a href=\"/pictures/<%= image._id %>/download\"><button class=\"image_gallery_button\" type=\"submit\">Download</button></a><br>\n                      <form class=\"slideshow\" action=\"/pictures/slideshow\" method=\"GET\">\n                        <button class=\"image_gallery_button-slideshow\" type=\"submit\">Show</button>\n                      </form>\n                    </div>\n                    <section class=\"edit\"></section>\n                </figure>\n            <% } %>\n        <% }); %>\n    <% } %>\n</div>",
        __filename = undefined;
    try {
        var __output = "";

        function __append(s) { if (s !== undefined && s !== null) __output += s }
        with(locals || {}) {;
            __line = 9;
            __append("\n\n");
            __line = 11;
            let path = "http://localhost:4000/";

            ;
            __append("\n");
            __line = 12;
            if (search) {;
                __append("\n  <h2>");
                __line = 13;
                __append(escapeFn(title));
                __append(" - ");
                __append(escapeFn(search));
                __append("</h2>\n");
                __line = 14;
            } else {;
                __append("\n  <h2>");
                __line = 15;
                __append(escapeFn(title));
                __append("</h2>\n");
                __line = 16;
            };
            __append("\n<div id=\"thumbnail-images\">\n<h3>Click on an image to modify its informations, click on <b>edit</b> to edit filters.</h3>\n    ");
            __line = 19;
            if (list.length == 0) {;
                __append("\n        <h3>So empty...</h3>\n    ");
                __line = 21;
            } else {;
                __append("\n        ");
                __line = 22;
                list.forEach((image) => {;
                    __append(" \n            ");
                    __line = 23;
                    let extension = image.filename.split(".")[1];;
                    __append("\n            ");
                    __line = 24;
                    if (!image.missing_file && (extension == "jpg" || extension == "jpeg" || extension == "png")) {;
                        __append("\n                <figure id=\"");
                        __line = 25;
                        __append(escapeFn(image._id));
                        __append("\" class=\"gallery_image\">\n                    <div id=\"");
                        __line = 26;
                        __append(escapeFn(image._id));
                        __append("\">\n                        <figcaption>\n                          <h4>");
                        __line = 28;
                        __append(escapeFn(image.title));
                        __append("</h4>\n                        </figcaption>\n                        <img src=\"");
                        __line = 30;
                        __append(escapeFn(path));
                        __append("thumbnails/");
                        __append(escapeFn(image.filename));
                        __append("\" style=\"");
                        __append(escapeFn(image.filter));
                        __append("\">\n                    </div>\n                    <div id=\"image_gallery_buttons\">\n                      <form class=\"duplicate\" method=\"POST\" action=\"/pictures\">\n                        <input class=\"image_gallery_button\" type=\"submit\" value=\"Duplicate\" />\n                        <input type=\"hidden\" name=\"duplicate\" value=\"true\">\n                        <input type=\"hidden\" name=\"filter\" value=\"");
                        __line = 36;
                        __append(escapeFn(image.filter));
                        __append("\">\n                        <input type=\"hidden\" name=\"filename\" value=\"");
                        __line = 37;
                        __append(escapeFn(image.filename));
                        __append("\">\n                        <input type=\"hidden\" name=\"title\" value=\"");
                        __line = 38;
                        __append(escapeFn(image.title));
                        __append("\"> \n                        <input type=\"hidden\" name=\"description\" value=\"");
                        __line = 39;
                        __append(escapeFn(image.desc));
                        __append("\"> \n                        <input type=\"hidden\" name=\"email\" value=\"");
                        __line = 40;
                        __append(escapeFn(image.email));
                        __append("\"> \n                        <input type=\"hidden\" name=\"quality\" value=\"");
                        __line = 41;
                        __append(escapeFn(image.quality));
                        __append("\"> \n                      </form>\n                      <form class=\"delete\" method=\"POST\" action=\"/pictures/");
                        __line = 43;
                        __append(escapeFn(image._id));
                        __append("?_method=DELETE\">\n                        <input class=\"image_gallery_button\" type=\"submit\" value=\"Delete\" /> \n                      </form>\n                      <form class=\"edit\" action=\"/pictures/");
                        __line = 46;
                        __append(escapeFn(image._id));
                        __append("/edit\" method=\"GET\">\n                        <button class=\"image_gallery_button\" type=\"submit\">Edit</button>\n                        <input type=\"hidden\" name=\"filter\" value=\"");
                        __line = 48;
                        __append(escapeFn(image.filter));
                        __append("\">\n                      </form>\n                      <a href=\"/pictures/");
                        __line = 50;
                        __append(escapeFn(image._id));
                        __append("/download\"><button class=\"image_gallery_button\" type=\"submit\">Download</button></a><br>\n                      <form class=\"slideshow\" action=\"/pictures/slideshow\" method=\"GET\">\n                        <button class=\"image_gallery_button-slideshow\" type=\"submit\">Show</button>\n                      </form>\n                    </div>\n                    <section class=\"edit\"></section>\n                </figure>\n            ");
                        __line = 57;
                    };
                    __append("\n        ");
                    __line = 58;
                });;
                __append("\n    ");
                __line = 59;
            };
            __append("\n</div>");
            __line = 60
        }
        return __output;
    } catch (e) {
        rethrow(e, __lines, __filename, __line, escapeFn);
    }

}

ejs.views_search = function(locals, escapeFn, include = ejs.views_include(locals), rethrow) {
    rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc) {
        var lines = str.split('\n');
        var start = Math.max(lineno - 3, 0);
        var end = Math.min(lines.length, lineno + 3);
        var filename = esc(flnm);
        // Error context
        var context = lines.slice(start, end).map(function(line, i) {
            var curr = i + start + 1;
            return (curr == lineno ? ' >> ' : '    ') +
                curr +
                '| ' +
                line;
        }).join('\n');

        // Alter exception message
        err.path = filename;
        err.message = (filename || 'ejs') + ':' +
            lineno + '\n' +
            context + '\n\n' +
            err.message;

        throw err;
    };
    escapeFn = escapeFn || function(markup) {
        return markup == undefined ?
            '' :
            String(markup)
            .replace(_MATCH_HTML, encode_char);
    };
    var _ENCODE_HTML_RULES = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&#34;",
            "'": "&#39;"
        },
        _MATCH_HTML = /[&<>'"]/g;

    function encode_char(c) {
        return _ENCODE_HTML_RULES[c] || c;
    };;
    var __line = 1,
        __lines = "<h2>Search image</h2>\n\n<div id=\"search-bar\">\n    <form class=\"search\" action=\"/users\" method=\"GET\">\n        <input type=\"text\" name=\"search\" placeholder=\"Search for image\">\n        <input class=\"image_gallery_button\" type=\"submit\" value=\"Search\">\n    </form>\n</div>",
        __filename = undefined;
    try {
        var __output = "";

        function __append(s) { if (s !== undefined && s !== null) __output += s }
        with(locals || {}) {;
            __append("<h2>Search image</h2>\n\n<div id=\"search-bar\">\n    <form class=\"search\" action=\"/users\" method=\"GET\">\n        <input type=\"text\" name=\"search\" placeholder=\"Search for image\">\n        <input class=\"image_gallery_button\" type=\"submit\" value=\"Search\">\n    </form>\n</div>");
            __line = 8
        }
        return __output;
    } catch (e) {
        rethrow(e, __lines, __filename, __line, escapeFn);
    }

}

ejs.views_slideshow = function(locals, escapeFn, include = ejs.views_include(locals), rethrow) {
    rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc) {
        var lines = str.split('\n');
        var start = Math.max(lineno - 3, 0);
        var end = Math.min(lines.length, lineno + 3);
        var filename = esc(flnm);
        // Error context
        var context = lines.slice(start, end).map(function(line, i) {
            var curr = i + start + 1;
            return (curr == lineno ? ' >> ' : '    ') +
                curr +
                '| ' +
                line;
        }).join('\n');

        // Alter exception message
        err.path = filename;
        err.message = (filename || 'ejs') + ':' +
            lineno + '\n' +
            context + '\n\n' +
            err.message;

        throw err;
    };
    escapeFn = escapeFn || function(markup) {
        return markup == undefined ?
            '' :
            String(markup)
            .replace(_MATCH_HTML, encode_char);
    };
    var _ENCODE_HTML_RULES = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&#34;",
            "'": "&#39;"
        },
        _MATCH_HTML = /[&<>'"]/g;

    function encode_char(c) {
        return _ENCODE_HTML_RULES[c] || c;
    };;
    var __line = 1,
        __lines = "<%#\n  #\n  # Web Atelier 2020  Exercise 7 - Single-Page Web Applications with Fetch and Client-side Views\n  #\n  # Student: Carlo Bettelini\n  #\n  # slideshow.ejs view\n  #\n  #%>\n\n  <% let path = \"http://localhost:4000/\"; %>\n  <h2><%= title %></h2>\n  <% if (message != \"\") { %>\n    <h3><%= message %></h3>\n  <% } %>\n  <figure id=\"<%= current_image._id %>\">\n    <figcaption>\n        <h4><%= current_image.title %></h4>\n    </figcaption>\n    <div id=\"main-image-container-slideshow\">\n        <img id=\"main-image-slideshow\" src=\"<%= path %>images/<%= current_image.filename %>\" style=\"<%= current_image.filter %>\">\n    </div>\n    <div id=\"image_gallery_buttons\">\n      <form class=\"start\" action=\"/pictures/slideshow\" method=\"GET\">\n        <button class=\"image_gallery_button\" type=\"submit\">Start</button>\n        <input type=\"hidden\" name=\"filter\" value=\"<%= current_image._id %>\">\n      </form>\n      <form class=\"stop\" action=\"/pictures/slideshow\" method=\"GET\">\n        <button class=\"image_gallery_button\" type=\"submit\">Stop</button>\n        <input type=\"hidden\" name=\"filter\" value=\"<%= current_image._id %>\">\n      </form>\n    </div>\n  </figure>\n",
        __filename = undefined;
    try {
        var __output = "";

        function __append(s) { if (s !== undefined && s !== null) __output += s }
        with(locals || {}) {;
            __line = 9;
            __append("\n\n  ");
            __line = 11;
            let path = "http://localhost:4000/";

            ;
            __append("\n  <h2>");
            __line = 12;
            __append(escapeFn(title));
            __append("</h2>\n  ");
            __line = 13;
            if (message != "") {;
                __append("\n    <h3>");
                __line = 14;
                __append(escapeFn(message));
                __append("</h3>\n  ");
                __line = 15;
            };
            __append("\n  <figure id=\"");
            __line = 16;
            __append(escapeFn(current_image._id));
            __append("\">\n    <figcaption>\n        <h4>");
            __line = 18;
            __append(escapeFn(current_image.title));
            __append("</h4>\n    </figcaption>\n    <div id=\"main-image-container-slideshow\">\n        <img id=\"main-image-slideshow\" src=\"");
            __line = 21;
            __append(escapeFn(path));
            __append("images/");
            __append(escapeFn(current_image.filename));
            __append("\" style=\"");
            __append(escapeFn(current_image.filter));
            __append("\">\n    </div>\n    <div id=\"image_gallery_buttons\">\n      <form class=\"start\" action=\"/pictures/slideshow\" method=\"GET\">\n        <button class=\"image_gallery_button\" type=\"submit\">Start</button>\n        <input type=\"hidden\" name=\"filter\" value=\"");
            __line = 26;
            __append(escapeFn(current_image._id));
            __append("\">\n      </form>\n      <form class=\"stop\" action=\"/pictures/slideshow\" method=\"GET\">\n        <button class=\"image_gallery_button\" type=\"submit\">Stop</button>\n        <input type=\"hidden\" name=\"filter\" value=\"");
            __line = 30;
            __append(escapeFn(current_image._id));
            __append("\">\n      </form>\n    </div>\n  </figure>\n");
            __line = 34
        }
        return __output;
    } catch (e) {
        rethrow(e, __lines, __filename, __line, escapeFn);
    }

}

ejs.views_upload = function(locals, escapeFn, include = ejs.views_include(locals), rethrow) {
    rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc) {
        var lines = str.split('\n');
        var start = Math.max(lineno - 3, 0);
        var end = Math.min(lines.length, lineno + 3);
        var filename = esc(flnm);
        // Error context
        var context = lines.slice(start, end).map(function(line, i) {
            var curr = i + start + 1;
            return (curr == lineno ? ' >> ' : '    ') +
                curr +
                '| ' +
                line;
        }).join('\n');

        // Alter exception message
        err.path = filename;
        err.message = (filename || 'ejs') + ':' +
            lineno + '\n' +
            context + '\n\n' +
            err.message;

        throw err;
    };
    escapeFn = escapeFn || function(markup) {
        return markup == undefined ?
            '' :
            String(markup)
            .replace(_MATCH_HTML, encode_char);
    };
    var _ENCODE_HTML_RULES = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&#34;",
            "'": "&#39;"
        },
        _MATCH_HTML = /[&<>'"]/g;

    function encode_char(c) {
        return _ENCODE_HTML_RULES[c] || c;
    };;
    var __line = 1,
        __lines = "\n<h2>Upload</h2>\n<div id=\"upload-form\">\n    <form action=\"/pictures\" enctype=\"multipart/form-data\" method=\"POST\">\n        <div class=\"input-field\">\n            <label for=\"text\">Title for the picture:</label>\n            <input type=\"text\" name=\"title\" placeholder=\"Title...\" />\n        </div>\n        <br>\n        <div class=\"input-field\">\n            <label for=\"textarea\">Write a description of the file:</label>\n            <textarea type=\"textarea\" name=\"description\" placeholder=\"Description...\"></textarea>\n        </div>\n        <br>\n        <div class=\"input-field\">\n            <label for=\"email\">Your email:</label>\n            <input type=\"email\" name=\"email\" placeholder=\"Email...\" />\n        </div>\n        <br>\n        <div class=\"input-field-upload\">\n            <div class=\"input-field\">\n                <label for=\"file\">Upload the file:</label>\n                <input type=\"file\" name=\"file\" />\n            </div>\n            <div class=\"input-field\">\n                <label for=\"favourite\">Favorite:</label>\n                <input type=\"checkbox\" name=\"favourite\" />\n            </div>\n        </div>\n        <br>\n        <div class=\"input-field\">\n            <label for=\"range\">Image quality:</label>\n            <input type=\"range\" name=\"range\" />\n        </div>\n        <br>\n        <div class=\"buttons-upload\">\n            <input class=\"image_gallery_button\" type=\"submit\" value=\"Submit\">\n        </div>\n    </form>\n</div>",
        __filename = undefined;
    try {
        var __output = "";

        function __append(s) { if (s !== undefined && s !== null) __output += s }
        with(locals || {}) {;
            __append("\n<h2>Upload</h2>\n<div id=\"upload-form\">\n    <form action=\"/pictures\" enctype=\"multipart/form-data\" method=\"POST\">\n        <div class=\"input-field\">\n            <label for=\"text\">Title for the picture:</label>\n            <input type=\"text\" name=\"title\" placeholder=\"Title...\" />\n        </div>\n        <br>\n        <div class=\"input-field\">\n            <label for=\"textarea\">Write a description of the file:</label>\n            <textarea type=\"textarea\" name=\"description\" placeholder=\"Description...\"></textarea>\n        </div>\n        <br>\n        <div class=\"input-field\">\n            <label for=\"email\">Your email:</label>\n            <input type=\"email\" name=\"email\" placeholder=\"Email...\" />\n        </div>\n        <br>\n        <div class=\"input-field-upload\">\n            <div class=\"input-field\">\n                <label for=\"file\">Upload the file:</label>\n                <input type=\"file\" name=\"file\" />\n            </div>\n            <div class=\"input-field\">\n                <label for=\"favourite\">Favorite:</label>\n                <input type=\"checkbox\" name=\"favourite\" />\n            </div>\n        </div>\n        <br>\n        <div class=\"input-field\">\n            <label for=\"range\">Image quality:</label>\n            <input type=\"range\" name=\"range\" />\n        </div>\n        <br>\n        <div class=\"buttons-upload\">\n            <input class=\"image_gallery_button\" type=\"submit\" value=\"Submit\">\n        </div>\n    </form>\n</div>");
            __line = 40
        }
        return __output;
    } catch (e) {
        rethrow(e, __lines, __filename, __line, escapeFn);
    }

}