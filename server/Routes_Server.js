ComboQuery = function(idQuery, paramIdx) {
    var result = [{supplierid:123243, value:"blah"}];
    return JSON.stringify(result);
}

Router.route('/tags',
    function () {
        var req = this.request;
        var res = this.response;
        res.end(ExportTags());
    },
    {where: 'server'});

Router.route('/ComboQuery/:idQuery/:paramIdx',
    function() {
        var params = this.params;
        var idQuery = params.idQuery;
        var paramIdx = params.paramIdx;

        var req = this.request;
        var res = this.response;
        var result = ComboQuery(idQuery, paramIdx);
        res.end( result );
    },
    {where: 'server'});
