package br.com.cepe.filter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.codehaus.jackson.map.ObjectMapper;

import br.com.cepe.entity.pojo.usuario.Usuario;


/**
* Servlet Filter implementation class FilterSection
*/
@WebFilter(urlPatterns = {"/home","/project/private/*"})
public class FilterSection implements Filter{
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		
		String context = request.getServletContext().getContextPath();
		try {
			
			HttpSession session = ((HttpServletRequest) request).getSession();
			Usuario user = null;
			Map<String, String> msg = new HashMap<String, String>();

			if (session != null ) {
				user = (Usuario) session.getAttribute("sectionuser");
			}
			if ( user != null && context.equals("/control-expenses") ) {
				// criar uma valida��o para verificar permissao ?
				((HttpServletResponse) response).sendRedirect(context+"/project/private/paginaInicial.html/");
			} 
			if ( user == null ) {
				
				session.invalidate();// invalid session
				msg.put("msg", "Voce n�o est� logado no sistema");
				((HttpServletResponse) response).setStatus(HttpServletResponse.SC_FORBIDDEN);
				String json = new ObjectMapper().writeValueAsString(msg);
				
				response.setContentType("application/json");
				response.setCharacterEncoding("UTF-8");
				response.getWriter().write(json);
				
				((HttpServletResponse) response).sendRedirect(context+"/");

			}else {
				chain.doFilter(request, response);
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
	}
	/**
    * Default constructor. 
    */

	/**
	* @see Filter#destroy()
	*/
	public void destroy() {
		// TODO Auto-generated method stub
	}

	/**
	* @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	*/
	
	/**
	* @see Filter#init(FilterConfig)
	*/
	public void init(FilterConfig fConfig) throws ServletException {
		// TODO Auto-generated method stub
	}
}
