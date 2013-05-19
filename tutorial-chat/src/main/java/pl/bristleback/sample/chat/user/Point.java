package pl.bristleback.sample.chat.user;

import org.springframework.stereotype.Component;

@Component("a")
public class Point {
	private int pointX;
	private int pointY;

	public Point() {
		super();
	}

	public Point(int pointX, int pointY) {
		super();
		this.pointX = pointX;
		this.pointY = pointY;
	}

	public int getPointX() {
		return pointX;
	}

	public void setPointX(int pointX) {
		this.pointX = pointX;
	}

	public int getPointY() {
		return pointY;
	}

	public void setPointY(int pointY) {
		this.pointY = pointY;
	}
}

