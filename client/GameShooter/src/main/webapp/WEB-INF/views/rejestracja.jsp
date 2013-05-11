<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Rejestracja</title>
</head>
<body>

	<form:form method="POST" commandName="rejestracja">
		<table>
			<tr>
				<td>Nazwa Użytkownika:</td>
				<td><form:input path="name" /></td>
			</tr>
			<tr>
				<td>Login :</td>
				<td><form:input path="login" /></td>
			</tr>
			<tr>
				<td>Hasło :</td>
				<td><form:password path="password" /></td>
			</tr>
			<tr>
				<td>Mail:</td>
				<td><form:input path="mail"/></td>
			</tr>
			<tr>
				<td colspan="2"><input type="submit"></td>
			</tr>
		</table>
	</form:form>

</body>
</html>