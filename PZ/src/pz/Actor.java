package pz;

import org.jbox2d.dynamics.Body;

public class Actor extends GameEntity{
    double movementSpeed;
    int armor;
    int maxArmor;
    boolean paralyzed;
    
    public Actor(Body body, int life, int maxLife, boolean destroyed, int id, String name, Effect coEffect, boolean visible, String grapics, String type, double movementSpeed, int armor, int maxArmor){        
        super(body, life, maxLife, destroyed, id, name, coEffect, visible, grapics, type);
        this.armor = armor;
        this.movementSpeed = movementSpeed;
        this.maxArmor = maxArmor;
    }
    
    public void move(){
        //TODO
    }
}
