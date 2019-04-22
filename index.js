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
    
    var c_party;

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

        c_party = invitation.party;
        
        invitation.party.me.setBRCharacter('/Game/Athena/Items/Cosmetics/Characters/CID_029_Athena_Commando_F_Halloween.CID_029_Athena_Commando_F_Halloween');
        
        await invitation.accept();
        
        invitation.party.me.setBattlePass(true, level, xp,otherxp);

    });

    fortnite.communicator.on('friend:message', async data => {

        if(data.message == 'ping'){
              communicator.sendMessage(data.friend.id, 'pong');
        }
        
      var args = data.message.split(" ");
      if (args[0] == "!skin"){
          c_party.members.forEach(async member => {
              try{
                    member.clearEmote(member.jid);
                    member.setBRCharacter("/Game/Athena/Items/Cosmetics/Characters/" + args[1] + "." + args[1], member.jid);
                    member.clearEmote(member.jid);
              }catch(e){
                  communicator.sendMessage(data.friend.id, 'cant set skin because it is invalid skin!');
              }
          });
      }
      if (args[0] == "!emote"){
          c_party.members.forEach(async member => {
              try{
                    member.setEmote("/Game/Athena/Items/Cosmetics/Dances/" + args[1] + "." + args[1], member.jid);
              }catch(e){
                  communicator.sendMessage(data.friend.id, 'cant set emote because it is invalid emote!');
              }
          });
      }
      if (args[0] == "!backpack"){
          c_party.members.forEach(async member => {
              try{
                    member.setBackpack("/Game/Athena/Items/Cosmetics/Backpack/" + args[1] + "." + args[1], member.jid);
              }catch(e){
                  communicator.sendMessage(data.friend.id, 'cant set emote because it is invalid pickaxe!');
              }
          });
      }
      if(args[0] == "!stop"){
        c_party.members.forEach(async member => {
          member.clearEmote(member.jid);
        });
      }

    });

    /* rest of your code goes here */

})();
