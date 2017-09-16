package benben;


//评价的实体类，对应于数据库中的评价表
public class Pingjia {
	private int id;//评价的ID
	private int jiudianid;//评价的酒店ID
	private int fenshu;//评价的分数
	private String neirong;//评价的内容
	
	//下面是GET和SET方法
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getJiudianid() {
		return jiudianid;
	}
	public void setJiudianid(int jiudianid) {
		this.jiudianid = jiudianid;
	}
	public int getFenshu() {
		return fenshu;
	}
	public void setFenshu(int fenshu) {
		this.fenshu = fenshu;
	}
	public String getNeirong() {
		return neirong;
	}
	public void setNeirong(String neirong) {
		this.neirong = neirong;
	}
	

}
