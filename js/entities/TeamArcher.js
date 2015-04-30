game.TeamArcher = me.Entity.extend({
    init: function(x, y, settings){
        this._super(me.Entity, 'init', [x, y, {
                image: "archer",
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
        
        this.type = "TeamArcher";
        
        this.renderable.addAnimation("attack", [260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272], 80);
        this.renderable.addAnimation("walk", [143, 144, 145, 146, 147, 148, 149, 150, 151], 80);
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
        
        this.body.vel.x += this.body.accel.x * me.timer.tick;
        
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        
        this.body.update(delta); 
        
        
        
        
        this._super(me.Entity, "update", [delta]);
        
        return true;
    },
    
    collideHandler: function(response){
        if(response.b.type==='EnemyBaseEntity'){
            this.attacking=true;
            this.lastAttacking=this.now;
            this.body.vel.x = 0;
            this.pos.x = this.pos.x + 1;
            if((this.now-this.lastHit >=1000)){
                this.lastHit = this.now;
                response.b.loseHealth(game.data.teamArcherAttack);
            }
            
        }else if (response.b.type==='EnemyCreep'){
            var xdif = this.pos.x - response.b.pos.x;
        }else if(response.b.type==='EnemyWizard'){
            var xdif = this.pos.x - response.b.pos.x;
        }
    
            
            this.attacking=true;
            
           
            if(xdif>0){
            this.pos.x = this.pos.x + 1;
            this.body.vel.x = 0;
            }
            if((this.now-this.lastHit >=1000) && xdif>0){
                this.lastHit = this.now;
                response.b.loseHealth(game.data.teamArcherAttack);
            }
        }
    }
);