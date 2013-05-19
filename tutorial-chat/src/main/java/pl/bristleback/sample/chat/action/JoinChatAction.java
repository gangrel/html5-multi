package pl.bristleback.sample.chat.action;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import pl.bristleback.sample.chat.action.client.ChatClientAction;
import pl.bristleback.sample.chat.user.ActiveUsers;
import pl.bristleback.sample.chat.user.Gamer;
import pl.bristleback.server.bristle.api.action.DefaultAction;
import pl.bristleback.server.bristle.api.annotations.Action;
import pl.bristleback.server.bristle.api.annotations.ActionClass;
import pl.bristleback.server.bristle.api.annotations.Bind;

import java.util.List;

@Controller
@ActionClass(name = "JoinChat")
public class JoinChatAction implements DefaultAction<Gamer, String> {

  @Autowired
  private ActiveUsers activeUsers;

  @Autowired
  private ChatClientAction chatClientAction;

  @Action
  public List<Gamer> executeDefault(Gamer user, @Bind(required = true) String userName) {
    activeUsers.registerUser(userName, user);

    chatClientAction.newUser(userName, activeUsers.getUsers());

    return activeUsers.getUsers();
  }
}
