package pl.bristleback.sample.chat.action;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import pl.bristleback.sample.chat.action.client.ChatClientAction;
import pl.bristleback.sample.chat.user.Gamer;
import pl.bristleback.sample.chat.vo.Data;
import pl.bristleback.server.bristle.api.action.DefaultAction;
import pl.bristleback.server.bristle.api.annotations.Action;
import pl.bristleback.server.bristle.api.annotations.ActionClass;

@Controller
@ActionClass(name = "SendText")
public class SendTextAction implements DefaultAction<Gamer, Data> {

  @Autowired
  private ChatClientAction chatClientAction;

  @Action
  public Void executeDefault(Gamer user, Data message) {
    //message.setText(" To ja server");
	chatClientAction.sendText(user, message);
    return null;
  }
}
