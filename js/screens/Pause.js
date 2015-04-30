game.Pause = Object.extend({
    init: function(x, y, settings){
        this.now = new Date().getTime();
        this.paused = false;
        this.alwaysUpdate = true;
        this.updateWhenPaused = true;
        this.pausing = false;
    },
    
    update: function(){
        this.now = new Date().getTime();
        
        if(me.input.isKeyPressed("Pause")){
            this.lastPause = this.now;
            if(!this.pausing){
                this.startPausing();
            }else{
                this.stopPausing();
            }
        }
        
        return true;
    },
    startPausing: function(){
        this.pausing = true;
        me.state.pause(me.state.PLAY);
        game.data.pausePos = me.game.viewport.localToWorld(0, 0);
        game.data.pausescreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage("pause-screen"));
        game.data.pausescreen.updateWhenPaused = true;
        game.data.pausescreen.setOpacity(0.8);
        me.game.world.addChild(game.data.pausescreen, 34);
        game.data.player.body.setVelocity(0, 0);
    },
    
    stopPausing: function(){
        this.pausing = false;
        me.state.resume(me.state.PLAY);
        me.game.world.removeChild(game.data.pausescreen);
        game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20);
    }
});


