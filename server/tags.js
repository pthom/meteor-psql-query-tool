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