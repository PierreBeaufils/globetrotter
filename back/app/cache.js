const redis = require('redis');

// on en profite pour appliquer les bonnes pratiques
const client = redis.createClient();

// on matérialise une fonction pour pouvoir en changer la formule si besoin
const buildKey = (url, params) => {
    // pour l'instant, on fait simple
    return JSON.stringify({url, params});
}

// on va conserver les clés pour savoir quoi supprimer au flush
// parce que flushall, c'est pratique, mais ça fait pas de détails :-D
// si plusieurs applications utilisent un même serveur Redis pour leur cache, on va tout supprimer ><
// no panic, il existe aussi une méthode del à laquelle on peut passer un array de clés :-)
const theKeys = [];

// les actions de mise en cache et d'invalidation vont prendre la forme de middlewares ! B-)

// celui-ci va permettre de mettre en cache la ressource si elle n'y est pas déjà
// si elle y est déjà, il va répondre à la place du MW "normal" (celui du controller, qui ne sera même pas contacté)
const cache = (request, response, next) => {
    // on va concrétiser le principe d'idempotence : plusieurs requêtes GET sur la même url (donc avec les mêmes params) donneront le même résultat
    const theKey = buildKey(request.originalUrl, request.params);

    console.log('theKey', theKey);

    theKeys.push(theKey);

    console.log('theKeys', theKeys);
    
    // pas de Promise pour l'instant dans redis, mais c'est pas bien grave
    // on utilise les bons vieux callbacks avec leur premier paramètre err et le résultat en 2e param
    // 1. vérifier si la clé existe
    client.exists(theKey, (_, itExists) => {

        // si elle existe
        if (itExists) {
            
            // 2. on va la récupérer et répondre à la place du MW suivant, qui ne sera jamais appelé
            client.get(theKey, (_, theResponse) => {
                response.json(JSON.parse(theResponse));
            });

            // car pas de next

        // si elle n'existe pas
        } else {

            // on copie la méthode utilisée pour envoyer la réponse
            // ouais, on est comme ça

            // plus sérieusement, le fait de copier une fonction entraîne une perte du contexte
            // (si la fonction fait appel à this, il ne désignera plus rien)
            // c'est pour ça qu'on appelle bind derrière, qui permet de redéfinir le this de la fonction
            const sendJson = response.json.bind(response);

            // et l'idée, c'est de remplacer la méthode existante par une méthode qui...
            response.json = (theResponse) => {
                // 2b. écrit la réponse dans le cache
                client.setex(
                    theKey,
                    process.env.REDIS_EXPIRY || 30, // expiration au bout de 30 secondes pour garder de l'info "fraîche"
                    JSON.stringify(theResponse),
                    // et répond à la requête
                    _ => sendJson(theResponse)
                );
            }

            // mais rien de tout ceci n'est exécuté, on a juste placé une version modifiée de la méthode json() dans l'objet response
            // on laisse le MW qui compose la réponse s'exécuter normalement

            // en clair, le controller va appeler `res.json` sans se rendre compte que ce n'est plus la méthode normale d'Express mais notre mouture qui stocke l'info dans le cache au passage
            next();
        }
    });
};

const flush = (request, response, next) => {
    // on colle toujours au principe d'idempotence finalement
    // => une requête POST/PATCH/PUT n'étant pas idempotente, elle va impliquer une modification de l'état du serveur
    // donc les GET suivants ne retourneront plus le même résultat


    // pour supprimer uniquement les clés concernées, on va les sauvegarder à la création (cf. fonction cache)
    client.del(theKeys, _ => {
        // une fois la suppression effectuée, on vide le tableau
        // mais on ne peut pas juste réaffecter un nouveau tableau littéral (car const)
        // après enquête, la méthode la plus simple et la plus rapide pour vider un tableau est de forcer sa longueur à 0
        // À CONDITION QU'IL NE CONTIENNE PAS DE RÉFÉRENCES (sinon elles persisteront en mémoire)
        theKeys.length = 0;

        next();
    });

    // on pourrait placer le next ici aussi, car del n'échoue jamais
    // mais on s'exposerait potentiellement à une condition de concurrence
    // où les requêtes suivantes pourraient accéder à des infos pas encore supprimées
}

module.exports = { cache, flush };