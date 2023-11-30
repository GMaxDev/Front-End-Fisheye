export class MediasPhotographers {
    constructor(data) {
        this._id = data.media.id;
        this._photographersId = data.media.photographersId;
        this._title = data.media.title;
        this._image = data.media.image;
        this._video = data.media.video;
        this._likes = parseInt(data.media.likes);
        this._isLiked = false;
        this._date = data.media.date;
        this._price = data.media.price;
    }

    get id() {
        return this._id;
    }

    get photographersId() {
        return this._photographersId;
    }

    get title() {
        return this._title;
    }

    get image() {
        return this._image;
    }

    get video() {
        return this._video;
    }

    get date() {
        return this._date;
    }

    get price() {
        return this._price;
    }

    get likes() {
        return this._likes;
    }

    get isLiked() {
        return this._isLiked;
    }

    #incrementLikes() {
        this._likes++;
    }

    #decrementLikes() {
        this._likes--;
    }

    toggleLike() {
        this._isLiked ? this.#decrementLikes() : this.#incrementLikes();
        this._isLiked = !this._isLiked;
    }
}
