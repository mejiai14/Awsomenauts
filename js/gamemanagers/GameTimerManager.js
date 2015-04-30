game.GameTimerManager = Object.extend({
    init: function(x, y, settings){
        this.now = new Date().getTime();
        this.lastcreep = new Date().getTime();
        this.lastwizard = new Date().getTime();
        this.lastarcher = new Date().getTime();
        this.paused = false;
        this.alwaysUpdate = true;
    },
    
    update: function(){
        this.now = new Date().getTime();
        this.goldTimerCheck();
        this.creepTimerCheck(); 
        this.wizardTimerCheck();
        this.archerTimerCheck();
        
        return true;
    },
    
    goldTimerCheck: function(){
        if(Math.round(this.now/1000)%20 ===0 && (this.now - this.lastcreep >=1000)){
            game.data.gold += (game.data.exp1+1);
            console.log("Current gold:"  + game.data.gold);
        }
        
        if(Math.round(this.now/1000)%20 ===0 && (this.now - this.lastwizard >=1000)){
            game.data.gold += (game.data.exp1+1);
            console.log("Current gold:"  + game.data.gold);
        }
        
        if(Math.round(this.now/1000)%20 ===0 && (this.now - this.lastarcher >=1000)){
            game.data.gold += (game.data.exp1+1);
            console.log("Current gold:"  + game.data.gold);
        }
    },
    
    creepTimerCheck: function(){
        
    if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastcreep >=1000)){
            this.lastcreep = this.now;
            var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
            me.game.world.addChild(creepe, 5);
                
        } 
    },
    
    wizardTimerCheck: function(){
        if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastwizard >=1000)){
            this.lastwizard = this.now;
        var wizard = me.pool.pull("wizard", 1000, 0, {});
            me.game.world.addChild(wizard, 5);
        }
    },
    
    archerTimerCheck: function(){
        if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastarcher >=1000)){
            this.lastarcher = this.now;
        var archer = me.pool.pull("archer", 10, 0, {});
            me.game.world.addChild(archer, 5);
        }
    }
    });
