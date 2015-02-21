/*
//Fiber = Npm.require('fibers');

T.post( 'someurl',
        Meteor.bindEnvironment(
            function (err, res) {
                // do stuff
                // can access Meteor.userId
                // still have MongoDB write fence
                },
            function () { console.log('Failed to bind environment'); }
        )
    );
*/
Meteor.methods({
    addQuery: function() {
        Queries.insert({
            name: "New Query",
            query: "",
        });
    },
    deleteQuery: function(id) {
        Queries.remove(id);
    },
    saveQuery: function(id, name, query) {
        Queries.update(id, {
            $set: {
                name: name,
                query: query
            }
        });
    },

    //this will update the Meteor|Mongo.Collection PsqlResult
    runPostgresqlQuery: function(sql_query) {
        var do_it = function() {
            console.log("About to run query:" + sql_query);

            //Enter here your connection info
            var connectionString = "postgres://pascal:asedr@192.168.1.15/northwind";

            pg.connect(connectionString, function(err, psql_client, done) {
                if (err) {
                    console.log("Error during connection : " + err);
                    return;
                }

                psql_client.query(sql_query, function(err, result) {
                    if (err) {
                        // An error occurred, remove the client from the connection pool.
                        done(psql_client);
                        return;
                    }

                    //Empty the PsqlResults collection
                    PsqlResults.remove({});
                    result.rows.forEach( function(item) {
                        PsqlResults.insert(item);
                        console.log("psqlresults insert: " + JSON.stringify(item));
                    });

                    var aux = PsqlResults.findOne();
                    console.log("findOne gives " + JSON.stringify(aux));

                    done();

                });

            });

        };

        bound_do_it = Meteor.bindEnvironment(do_it, function(err) {
            if (err) {
                console.log("error binding?");
                console.log(err);
            }
        });
        bound_do_it();

    }
});
