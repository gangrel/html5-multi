package pl.bristleback.sample.chat.user;

import org.springframework.stereotype.Component;
import pl.bristleback.sample.chat.exception.UserExistsException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component("aaa")
public class ActiveUsers {

  private Map<String, Gamer> activeUsers = new HashMap<String, Gamer>();

  public void removeUser(String userName) {
    activeUsers.remove(userName);
  }

  public void registerUser(String userName, Gamer user) {
    if (activeUsers.containsKey(userName)) {
      throw new UserExistsException(userName);
    }
    user.setNickname(userName);
    activeUsers.put(userName, user);
  }

  public List<Gamer> getUsers() {
    return new ArrayList<Gamer>(activeUsers.values());
  }
}
