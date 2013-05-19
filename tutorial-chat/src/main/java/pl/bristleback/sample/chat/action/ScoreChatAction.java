package pl.bristleback.sample.chat.action;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import pl.bristleback.sample.chat.action.client.ChatClientAction;
import pl.bristleback.sample.chat.user.ActiveUsers;
import pl.bristleback.sample.chat.user.Gamer;
import pl.bristleback.sample.chat.vo.Data;
import pl.bristleback.server.bristle.api.action.DefaultAction;
import pl.bristleback.server.bristle.api.annotations.Action;
import pl.bristleback.server.bristle.api.annotations.ActionClass;
import pl.bristleback.server.bristle.api.annotations.Bind;

import java.util.List;

@Controller
@ActionClass(name = "Score")
public class ScoreChatAction implements DefaultAction<Gamer, Data> {

  @Autowired
  private ActiveUsers activeUsers;

  @Autowired
  private ChatClientAction chatClientAction;

  @Action
  public Void executeDefault(Gamer user, Data messagee) {
    chatClientAction.newScore(messagee);
    //return activeUsers.getUsers();
    return null;
  }

}
