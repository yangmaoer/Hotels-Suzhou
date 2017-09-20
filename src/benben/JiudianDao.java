package benben;

import java.sql.Connection;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.junit.Test;



//这个类是用来查询数据库中的信息的
public class JiudianDao {
	

	//第一个方法：查询所有酒店
    public List<Jiudian> searchAll(){
    	String SQL =""; 
    	List<Jiudian> jds = new ArrayList<Jiudian>();//酒店的列表，用于保存查到的酒店。
        SQL = "select * from jiudian";//SQL语句
        Connection connection = null;
        java.sql.Statement statement = null;
        try {
            connection = DBDao.getConnection();//打开数据库连接
            statement = connection.createStatement();       
            ResultSet rSet = (ResultSet) statement.executeQuery(SQL);//得到数据库的查询结果,一个数据集
            //判断结果集是否有效，循环结果集，创建出酒店列表
            while(rSet.next()){
                Jiudian jd = new Jiudian();
                jd.setId(rSet.getInt("id"));
                jd.setName(rSet.getString("name"));
                jd.setDianhua(rSet.getString("dianhua"));
                jd.setJingdu(rSet.getDouble("jingdu"));
                jd.setWeidu(rSet.getDouble("weidu"));
                jd.setStar(rSet.getString("star"));
                jd.setDizhi(rSet.getString("dizhi"));
                jds.add(jd);//将一个 酒店加入酒店列表
            }
            connection.close();
            statement.close();
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }finally{
            DBDao.closeConnection(connection);
        }
        
        return jds;//返回查到的酒店
    }
    
    
    
    //第二个方法：根据酒店ID，查询一个酒店所有的价格信息。
    public List<Jiage> searchJiage(int id){

    	String SQL = "";
    	List<Jiage> jgs = new ArrayList<Jiage>();//价格列表，用于保存查到的价格信息。
        SQL = "select * from jiage where jiudianid = ?";//SQL语句
        Connection connection = null;
        java.sql.PreparedStatement pst = null;
        
        
        
        try {
            connection = DBDao.getConnection();
            pst = connection.prepareStatement(SQL);
            pst.setInt(1, id);           
            ResultSet rSet = (ResultSet) pst.executeQuery();//得到数据库的查询结果,一个数据集
            //判断结果集是否有效
            while(rSet.next()){
                Jiage jg = new Jiage();
                jg.setId(rSet.getInt("id"));
                jg.setJiudianid(rSet.getInt("jiudianid"));
                jg.setLeixing(rSet.getString("leixing"));
                jg.setMiaoshu(rSet.getString("miaoshu"));
                jg.setJiage(rSet.getInt("jiage"));
                jgs.add(jg);//将一个价格信息加入酒店列表
            }
            connection.close();
            pst.close();
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }finally{
            DBDao.closeConnection(connection);
        }
        
        return jgs;//返回查到的价格信息
    }
    
    
    //第三个方法：查询所有的评价
    public List<Pingjia> searchPingjia(int id){

    	String SQL = "";
    	List<Pingjia> pjs = new ArrayList<Pingjia>();//评价列表，用于保存查到的评价
        SQL = "select * from pingjia where jiudianid = ?";//SQL语句
        Connection connection = null;
        java.sql.PreparedStatement pst = null;
        
        
        
        try {
            connection = DBDao.getConnection();
            pst = connection.prepareStatement(SQL);
            pst.setInt(1, id);           
            ResultSet rSet = (ResultSet) pst.executeQuery();//得到数据库的查询结果,一个数据集
            //判断结果集是否有效
            while(rSet.next()){
                Pingjia pj = new Pingjia();
                pj.setId(rSet.getInt("id"));
                pj.setJiudianid(rSet.getInt("jiudianid"));
                pj.setFenshu(rSet.getInt("fenshu"));
                pj.setNeirong(rSet.getString("neirong"));
                pjs.add(pj);//将一个评价添加到评价列表
            }
            connection.close();
            pst.close();
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }finally{
            DBDao.closeConnection(connection);
        }
        
        return pjs;//返回查到的评价信息
    }
    
    

	
	
}
