interface ReactNativeWebViewWindow extends Window {
  ReactNativeWebView?: {
    postMessage: (message: string) => void;
  };
}

declare const window: ReactNativeWebViewWindow;

type WebViewData = {
  type: string;
  data: any;
};

const sendWebViewData = (type: string, data: any): void => {
  if (window.ReactNativeWebView !== undefined) {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({ type, data } as WebViewData)
    );
  } else {
    console.log("[웹뷰 통신오류] 웹뷰가 동작하지 않습니다.");
  }
};

export default sendWebViewData;
