package by.service;

import java.util.List;

import by.domain.DeviceBaseVo;
import by.domain.DeviceDetailVo;
import by.domain.DeviceInterfaceVo;

public interface DeviceService {
	//查询全部设备基本信息
	public List<DeviceBaseVo> queryDeviceBase();
	//查询某一设备详细信息
	public DeviceDetailVo queryDeviceDetailByDeviceId(String deviceId);
	//查询某一设备接口信息
	public DeviceInterfaceVo queryDeviceInterfaceByDeviceId(String deviceId);
	
}
