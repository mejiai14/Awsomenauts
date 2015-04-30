game.HeroDeathManager = Object.extend({
    init: function(x, y, settings){
        this.alwaysUpdate = true;
    },
    
    update: function(){
        //Updates when player dies, respawns the player, & keeps track of player
        if(game.data.player.dead){
            me.game.world.removeChild(game.data.player);
            me.state.current().resetPlayer(10, 0);
            me.game.world.removeChild(game.data.miniPlayer);
        }
        
        return true;
    }
});
