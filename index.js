const request = require("request-promise");
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
        
        invitation.party.me.setBattlePass(true, 99999999, 99999999, 99999999);

    });

    fortnite.communicator.on('friend:message', async data => {

        if(data.message == 'help'){
              communicator.sendMessage(data.friend.id, 'Commands: !skin, !emote, !backbling, !banner, !stop');
        }
        
      var args = data.message.split(" ");
      if(args[0] == "!skin") {
                c_party.members.forEach(async member => {
                    var cosmetic = args[1].substr(args[0], args[0].length);
                    try {
                        request({
                            uri: `https://api-public-service.battledash.co/fortnite/cosmetics/search?q=${cosmetic}`,
                            json: true
                        }).then(query => {
                            if(query.id){
                                member.setBRCharacter(`/Game/Athena/Items/Cosmetics/Characters/${query.id}.${query.id}`, member.jid);
                            }else{
                                communicator.sendMessage(data.friend.id, 'Cant set skin because it is invalid skin!');
                            }
                        });
                    } catch(e) {
                        console.log(e);
                    }
                });
            }
      if (args[0] == "!status"){
          
          var g_stt = '';
          
          for(var i = 1;i <= args.length;i++){
          g_stt += args[i];
          }
          
            fortnite.communicator.updateStatus(g_stt]);
            communicator.updateStatus(g_stt]);
      }
      if (args[0] == "!emote"){
           c_party.members.forEach(async member => {
             var cosmetic = args[1].substr(args[0], args[0].length);
                    try {
                        request({
                            uri: `https://api-public-service.battledash.co/fortnite/cosmetics/search?q=${cosmetic}`,
                            json: true
                        }).then(query => {
                            if(query.id){
                                 member.setEmote(`/Game/Athena/Items/Cosmetics/Dances/${query.id}.${query.id}`, member.jid);
                            }else{
                                communicator.sendMessage(data.friend.id, 'Cant set emote because it is emote skin!');
                            }
                        });
                    } catch(e) {
                        console.log(e);
                    }
                })
            }
     
      if (args[0] == "!backbling"){
          c_party.members.forEach(async member => {
              try{
                    member.setBackpack("/Game/Athena/Items/Cosmetics/Backpacks/" + args[1] + "." + args[1], member.jid);
              }catch(e){
                  communicator.sendMessage(data.friend.id, 'Cant set backbling because it is invalid backbling!');
              }
          });
      }
     
      if (args[0] == "!banner"){
          args = data.message.split(" ").toUpperCase;
          c_party.members.forEach(async member => {
              try{
                    member.setBRBanner(args[1], args[2], 99999999, member.jid);
              }catch(e){
                  communicator.sendMessage(data.friend.id, 'Cant set banner because it is invalid banner!');
              }
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
     
      if(args[0] == "!stop"){
        c_party.members.forEach(async member => {
          member.clearEmote(member.jid);
        });
      }
 
    });

    /* rest of your code goes here */

})();
