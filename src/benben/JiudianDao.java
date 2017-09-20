package benben;

import java.sql.Connection;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.junit.Test;



//�������������ѯ���ݿ��е���Ϣ��
public class JiudianDao {
	

	//��һ����������ѯ���оƵ�
    public List<Jiudian> searchAll(){
    	String SQL =""; 
    	List<Jiudian> jds = new ArrayList<Jiudian>();//�Ƶ���б����ڱ���鵽�ľƵꡣ
        SQL = "select * from jiudian";//SQL���
        Connection connection = null;
        java.sql.Statement statement = null;
        try {
            connection = DBDao.getConnection();//�����ݿ�����
            statement = connection.createStatement();       
            ResultSet rSet = (ResultSet) statement.executeQuery(SQL);//�õ����ݿ�Ĳ�ѯ���,һ�����ݼ�
            //�жϽ�����Ƿ���Ч��ѭ����������������Ƶ��б�
            while(rSet.next()){
                Jiudian jd = new Jiudian();
                jd.setId(rSet.getInt("id"));
                jd.setName(rSet.getString("name"));
                jd.setDianhua(rSet.getString("dianhua"));
                jd.setJingdu(rSet.getDouble("jingdu"));
                jd.setWeidu(rSet.getDouble("weidu"));
                jd.setStar(rSet.getString("star"));
                jd.setDizhi(rSet.getString("dizhi"));
                jds.add(jd);//��һ�� �Ƶ����Ƶ��б�
            }
            connection.close();
            statement.close();
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }finally{
            DBDao.closeConnection(connection);
        }
        
        return jds;//���ز鵽�ľƵ�
    }
    
    
    
    //�ڶ������������ݾƵ�ID����ѯһ���Ƶ����еļ۸���Ϣ��
    public List<Jiage> searchJiage(int id){

    	String SQL = "";
    	List<Jiage> jgs = new ArrayList<Jiage>();//�۸��б����ڱ���鵽�ļ۸���Ϣ��
        SQL = "select * from jiage where jiudianid = ?";//SQL���
        Connection connection = null;
        java.sql.PreparedStatement pst = null;
        
        
        
        try {
            connection = DBDao.getConnection();
            pst = connection.prepareStatement(SQL);
            pst.setInt(1, id);           
            ResultSet rSet = (ResultSet) pst.executeQuery();//�õ����ݿ�Ĳ�ѯ���,һ�����ݼ�
            //�жϽ�����Ƿ���Ч
            while(rSet.next()){
                Jiage jg = new Jiage();
                jg.setId(rSet.getInt("id"));
                jg.setJiudianid(rSet.getInt("jiudianid"));
                jg.setLeixing(rSet.getString("leixing"));
                jg.setMiaoshu(rSet.getString("miaoshu"));
                jg.setJiage(rSet.getInt("jiage"));
                jgs.add(jg);//��һ���۸���Ϣ����Ƶ��б�
            }
            connection.close();
            pst.close();
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }finally{
            DBDao.closeConnection(connection);
        }
        
        return jgs;//���ز鵽�ļ۸���Ϣ
    }
    
    
    //��������������ѯ���е�����
    public List<Pingjia> searchPingjia(int id){

    	String SQL = "";
    	List<Pingjia> pjs = new ArrayList<Pingjia>();//�����б����ڱ���鵽������
        SQL = "select * from pingjia where jiudianid = ?";//SQL���
        Connection connection = null;
        java.sql.PreparedStatement pst = null;
        
        
        
        try {
            connection = DBDao.getConnection();
            pst = connection.prepareStatement(SQL);
            pst.setInt(1, id);           
            ResultSet rSet = (ResultSet) pst.executeQuery();//�õ����ݿ�Ĳ�ѯ���,һ�����ݼ�
            //�жϽ�����Ƿ���Ч
            while(rSet.next()){
                Pingjia pj = new Pingjia();
                pj.setId(rSet.getInt("id"));
                pj.setJiudianid(rSet.getInt("jiudianid"));
                pj.setFenshu(rSet.getInt("fenshu"));
                pj.setNeirong(rSet.getString("neirong"));
                pjs.add(pj);//��һ��������ӵ������б�
            }
            connection.close();
            pst.close();
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }finally{
            DBDao.closeConnection(connection);
        }
        
        return pjs;//���ز鵽��������Ϣ
    }
    
    

	
	
}
