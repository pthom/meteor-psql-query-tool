ComboQuery = function(idQuery, paramId) {
    var query = Queries.findOne({_id:idQuery});
    if ( ! query )
        return [];

    var comboParam = null;
    for (var i = 0; i < query.params.length; i++) {
        var param = query.params[i];
        if (param._id == paramId) {
            comboParam = param;
        }
    }
    if (comboParam == null)
        return [];

    var sql_query = comboParam.ComboQuery;
    console.log("ComboQuery=" + sql_query);

    var queryResult  = pg_query_wrapAsync(sql_query);
    console.log("queryResult.rows=" + JSON.stringify(queryResult.rows));

    //var result = [{supplierid:123243, value:"blah"}];
    return queryResult.rows;
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
        res.end( JSON.stringify(result) );
    },
    {where: 'server'});
