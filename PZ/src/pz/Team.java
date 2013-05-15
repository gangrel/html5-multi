package pz;

public class Team {
    String name;
    String color;
    //attribute?
    Player[] players;
    int currentPlayersNumber=0;
    int maxPlayersNumber=0;//jakie wartosci? Chyba zalezne od mapy?
    
    public Team(String name, String color, int maxPlayersNumber){
        this.name=name;
        this.color=color;
        this.maxPlayersNumber=maxPlayersNumber;
        this.players= new Player[maxPlayersNumber];
    }
    public void playerAdded(){
        this.currentPlayersNumber++;
    }
    public boolean isTeamFull(){
        if(this.currentPlayersNumber < this.maxPlayersNumber){
            return false;
        }
        else{
            return true;
        }
    }
}
