'use client'

import { useEffect, useState } from 'react';

export default function DeviceSpecificComponent() {
    const [deviceType, setDeviceType] = useState('unknown');

    useEffect(() => {
        // 브라우저 환경에서만 기기 감지를 수행
        const userAgent = typeof window !== 'undefined' ? navigator.userAgent : '';

        if (/iPhone|iPad|iPod/i.test(userAgent)) {
            setDeviceType('iOS');
        } else if (/android/i.test(userAgent)) {
            setDeviceType('Android');
        }
    }, []);

    return (
        <div>
            {deviceType === 'iOS' && (
                <div>
                    <p>iOS 기기에서 표시되는 내용입니다.</p>
                    {/* B 코드 작성 */}
                </div>
            )}
            {deviceType === 'Android' && (
                <div>
                    <p>Android 기기에서 표시되는 내용입니다.</p>
                    {/* A 코드 작성 */}
                </div>
            )}
            {deviceType === 'unknown' && (
                <p>기기를 감지하는 중입니다...</p>
            )}
        </div>
    );
}