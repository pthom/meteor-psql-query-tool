class IdProvider {
    guid:string;

    constructor(guid?:string) {
        var uuid:string;
        if (guid)
            uuid = guid;
        else {
            var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
        }
        this.guid = uuid;
    }

    Id(name:string) {
        return name + "-" + this.guid;
    }

    RawId() {
        return this.guid;
    }
}

