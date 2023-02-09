/**
 * Web Atelier 2020  Exercise 8 - Single-Page Web Applications with Fetch and Client-side Views
 *
 * Student: Carlo Bettelini
 *
 * Client-side scripts
 *
 */


function init() {

    let delay = 5000;
    let obj = new SocketEvents(delay);

    let search = document.getElementById("search");
    search.innerHTML = "";

    let gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

    let upload = document.getElementById("upload");
    upload.innerHTML = "";

    let edit = document.querySelectorAll("#edit");
    edit.innerHTML = "";

    obj.renderHTML();

    // This way, slideshow is not resetted each time the page
    // needs to be refreshed.
    obj.renderSlideshow();

    gallery.addEventListener("default", refresh);
    gallery.addEventListener("gallery_change", refresh);

    obj.socketEvents();

    function refresh(event) {

        console.log("Refreshing...");

        obj.renderHTML();

    }
}


class Render {
    constructor(delay) {
        this.interval;
        this.index = 0;
        this.current_image;
        this.delay = delay;
    }

    renderHTML() {

        this.render_gallery();
        this.render_upload();
        this.renderSearch();

        let edit = document.querySelectorAll("#edit");
        edit.innerHTML = "";
    }

    async render_gallery() {

        await fetch("/pictures").then(result => result.text()).then(body => {

            let gallery = document.getElementById("gallery");

            gallery.innerHTML = body;
        });

        this.setupEventsGallery();
    }

    async render_upload() {

        await fetch("/pictures/upload").then(result => result.text()).then(body => {

            let upload = document.getElementById("upload");
            upload.innerHTML = body;
        });

        this.setupEventsUpload();
    }

    async render_edit(id) {
        let edit;

        await fetch("/pictures/" + id + "/edit?" + new URLSearchParams({ filter: "none" }))
            .then(result => result.text()).then(body => {

                // We use id="id" inside the brackets because
                // we need to use an attribute of figure to access the element.
                edit = document.querySelector(`figure[id="${id}"] > section.edit`);
                edit.innerHTML = body;

            });

        this.setupEventsEdit(edit, id);
    }

    async render_filters(id) {

        let curr_image = document.querySelector(`figure[id="${id}"] img`);
        let edit = document.querySelector(`figure[id="${id}"] > section.edit`);
        let curr_filter = curr_image.style.cssText;

        await fetch("/pictures/" + id + "/filters?" + new URLSearchParams({ filter: curr_filter }))
            .then(result => result.text()).then(body => {
                edit.innerHTML = body;
            });

        this.setupEventsFilters(curr_image, id, edit);
    }

    renderSearch() {

        let html = ejs.views_search();
        let search = document.getElementById("search");

        search.innerHTML = html;

        this.setupEventsSearch();

    }

    renderSearchResults(value, result) {
        let output = {
            title: "Results",
            search: value,
            list: result
        };

        // Transforms output into html using the client-side view.
        let html = ejs.views_pictures(output);

        let gallery = document.getElementById('gallery');
        gallery.innerHTML = html;

        this.setupEventsGallery();
    }

    renderSlideshow() {

        this.slideshowStop();

        this.slideshowRender(this.index);

        this.slideshowStart();
    }
}

class Events extends Render {

    constructor(delay) {
        super(delay);
    }

    slideshowStart() {
        this.interval = setInterval(() => {
            this.slideshowRender(this.index);
        }, this.delay);
    }

    slideshowStop() {
        clearInterval(this.interval);
    }

    slideshowRender(index, text = "") {

        API.slideshowRender(index).then(result => {

            if (result) {
                let output = {
                    title: result.title,
                    current_image: result.current_image,
                    message: text
                };

                // Transforms output into html using the client-side view.
                let html = ejs.views_slideshow(output);

                let slideshow = document.getElementById('slideshow');
                slideshow.innerHTML = html;

                this.index = result.index;
                this.current_image = result.current_image;

                this.setupEventsSlideshow();
            }

        }, err => {
            console.log(err);
        });
    }

    setupEventsSlideshow() {

        let start = document.querySelector("form.start");
        start.addEventListener('click', (event) => {
            event.preventDefault();

            let id = event.path[3].id;

            API.slideshowEvent(id, false).then(result => {
                this.index = result;

                this.slideshowRender(this.index);
                this.slideshowStart();
            });

        });

        let stop = document.querySelector("form.stop");
        stop.addEventListener('click', (event) => {
            event.preventDefault();

            this.slideshowStop();

            // Corrects the automatic index increments from the server.
            this.index -= 1;
            this.slideshowRender(this.index, "The slideshow is stopped.");

        });
    }

