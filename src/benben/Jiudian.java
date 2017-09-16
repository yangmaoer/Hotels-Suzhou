package benben;

//酒店的实体类，对应于数据库中的酒店表
public class Jiudian {
	private int id;//酒店的ID
	private String name;//酒店的名字
	private String dizhi;//酒店的地址
	private String dianhua;//酒店的电话
	private Double jingdu;//酒店的经度
	private Double weidu;//酒店的纬度
	private String star;//酒店的星级
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getStar() {
		return star;
	}
	public void setStar(String star) {
		this.star = star;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDizhi() {
		return dizhi;
	}
	public void setDizhi(String dizhi) {
		this.dizhi = dizhi;
	}
	public String getDianhua() {
		return dianhua;
	}
	public void setDianhua(String dianhua) {
		this.dianhua = dianhua;
	}
	public Double getJingdu() {
		return jingdu;
	}
	public void setJingdu(Double jingdu) {
		this.jingdu = jingdu;
	}
	public Double getWeidu() {
		return weidu;
	}
	public void setWeidu(Double weidu) {
		this.weidu = weidu;
	}

	

}
