game.EnemyWizard = me.Entity.extend({
    init: function(x, y, settings){
        this._super(me.Entity, 'init', [x, y, {
                image: "wizard",
                width: 64,
                height: 64,        
                spritewidth: "64",         
                spriteheight: "64",
                getShape: function(){
                    return (new me.Rect(0, 0, 64, 64)).toPolygon();
                }
        }]);
        this.health = 10;
        this.alwaysUpdate = true;
        this.attacking = false;
        this.lastAttacking = new Date().getTime();
        this.lastHit = new Date().getTime();
        this.now = new Date().getTime();
        this.body.setVelocity(3, 20);
        
        this.type = "EnemyWizard";
        
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
        this.renderable.addAnimation("attack", [208, 209, 210, 211, 212, 213], 80);
        this.renderable.setCurrentAnimation("walk");
        
    },
    
    loseHealth: function(damage){
        this.health = this.health - damage;
    },
    
    update: function(delta){
        if(this.health <= 0){
            me.game.world.removeChild(this);
        }
        
        this.now = new Date().getTime();
        
        this.body.vel.x -= this.body.accel.x * me.timer.tick;
        
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        
        this.body.update(delta); 
        
        
        
        
        this._super(me.Entity, "update", [delta]);
        
        return true;
    },
    
    collideHandler: function(response){
        if(response.b.type==='PlayerBase'){
            this.attacking=true;
            this.lastAttacking=this.now;
            this.body.vel.x = 0;
            this.pos.x = this.pos.x + 1;
            if((this.now-this.lastHit >=1000)){
                this.lastHit = this.now;
                response.b.loseHealth(game.data.enemyWizrdAttack);
            }
            
        }else if (response.b.type==='PlayerEntity'){
            var xdif = this.pos.x - response.b.pos.x;
        }else if (response.b.type==='TeamArcher'){
            var xdif = this.pos.x - response.b.pos.x;
            
            this.attacking=true;
            
           
            if(xdif>0){
            this.pos.x = this.pos.x + 1;
            this.body.vel.x = 0;
            }
            if((this.now-this.lastHit >=1000) && xdif>0){
                this.lastHit = this.now;
                response.b.loseHealth(game.data.enemyWizardAttack);
            }
        }
    }
});