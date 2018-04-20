package br.com.cepe.servlet;


import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.codehaus.jackson.map.ObjectMapper;

import br.com.cepe.entity.pojo.usuario.Usuario;
import br.com.cepe.service.LoginService;

public class LoginServlet extends HttpServlet {
	
	private static final long serialVersionUID=1L;
	private void process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		try{		
			String url = request.getContextPath();
			if(request.getParameter("acao").equals("login")){
				List<String> credUser = new ArrayList<String>();
				
				credUser.add( request.getParameter("login") );
				credUser.add( request.getParameter("passwordhidden") );
				
				Usuario usuario = new LoginService(credUser).validaUsuarioSenha();
				
				Map<String, String> msg = new HashMap<String, String>();
				HttpSession sectionUser = request.getSession();
												
				if( usuario != null ) {	
					
					sectionUser.setAttribute("sectionuser", usuario);//setAtribute I'm putting my UserPojo user object in session
					
					Cookie cookiettipo = new Cookie("ong-cepe-tipo", String.valueOf(usuario.getTipo()));
					Cookie cookieid = new Cookie("ong-cepe-id", String.valueOf(usuario.getId()));
					cookiettipo.setMaxAge(3600);
					cookieid.setMaxAge(3600);
					response.addCookie(cookiettipo);
					response.addCookie(cookieid);
					
//					String infuser = "";
//					if(usuario.getTipo() == 1) {
//						infuser = "Administrador";
//					}else if ( usuario.getTipo() == 2 ) {
//						infuser = "Professor";
//					}else if ( usuario.getTipo() == 3) {
//						infuser = "Financeiro";
//					}
					
//					msg.put("tipouser", infuser);
//					msg.put("login", usuario.getUsuario());
//					msg.put("id", String.valueOf(usuario.getId()));
					msg.put("msg", " Login realizado com sucesso ! ");
					msg.put("acesso", url+ "/project/private/paginaInicial.html");
					response.setStatus(HttpServletResponse.SC_OK);

					//SC_OK Status code (200) indicating the request succeeded normally.
				}else {
				
					sectionUser.invalidate();// invalid session
					msg.put("msg", "Login invalido");
					response.setStatus(HttpServletResponse.SC_FORBIDDEN);
					//Status code (403) indicating the server understood the request but refused to fulfill it.
				}
				
				sectionUser.setMaxInactiveInterval(600);
				String json = new ObjectMapper().writeValueAsString(msg);
				
				response.setContentType("application/json");
				response.setCharacterEncoding("UTF-8");
				response.getWriter().write(json);
			}
		}catch (Exception e) {
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			e.printStackTrace();
		}
	}
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{		
		process(request, response);
	}
}
