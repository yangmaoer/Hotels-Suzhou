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
 * ������Servlet�����ڲ�ѯ���е�����
 */
@WebServlet("/Servlet03")
public class Servlet03 extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public Servlet03() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * ������������Ӧ
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		JiudianDao jdd = new JiudianDao();
		List<Pingjia> pjs = new ArrayList<Pingjia>();
		
		
		int jiudianid = Integer.parseInt(request.getParameter("id"));//�õ������еľƵ�ID
		
		pjs = jdd.searchPingjia(jiudianid);//��ѯ�õ����е�����
		
		String jsonString = JSON.toJSONString(pjs);//תΪJSON��ʽ
		
		System.out.println(jsonString);
		
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");		
		response.getWriter().print(jsonString);//��������
			
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		doGet(request, response);
	}

}