    setupEventsGallery() {
        let edit, id, editSections, image;
        let images = document.querySelectorAll("img");
        images.forEach(figure => {

            figure.addEventListener('click', event => {
                id = figure.parentNode.id;

                edit = document.querySelector(`figure[id="${id}"] > section.edit`);

                editSections = document.querySelectorAll("section.edit");
                editSections.forEach((section) => {

                    if (section != edit)
                        section.innerHTML = "";
                });

                this.selectImage(figure);
                if (edit.innerHTML == "")
                    this.render_edit(id);
                else {
                    this.unselectImage(figure);
                    edit.innerHTML = "";
                }
            });
        });

        let edit_buttons = document.querySelectorAll("form.edit");
        edit_buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                let editSections = document.querySelectorAll("section.edit");
                editSections.forEach((section) => {
                    section.innerHTML = "";
                });

                id = e.path[3].id;

                image = document.querySelector(`figure[id="${id}"] img`);
                this.selectImage(image);

                this.render_filters(id);
            });
        });

        let duplicate_buttons = document.querySelectorAll("form.duplicate");
        duplicate_buttons.forEach(button => {
            button.addEventListener("click", (event) => {
                event.preventDefault();

                id = event.path[3].id;
                let form = event.path[1];
                let body = new FormData(form);

                fetch("/pictures", { headers: { "Accept": "application/json" }, method: "POST", body }).then(res => {
                    console.log(res.status);

                    let gallery = document.getElementById("gallery");

                    const event_change = new CustomEvent("gallery_change");
                    gallery.dispatchEvent(event_change);
                });
            });
        });

        let delete_buttons = document.querySelectorAll("form.delete");
        delete_buttons.forEach(button => {
            button.addEventListener("click", (event) => {
                event.preventDefault();

                id = event.path[3].id;

                fetch("/pictures/" + id + "?form=delete", { method: "DELETE", headers: { "Accept": "application/json" } }).then(res => {
                    console.log(res.status);

                    let gallery = document.getElementById("gallery");

                    const event_change = new CustomEvent("gallery_change");
                    gallery.dispatchEvent(event_change);
                });
            });
        });

        let show_buttons = document.querySelectorAll("form.slideshow");
        show_buttons.forEach(button => {
            button.addEventListener("click", (event) => {

                event.preventDefault();

                id = event.path[3].id;

                API.slideshowEvent(id, true);
            });
        });
    }

    setupEventsUpload() {

        let form = upload.querySelector("form");
        form.addEventListener("submit", (event) => {
            // Stop browser from submitting form and reloading page
            event.preventDefault();

            // Prepare body of request from the content of the form
            let body = new FormData(form);

            // Send HTTP POST /users with form in the body
            fetch("/pictures", { headers: { "Accept": "application/json" }, method: "POST", body }).then(res => {
                console.log(res.status);

                let gallery = document.getElementById("gallery");

                const event_change = new CustomEvent("gallery_change");
                gallery.dispatchEvent(event_change);
            });
        });
    }

    setupEventsEdit(edit, id) {

        let edit_form = edit.querySelector("form.edit");
        edit_form.addEventListener("submit", (event) => {
            event.preventDefault();

            fetch("/pictures/" + id, { method: "PUT", headers: { "Accept": "application/json" }, body: new FormData(edit_form) }).then(res => {
                console.log(res.status);

                let image = document.querySelector(`div[id="${id}"] > img`);

                this.unselectImage(image);

                let gallery = document.getElementById("gallery");

                const event_change = new CustomEvent("gallery_change");
                gallery.dispatchEvent(event_change);
            });
        });

        let back_form = edit.querySelector("form.back");
        back_form.addEventListener("submit", (event) => {
            event.preventDefault();

            let image = document.querySelector(`div[id="${id}"] > img`);

            this.unselectImage(image);

            let gallery = document.getElementById("gallery");

            const event_change = new CustomEvent("default");
            gallery.dispatchEvent(event_change);
        });
    }

    setupEventsFilters(curr_image, id, edit) {

        let temp_filter;
        let images = edit.querySelectorAll("#filtered-image img");

        images.forEach(image => {

            image.addEventListener('click', (event) => {

                let id_filter = event.path[1].id;

                temp_filter = event.target.style.cssText;

                let image = document.querySelector(`div[id="${id_filter}"] > img`);

                this.selectImage(image);

                let style = image.getAttribute("style");

                curr_image.setAttribute("style", style);

            });
        });

        let save_form = edit.querySelector("form.save");
        save_form.addEventListener("submit", (event) => {

            event.preventDefault();

            save_form.childNodes[1].innerHTML += `<input type="hidden" name="filter" value="${temp_filter}"></input>`;

            fetch("/pictures/" + id + "?form=save", { method: "PUT", headers: { "Accept": "application/json" }, body: new FormData(save_form) }).then(res => {
                console.log(res.status);

                let gallery = document.getElementById("gallery");

                const event_change = new CustomEvent("gallery_change", { detail: { temp_filter } });
                gallery.dispatchEvent(event_change);
            });
        });

        let back_form = edit.querySelector("form.back");
        back_form.addEventListener("submit", (event) => {
            event.preventDefault();

            let gallery = document.getElementById("gallery");

            const event_change = new CustomEvent("default");
            gallery.dispatchEvent(event_change);
        });
    }

    setupEventsSearch() {

        let input = document.querySelector("input[name='search']");

        input.addEventListener('input', (e) => {

            API.search(input.value).then(result => {
                this.renderSearchResults(input.value, result);
            });
        });

        let form = document.querySelector("form.search");

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            API.search(input.value).then(result => {

                this.renderSearchResults(input.value, result);

                input.value = "";
            });
        });
    }
}

