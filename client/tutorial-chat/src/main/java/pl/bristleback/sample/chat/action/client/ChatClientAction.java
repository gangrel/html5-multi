package pl.bristleback.sample.chat.action.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.bristleback.sample.chat.user.ActiveUsers;
import pl.bristleback.sample.chat.user.Gamer;
import pl.bristleback.sample.chat.vo.Data;
import pl.bristleback.server.bristle.api.annotations.ClientAction;
import pl.bristleback.server.bristle.api.annotations.ClientActionClass;

import java.util.List;


@Component
@ClientActionClass
public class ChatClientAction {

  @Autowired
  private ActiveUsers activeUsers;

  @ClientAction
  public List<Gamer> newUser(String userName, List<Gamer> actualUsers) {
    return activeUsers.getUsers();
  }

  @ClientAction
  public List<Gamer> sendText(Gamer user, Data text) {
    return activeUsers.getUsers();
  }
  
  /*public ChatUser sendText(ChatUser user, ChatText text) {
	    return user;
}*/
  
  @ClientAction
  public List<Gamer> userLeftChat(String userName, List<Gamer> actualUsers) {
    return activeUsers.getUsers();
  }
  @ClientAction
  public List<Gamer> addMessage(Gamer user, Data text){
	  return activeUsers.getUsers();
  }
  @ClientAction
  public List<Gamer>addScore(Data text){
	  return activeUsers.getUsers();
  }
  
  @ClientAction
  public List<Gamer>newScore(Data text){
	  return activeUsers.getUsers();
  }
}
