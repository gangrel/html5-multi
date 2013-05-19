package kus.game.server.user;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import kus.game.server.exception.UserExistsException;

import org.springframework.stereotype.Component;
//A tu lista graczy obecnych na serverze
@Component("registerGamers")
public class RegisterGamers {
	Map<String, Gamer> mGamers = new HashMap<String, Gamer>();

	public void registerGamer(String nick, Gamer gamer) {
		if (mGamers.containsKey(nick)) {
			throw new UserExistsException(nick);
		}
		gamer.setNickName(nick);
		mGamers.put(nick, gamer);
	}
	
	public void removeGamer(String nick){
		mGamers.remove(nick);
	}

	public List<Gamer> getGamers() {
		return new ArrayList<Gamer>(mGamers.values());
	}
}
