package kus.game.server.user;

import org.springframework.stereotype.Component;
import java.util.UUID;

import pl.bristleback.server.bristle.api.users.IdentifiedUser;

//Taki proponowany gamer
//Ale to tylko propozycja
//Bo pewnie wszytsko bedzie w wordzie
@Component("gamer")
public class Gamer implements IdentifiedUser{
	String iD;
	String gameIn;
	String UUIDs;
	String nickName;
	boolean host;
	boolean logged;
	
	public Gamer(){
		UUIDs = UUID.randomUUID().toString();
	}
	
	public void setiD(String iD) {
		this.iD = iD;
	}
	public String getGameIn() {
		return gameIn;
	}
	public void setGameIn(String gameIn) {
		this.gameIn = gameIn;
	}
	public boolean isHost() {
		return host;
	}
	public void setHost(boolean host) {
		this.host = host;
	}
	
	
	public String getId() {
		return this.iD;
	}
	public String getUUID() {
		return UUIDs;
	}

	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	public boolean isLogged() {
		// TODO Auto-generated method stub
		return logged;
	}
	
	
	
	
}
