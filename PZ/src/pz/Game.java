package pz;

import java.util.ArrayList;
import java.util.List;
import org.jbox2d.dynamics.World;
import org.jbox2d.dynamics.Body;
import org.jbox2d.dynamics.BodyDef;
import org.jbox2d.common.Vec2;
import org.jbox2d.collision.PolygonDef;
import org.jbox2d.collision.PolygonShape;
import java.util.Random;
import org.jbox2d.collision.AABB;

public class Game {

    World physicWorld;
    Player[] players;
    Team[] teams;
    //Server server; ???
    int maxPlayersNumber;
    int maxTeamsNumber;
    int currentPlayersNumber;
    boolean isRunning;
    boolean isHalted;
    List idList;

    public Game(int maxPlayersNumber, int MaxTeamsNumber) {
        players = new Player[maxPlayersNumber];
        teams = new Team[MaxTeamsNumber];
        currentPlayersNumber = 0;
        this.maxPlayersNumber = maxPlayersNumber;
        this.maxTeamsNumber = MaxTeamsNumber;
        isHalted = true;
        isRunning = true;
        this.idList = new ArrayList();
        //this.physicWorld = new World(new Vec2(0.0f,0.0f), false, true);
        AABB aabbworld = new AABB();
        this.physicWorld = new World(aabbworld,new Vec2(0.0f,0.0f),false);
    }

    public void addPlayer(int id) {
        BodyDef bd = new BodyDef();
        bd.isSleeping=false;
        bd.position.set(0.0f, 0.f);
        Body newPlayer = new Body(bd, physicWorld);
        Player player = new Player(null, 100, 100, false, id, "Player1", null, true, null, null, null, null, null, 5, 100, 100);
    }

    public void deletePlayer() {
        //TODO
    }

    public void loadAssets() {
        //TODO
    }

    public int generateId() {
        boolean generationIsGood = false;
        int newId=0;
        while (generationIsGood) {
            Random random = new Random(19580427);
            newId = random.nextInt(1000000);
            if (idList.contains(newId) == false) {
                idList.add(newId);
                generationIsGood = true;
            }
        }
        return newId;
    }

    public void startGame() {                   
        while(true){
            while(currentPlayersNumber < maxPlayersNumber){
                addPlayer(generateId());
                currentPlayersNumber++;
                System.out.println("Player "+currentPlayersNumber+" has been added");
            }
            //physicWorld.step(0.1f, 1);
        }
    }
    public void endGame() {
        //TODO
    }

    public void haltGame() {
        //TODO
    }

    public void resumeGame() {
        //TODO
    }

    public void processImput() {
        //TODO
    }

    public void uptadeLogic() {
        //TODO
    }

    public void resolveEffects() {
        //TODO
    }

    public void startLogicThread() {
        //TODO
    }

    public void SendUptade(Player player) {
        //TODO
    }

    public void startUptadeThread() {
        //TODO
    }

    public void loadMap() {
        //TODO
    }

    public void aggregateStats() {
        //TODO
    }
}
