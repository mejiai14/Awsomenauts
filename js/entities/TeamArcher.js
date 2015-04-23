game.TeamArcher = me.Entity.extend({
    init: function(x, y, settings){
        this._super(me.Entity, 'init', [x, y, {
                image: "archer",
                width: 32,
                height: 64,        
                spritewidth: "32",         
                spriteheight: "64",
                getShape: function(){
                    return (new me.Rect(0, 0, 32, 64)).toPolygon();
                }
        }]);
        this.health = 10;
        this.alwaysUpdate = true;
        this.attacking = false;
        this.lastAttacking = new Date().getTime();
        this.lastHit = new Date().getTime();
        this.now = new Date().getTime();
        this.body.setVelocity(3, 20);
        
        this.type = "archer";
        
        this.renderable.addAnimation("walk", [3, 4, 5], 80);
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
        if(response.b.type==='EnemyBaseEntity'){
        this.collideWithEnemyBase(response);
        }else if(response.b.type==='EnemyCreep'){
            this.collideWithEnemyCreep(response);
        }
    },
    
    collideWithEnemyBase: function(response){
        var ydif = this.pos.y - response.b.pos.y;
        var xdif = this.pos.x - response.b.pos.x;
        
        if(ydif<-40 && xdif<70 && xdif>-35){
                this.body.falling = false;
        }        
        else if(xdif>-35 && this.facing === 'right' && (xdif<0)){
            this.body.vel.x = 0;
            this.pos.x = this.pos.x -1;
        }else if(xdif<70 && this.facing==='left'&& xdif>0){
            this.body.vel.x = 0;
            }
            
            if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer){  
                this.lastHit = this.now;
                response.b.loseHealth(game.data.playerAttack);
            }
    },
    
    collideWithEnemyCreep: function(response){
        
            var xdif = this.pos.x - response.b.pos.x;
            var ydif = this.pos.y - response.b.pos.y;
            
            this.stopMovement(xdif);
            
            if(this.checkAttack(xdif, ydif)){
                this.hitCreep(response);
            };
    },
    
    hitCreep: function(response){
            if(response.b.health <= game.data.playerAttack){
                
                }                
                
                response.b.loseHealth(game.data.playerAttack);
    }
});