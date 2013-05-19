package kus.game.server;

import java.util.Scanner;

import kus.game.server.user.Gamer;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import pl.bristleback.server.bristle.app.StandaloneServerRunner;

 public final class App {
    
      private static final String[] CONFIG_FILES =
        {"appContext.xml"};
    
//Tu odpalamy nasz server
    
      public static void main(String[] args) {
        ApplicationContext appCtx = new ClassPathXmlApplicationContext(CONFIG_FILES);

        StandaloneServerRunner runner = (StandaloneServerRunner) appCtx.getBean("bristlebackStandaloneServer");

     
       
        
        
        Scanner in = new Scanner(System.in);
        String value = in.nextLine();
        while (!value.equalsIgnoreCase("x")) {
          value = in.nextLine();
          System.out.println("Ku�: "+value);
        }
        runner.stopServer();
      }
      
      
      
    
 }