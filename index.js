const EGClient = require('epicgames-client').Client;
const Fortnite = require('epicgames-fortnite-client');
const EInputType  = require('epicgames-client').EInputType;

var _ = require('lodash');

accountid = 'your bot accountID';
status = 'status you want';

let eg = new EGClient({
    email: 'email',
    password: 'password',
    debug: console.log
});

(async _ => {

    if(!await eg.init() || !await eg.login())
        throw 'Cannot connect to Epic Games servers...';
    
    let communicator = eg.communicator;
    let fortnite = await eg.runGame(Fortnite);
    
    communicator.updateStatus(status);

    communicator.on('friend:request', async data => {
        if(data.friend.id != accountid){
            eg.acceptFriendRequest(data.friend.id).then(async (ac_result) => {
                /*adding friend ops was seccessful*/
            });
        }
    });

    fortnite.communicator.on('party:invitation', async invitation => {

        invitation.party.me.setBRCharacter('/Game/Athena/Items/Cosmetics/Characters/CID_029_Athena_Commando_F_Halloween.CID_029_Athena_Commando_F_Halloween');
        
        await invitation.accept();
        
        invitation.party.me.setBattlePass(true, level, xp,otherxp);

    });

    fortnite.communicator.on('friend:message', async data => {

        if(data.message == 'ping'){
              communicator.sendMessage(data.friend.id, 'pong');
        }

    });

/* rest of your code goes here */

})();
