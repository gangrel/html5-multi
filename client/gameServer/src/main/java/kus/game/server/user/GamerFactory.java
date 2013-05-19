package kus.game.server.user;

import org.springframework.stereotype.Component;

import pl.bristleback.server.bristle.api.users.IdentifiedUser;
import pl.bristleback.server.bristle.api.users.UserFactory;
//Fabryka gamerow
@Component
public class GamerFactory implements UserFactory {

	public IdentifiedUser createNewUser() {
		// TODO Auto-generated method stub
		return new Gamer();
	}

}
