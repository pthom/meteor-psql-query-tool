Router.route('/tags',
    function () {
        var req = this.request;
        var res = this.response;
        res.end(ExportTags());
    },
    {where: 'server'});
