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
 * 第三个Servlet，用于查询所有的评价
 */
@WebServlet("/Servlet03")
public class Servlet03 extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public Servlet03() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * 对请求做出响应
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		JiudianDao jdd = new JiudianDao();
		List<Pingjia> pjs = new ArrayList<Pingjia>();
		
		
		int jiudianid = Integer.parseInt(request.getParameter("id"));
		
		pjs = jdd.searchPingjia(jiudianid);
		
		String jsonString = JSON.toJSONString(pjs);
		
		System.out.println(jsonString);
		
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");		
		response.getWriter().print(jsonString);
			
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		doGet(request, response);
	}

}
