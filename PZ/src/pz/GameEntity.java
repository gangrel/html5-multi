package pz;

import org.jbox2d.dynamics.Body;
import org.jbox2d.dynamics.World;

public class GameEntity {
    Body body;
    int life;
    int maxLife;
    boolean destroyed; //po co?
    int id;
    World parentWorld;
    String name;
    Effect collisionReaction;//czy potrzebne?
    boolean visible;
    String grapics;
    String type;
    
    public GameEntity(Body body, int life, int maxLife, boolean destroyed, int id, String name, Effect coEffect, boolean visible, String grapics, String type){
        this.body = body;
        this.life = life;
        this.maxLife = maxLife;
        this.destroyed = destroyed;
        this.id = id;
        this.name = name;
        this.collisionReaction = coEffect;
        this.visible = visible;
        this.grapics = grapics;
        this.type = type;
    }
    
    public void uptadeState(int delta){//??
        //TODO
    }
    public void setLife(int lifeChanger){
        if(this.life + lifeChanger >= 0 && this.life + lifeChanger <= this.maxLife){
            this.life+=lifeChanger;
        }
        if (this.life==0){
            this.ObjectisDead();
        }
    }
    public void ObjectisDead(){
        //TODO
    }
    public int returnLife(){
        return this.life;
    }
    public int returnMaxLife(){
        return this.maxLife;
    }
    public int returnID(){
        return this.id;
    }
    public String returnName(){
        return this.name;
    }
}
