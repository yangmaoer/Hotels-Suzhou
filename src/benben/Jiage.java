package benben;

//这个类是价格的实体类，对应于数据库里的价格表
public class Jiage {
	private int id;//价格ID
	private int jiudianid;//酒店ID
	private String leixing;//房间类型
	private String miaoshu;//房间描述
	private int jiage;//房间价格
	
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
	public String getLeixing() {
		return leixing;
	}
	public void setLeixing(String leixing) {
		this.leixing = leixing;
	}
	public String getMiaoshu() {
		return miaoshu;
	}
	public void setMiaoshu(String miaoshu) {
		this.miaoshu = miaoshu;
	}
	public int getJiage() {
		return jiage;
	}
	public void setJiage(int jiage) {
		this.jiage = jiage;
	}
	

}
