package kus.game.server.exception;
//Tu zdfinowany throw
public class UserExistsException extends RuntimeException {
	private static final long serialVersionUID = 1L;
	private String userName;

	  public UserExistsException(String userName) {
	    this.userName = userName;
	  }

	  public String getUserName() {
	    return userName;
	  }
	}