const EGClient = require('epicgames-client').Client;
const Fortnite = require('epicgames-fortnite-client');
const EInputType  = require('epicgames-client').EInputType;

var _ = require('lodash');


accountid = '';
status = 'BOT | Welcome to Freedom';

let eg = new EGClient({
    email: '',
  password: ''
});

(async _ => {

    var c_party;

    if(!await eg.init() || !await eg.login())
        throw 'Cannot connect to Epic Games servers...';

    let communicator = eg.communicator;
    let fortnite = await eg.runGame(Fortnite);

    communicator.updateStatus(status);

    fortnite.communicator.on('party:invitation', async invitation => {

        c_party = invitation.party;

        invitation.party.me.setBRCharacter('/Game/Athena/Items/Cosmetics/Characters/CID_313_Athena_Commando_M_KpopFashion.CID_313_Athena_Commando_M_KpopFashion');
		    invitation.party.me.setBackpack("/Game/Athena/Items/Cosmetics/Backpacks/BID_138_Celestial.BID_138_Celestial");

        await invitation.accept();

        invitation.party.me.setBattlePass(true, 99999999, 99999999, 99999999);

    });

    communicator.on('friend:request', async data => {
        if(data.friend.id != accountid){
            eg.acceptFriendRequest(data.friend.id).then(async (ac_result) => {
                /*adding friend ops was seccessful*/
            });
        }
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

	  if (args[0] == "!backbling"){
          c_party.members.forEach(async member => {
              try{
                    member.setBackpack("/Game/Athena/Items/Cosmetics/Backpacks/" + args[1] + "." + args[1], member.jid);
              }catch(e){
                  communicator.sendMessage(data.friend.id, 'cant set backbling because it is invalid backbling!');
              }
          });
      }

    if (args[0] == "!status"){
        var mess = data.message.replace("!status", "");
        fortnite.communicator.updateStatus(mess);
}

	  if (args[0] == "!banner"){
          c_party.members.forEach(async member => {
              try{
                    member.setBRBanner(args[1], args[2], 99999999, member.jid);
              }catch(e){
                  communicator.sendMessage(data.friend.id, 'cant set banner because it is invalid banner!');
              }
          });
      }

      if(args[0] == "!stop"){
        c_party.members.forEach(async member => {
          member.clearEmote(member.jid);
        });
      }

      if(args[0] == "!ready"){
                if(args[1] == "on" || args[1] == "off") {
                   c_party.members.forEach(async member => {
                    try{
                          member.setReady(args[1] == "on" ? true : false, member.jid);
                    }catch(e){
                        communicator.sendMessage(data.friend.id, 'Cant set ready because it is unknown error!');
                    }
                   });
                }else{
                    communicator.sendMessage(data.friend.id, 'Cant set ready because it is invalid swtich!');
                }
      }

    });

    /* rest of your code goes here */

})();
