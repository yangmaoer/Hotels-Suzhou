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
 * ��һ��Servlet�����ڲ�ѯ���еľƵ�
 */
@WebServlet("/Servlet01")
public class Servlet01 extends HttpServlet {
	private static final long serialVersionUID = 1L;
    public Servlet01() {
        super();

    }

	/**
	 * �Բ�ѯ���оƵ������������Ӧ
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		
		JiudianDao jdd = new JiudianDao();//���ڲ�ѯ���ݿ�
		List<Jiudian> jds = jdd.searchAll();	//��ѯ���еľƵ�		
		String jsonString = JSON.toJSONString(jds);//תΪJSON��ʽ		
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
