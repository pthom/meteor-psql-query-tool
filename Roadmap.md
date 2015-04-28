#TODO


Routage par tags

prepared queries ou sql escape
var query = client.query({
      text: 'select * from X where name = $1',
      values: ['hi']
    });

Securité
*********
Client.prototype.escapeLiteral

==> on peut faire un escape cote client, mais comment s'assurer que ce ne soit pas hacké par les users ...
  A mettre côté server
    Pire, c'est en fait la méthode Meteor.Method runPostgresqlQuery qui est dangereuse...
    A remplacer par une Meteor.Methode callQuery(queryId, params) ?...?...????



widget list : fixed / select / autocomplete
Option tolower sur widget text
limiter taille des colonnes

Virer route crud

Pas donner log erreur sql dans boites dialogue
skin small


connect db ivs
install sur webtest-neo


Pivot
  http://nnajm.github.io/orb/



traineq
  ssh-agent
  install
