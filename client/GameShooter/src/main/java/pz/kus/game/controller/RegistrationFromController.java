package pz.kus.game.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.SimpleFormController;

import pz.kus.game.model.UserReg;

//@Controller(value = "rejestracaC")
//@SuppressWarnings("deprecation")
public class RegistrationFromController extends SimpleFormController {

	public RegistrationFromController() {
		setCommandClass(UserReg.class);
		this.setCommandName("rejestracja");
	}

	@Override
	//@RequestMapping(value = "/rejestracja.htm", method = RequestMethod.GET)
	protected ModelAndView onSubmit(HttpServletRequest request,
			HttpServletResponse response, Object command, BindException errors)
			throws Exception {

		UserReg uReg = (UserReg) command;
		return new ModelAndView("rejestracjaSukces", "user", uReg);

	}
}
