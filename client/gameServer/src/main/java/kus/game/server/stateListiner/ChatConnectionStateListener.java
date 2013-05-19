package kus.game.server.stateListiner;



import kus.game.server.action.gameClientAction;
import kus.game.server.user.Gamer;
import kus.game.server.user.RegisterGamers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import pl.bristleback.server.bristle.api.ConnectionStateListener;

@Component
public class ChatConnectionStateListener implements ConnectionStateListener<Gamer> {

  //@Autowired
  private gameClientAction gameClientAction;

  @Autowired
  private RegisterGamers registerGamers;

  @Override
  public void userConnected(Gamer user) {
  }

  @Override
  public void userDisconnected(Gamer user) {
    if (user.isLogged()) {
      registerGamers.removeGamer(user.getNickName());
    }
  }
}

