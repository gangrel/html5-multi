package kus.game.server.action;

import java.util.List;

import kus.game.server.model.Data;
import kus.game.server.user.Gamer;
import kus.game.server.user.RegisterGamers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import pl.bristleback.server.bristle.api.annotations.ClientAction;
import pl.bristleback.server.bristle.api.annotations.ClientActionClass;

//Tu jakies akcje dla gry/graczy
//Ustalcie miedzy soba co i jak chcecie aby bylo robione
//return tutaj to nie jest return z danymi lecz info dla servera gdzie ma wyslac dane!!
//Dokladne zachowanie sie funckji jest definiowana w controllerach servera
//i w kodzie javascript po stronie klienta i to polaczenie daje ostateczne zachowanie sie danej 
//funkcji.
//Tu dalem takie sobie przykladowe funkcje, ale pomyslcie co wam trzba i jak chcecie sobie to zorganizowac.
//Te przykladowe funkcje musza byc podpiete i zdeifnowana w kodzie javascript
@Component
@ClientActionClass
public class gameClientAction {

  @Autowired
  private RegisterGamers activeGamers;
  //To chyba oczywiste
  @ClientAction
  public List<Gamer> newUser(String userName, List<Gamer> actualUsers) {
    return activeGamers.getGamers();
  }
  //Funkcja chattowa
  @ClientAction
  public List<Gamer> sendText(Gamer user, Data text) {
    return activeGamers.getGamers();
  }
  
  //To tez jest oczywiste
  @ClientAction
  public List<Gamer> gamerLeftGame(String userName, List<Gamer> actualGamers) {
    return activeGamers.getGamers();
  }
  //Jakis message niekoniecznie chat
  @ClientAction
  public List<Gamer> addMessage(Gamer user, Data data){
	  return activeGamers.getGamers();
  }
  //Cos dla scora
  @ClientAction
  public List<Gamer>addScore(Data data){
	  return activeGamers.getGamers();
  }
  //Tez funckja dla scora
  @ClientAction
  public List<Gamer>newScore(Data data){
	  return activeGamers.getGamers();
  }
}
