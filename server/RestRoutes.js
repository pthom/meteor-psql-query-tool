Serve_ComboQuery = function(idQuery, paramId) {
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

    var queryResult  = PostgresWrapper.Query_WrapAsync(sql_query);
    return queryResult.rows;
}

ExportTags = function() {
    var tagsCursor = Queries.find({}, {tags:1, _id:0});
    var tags = [];
    tagsCursor.map( function(data)
        {
            var currentTags = data.tags;
            if (_.isString(currentTags)) {
                currentTags = currentTags.split(",");
            }

            if (_.isArray(currentTags)) {
                _.each(currentTags, function(tag) { tags.push(tag); });
            }
        }
    );
    tags.sort();
    tags = _.uniq(tags, true);
    return JSON.stringify(tags);
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
        var result = Serve_ComboQuery(idQuery, paramIdx);
        res.end( JSON.stringify(result) );
    },
    {where: 'server'});
