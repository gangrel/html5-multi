package pl.bristleback.sample.chat;

import java.util.Scanner;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import pl.bristleback.sample.chat.user.Point;
import pl.bristleback.server.bristle.app.StandaloneServerRunner;

public final class App {


  private static final String[] CONFIG_FILES =
    {"applicationContext.xml"};

  private App() {
  }

  public static void main(String[] args) {
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext(CONFIG_FILES);

    StandaloneServerRunner runner = (StandaloneServerRunner) applicationContext.getBean("bristlebackStandaloneServer");
    
    Point p = (Point) applicationContext.getBean("a");
    
    
    Scanner in = new Scanner(System.in);
    String value = in.nextLine();
    while (!value.equalsIgnoreCase("x")) {
      value = in.nextLine();
    }
    runner.stopServer();
  }
}
