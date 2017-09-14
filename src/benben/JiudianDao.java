package benben;

import java.sql.Connection;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class JiudianDao {
	

    public List<Jiudian> searchAll(){
    	String SQL =""; 
    	List<Jiudian> jds = new ArrayList<Jiudian>();
        SQL = "select * from jiudian";
        Connection connection = null;
        java.sql.Statement statement = null;
        try {
            connection = DBDao.getConnection();
            statement = connection.createStatement();       
            ResultSet rSet = (ResultSet) statement.executeQuery(SQL);//得到数据库的查询结果,一个数据集
            //判断结果集是否有效
            while(rSet.next()){
                Jiudian jd = new Jiudian();
                jd.setId(rSet.getInt("id"));
                jd.setName(rSet.getString("name"));
                jd.setDianhua(rSet.getString("dianhua"));
                jd.setJingdu(rSet.getDouble("jingdu"));
                jd.setWeidu(rSet.getDouble("weidu"));
                jd.setStar(rSet.getString("star"));
                jd.setDizhi(rSet.getString("dizhi"));
                jds.add(jd);
            }
            connection.close();
            statement.close();
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }finally{
            DBDao.closeConnection(connection);
        }
        
        return jds;
    }
    
    
    public List<Jiage> searchJiage(int id){
    	String SQL = "";
    	List<Jiage> jgs = new ArrayList<Jiage>();
        SQL = "select * from jiage where jiudianid = ?";
        Connection connection = null;
        java.sql.PreparedStatement pst = null;
        
        
        
        try {
            connection = DBDao.getConnection();
            pst = connection.prepareStatement(SQL);
            pst.setInt(1, id);           
            ResultSet rSet = (ResultSet) pst.executeQuery(SQL);//得到数据库的查询结果,一个数据集
            //判断结果集是否有效
            while(rSet.next()){
                Jiage jg = new Jiage();
                jg.setId(rSet.getInt("id"));
                jg.setJiudianid(rSet.getInt("jiudianid"));
                jg.setLeixing(rSet.getString("leixing"));
                jg.setMiaoshu(rSet.getString("miaoshu"));
                jg.setJiage(rSet.getInt("jiage"));
                jgs.add(jg);
            }
            connection.close();
            pst.close();
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }finally{
            DBDao.closeConnection(connection);
        }
        
        return jgs;
    }
    
    

	
	
}
