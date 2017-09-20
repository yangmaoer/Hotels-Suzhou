package benben;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.alibaba.fastjson.JSON;

/**
 * 
 * 第一个Servlet，用于查询所有的酒店
 */
@WebServlet("/Servlet01")
public class Servlet01 extends HttpServlet {
	private static final long serialVersionUID = 1L;
    public Servlet01() {
        super();

    }

	/**
	 * 对查询所有酒店的请求做出响应
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		
		JiudianDao jdd = new JiudianDao();//用于查询数据库
		List<Jiudian> jds = jdd.searchAll();	//查询所有的酒店		
		String jsonString = JSON.toJSONString(jds);//转为JSON格式		
		System.out.println(jsonString);		
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");		
		response.getWriter().print(jsonString);//返回数据
					
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