class Selection extends Events {
    constructor(delay) {
        super(delay);
    }

    selectImage(image) {

        let images = this.getSelection();

        images.forEach((image) => {
            this.unselectImage(image);
        });

        let div = image.parentNode;

        let style = image.getAttribute("style");
        // let src = image.getAttribute("src");
        let new_style = style ? style.split(";")[0] + "; opacity: 0.5" : "filter: none; opacity: 0.5"

        image.setAttribute("style", new_style);

        div.classList.add("selected");

    }

    unselectImage(image) {

        let div = image.parentNode;
        let style = image.getAttribute("style");
        let src = image.getAttribute("src");
        let new_style = style.split(";")[0] + "; opacity: 1";

        image.setAttribute("style", new_style);

        div.classList.remove("selected");

    }

    getSelection() {
        let images = document.querySelectorAll('.selected > img');

        return images;
    }
}

class SocketEvents extends Selection {
    constructor(delay) {
        super(delay);
    }

    socketEvents() {

        let socket = io();

        socket.on("connect", () => {
            console.log("Browser connected!");
            this.startSocket({ text: `<img src="http://localhost:4000/logos/socket.png" class="images-info">`, area: "socket" });
        });

        socket.on("disconnect", () => {
            console.log("Browser disconnected!");
            this.startSocket({ text: "", area: "socket" });

            let gallery = document.getElementById("gallery");

            const event_change = new CustomEvent("gallery-change");
            gallery.dispatchEvent(event_change);
        });

        socket.on('picture.created', (picture) => {
            console.log("Created image", picture.filename);

            let gallery = document.getElementById("gallery");

            const event_change = new CustomEvent("gallery_change");
            gallery.dispatchEvent(event_change);
        })

        socket.on('picture.updated', (picture) => {
            console.log("Updated image", picture.filename);

            let gallery = document.getElementById("gallery");

            const event_change = new CustomEvent("gallery_change");
            gallery.dispatchEvent(event_change);

        })

        socket.on('picture.deleted', (picture) => {

            console.log("Deleted image", picture.filename);

            if (picture.filename == this.current_image.filename)
                this.slideshowAdvance();

            let gallery = document.getElementById("gallery");

            const event_change = new CustomEvent("gallery_change");
            gallery.dispatchEvent(event_change);
        });

        socket.on('slideshow', (index) => {

            this.slideshowStop();

            this.slideshowRender(index, "Someone showed the following image:");
        })
    }

    startSocket(object) {

        let area = document.getElementById(object.area);
        area.innerHTML = object.text;
    }
}

API = function() {
    // Private function

    function search(q) {

        return fetch("/pictures?search=" + q, { headers: { "Accept": "application/json" } }).then(res => {

            console.log(res.status);

            return res.json();

        })
    }

    function slideshowRender(index) {

        return fetch('/pictures/slideshow?' + new URLSearchParams({ index: index }), { headers: { "Accept": "application/json" } }).then(res => {

            console.log(res.status);

            return res.json();

        })
    }

    function slideshowEvent(id, status) {
        return fetch('/pictures/' + id + "/slideshow?" + new URLSearchParams({ stop: status }))
            .then(res => {
                console.log(res.status);

                return res.json();
            })
    }

    return {
        search,
        slideshowRender,
        slideshowEvent
    }
}()