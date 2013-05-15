package pz;

import org.jbox2d.dynamics.Body;

public class Player extends Actor {

        Team team;
    String characterClass;
    boolean observer;
    boolean inMenu;
    boolean owner;
    String[] chatMessageStack;
    PlayerStatistics stats;

    public Player(Body body, int life, int maxLife, boolean destroyed, int id, String name, Effect coEffect, boolean visible, String grapics, String type,Team team, String charClass, String[] chatStack, double movementSpeed, int armor, int maxArmor) {
        super(body, life, maxLife, destroyed, id, name, coEffect, visible, grapics, type, movementSpeed, maxArmor, armor);
        this.team = team;
        this.characterClass = charClass;
        this.observer = true;
        this.inMenu = true;
        this.owner = false;//To nie jest pewne
        this.chatMessageStack = chatStack;
        this.stats = new PlayerStatistics();//Tworzy nowa statystyke, ktora jest wyzerowana
    }

    public void changeObserverStatus() {
        if(this.observer==true){
            this.observer=false;
        }
        else{
            this.observer=true;
        }
    }
    public void changeInMenuStatus() {
        if(this.inMenu==true){
            this.inMenu=false;
        }
        else{
            this.inMenu=true;
        }
    }
    public void changeOwnerStatus(){
        if(this.owner==true){
            this.owner=false;
        }
        else{
            this.observer=true;
        }
    }
}
