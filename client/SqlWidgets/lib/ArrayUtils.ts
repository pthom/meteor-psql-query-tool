//Monkey patching...
interface Array<T> {
    move(o:T, by:number) : Array<T>;
    moveUp(o: T, by?:number): Array<T>;
    moveDown(o: T, by?:number): Array<T>;
    removeByValue(o:T);
}

Array.prototype.move = function (value, by?) {
    var index = this.indexOf(value);
    var newPos = index + by;

    if (index === -1)
        throw new Error("Element not found in array");

    if (newPos < 0)
        newPos = 0;
    if (newPos >= this.length)
        newPos = this.length;

    this.splice(index, 1);
    this.splice(newPos, 0, value);
    return this;
}

Array.prototype.moveUp = function (value, by?) {
    this.move(value, - 1 * (by || 1));
    return this;
};

Array.prototype.moveDown = function (value, by?) {
    this.move(value, by || 1);
    return this;
};

Array.prototype.removeByValue = function(what) {
    var ax;
    while ((ax = this.indexOf(what)) !== -1) {
        this.splice(ax, 1);
    }
    return this;
};
