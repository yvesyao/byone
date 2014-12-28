package by.service.impl;

import java.util.List;

import by.domain.DeviceBaseVo;
import by.domain.DeviceDetailVo;
import by.domain.DeviceInterfaceVo;
import by.service.DeviceService;

public class DeviceServiceImpl implements DeviceService {

	@Override
	public List<DeviceBaseVo> queryDeviceBase() {
		
		DeviceBaseVo dbVo = new DeviceBaseVo();
		
		
		return null;
	}

	@Override
	public DeviceDetailVo queryDeviceDetailByDeviceId(String deviceId) {

		return null;
	}

	@Override
	public DeviceInterfaceVo queryDeviceInterfaceByDeviceId(String deviceId) {
		
		return null;
	}

}
