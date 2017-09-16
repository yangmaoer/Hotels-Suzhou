package benben;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSON;

/**
 * 第二个Servlet，用于查询一个酒店所有的价格信息
 */
@WebServlet("/Servlet02")
public class Servlet02 extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public Servlet02() {
        super();
    }

    
    //对请求做出响应
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		JiudianDao jdd = new JiudianDao();
		List<Jiage> jgs = new ArrayList<Jiage>();
		
		
		int jiudianid = Integer.parseInt(request.getParameter("id"));
		
		jgs = jdd.searchJiage(jiudianid);
		
		String jsonString = JSON.toJSONString(jgs);
		
		System.out.println(jsonString);
		
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");		
		response.getWriter().print(jsonString);
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		doGet(request, response);
	}

}
