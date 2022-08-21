// prettier-ignore
const globals = [
	'NodeFilter', 'AbortController', 'AbortSignal', 'AbstractRange', 'AnalyserNode', 'Animation', 'AnimationEffect',
	'AnimationEvent', 'AnimationPlaybackEvent', 'AnimationTimeline', 'Attr', 'AudioBuffer', 'AudioBufferSourceNode', 'AudioContext',
	'AudioDestinationNode', 'AudioListener', 'AudioNode', 'AudioParam', 'AudioParamMap', 'AudioProcessingEvent',
	'AudioScheduledSourceNode', 'AudioWorklet', 'AudioWorkletNode', 'AuthenticatorAssertionResponse',
	'AuthenticatorAttestationResponse', 'AuthenticatorResponse', 'BarProp', 'BaseAudioContext', 'BeforeUnloadEvent',
	'BiquadFilterNode', 'Blob', 'BlobEvent', 'BroadcastChannel', 'ByteLengthQueuingStrategy', 'CDATASection', 'CSSAnimation',
	'CSSConditionRule', 'CSSCounterStyleRule', 'CSSFontFaceRule', 'CSSGroupingRule', 'CSSImportRule', 'CSSKeyframeRule',
	'CSSKeyframesRule', 'CSSMediaRule', 'CSSNamespaceRule', 'CSSPageRule', 'CSSRule', 'CSSStyleDeclaration', 'CSSStyleRule',
	'CSSStyleSheet', 'CSSSupportsRule', 'CSSTransition', 'Cache', 'CacheStorage', 'CanvasGradient', 'CanvasPattern',
	'CanvasRenderingContext2D', 'ChannelMergerNode', 'ChannelSplitterNode', 'CharacterData', 'Clipboard', 'ClipboardEvent',
	'ClipboardItem', 'CloseEvent', 'Comment', 'CompositionEvent', 'ConstantSourceNode', 'ConvolverNode', 'CountQueuingStrategy',
	'Credential', 'CredentialsContainer', 'Crypto', 'CryptoKey', 'CustomEvent', 'DOMException', 'DOMImplementation', 'DOMMatrix',
	'SVGMatrix', 'WebKitCSSMatrix', 'DOMMatrixReadOnly', 'DOMParser', 'DOMPoint', 'SVGPoint', 'DOMPointReadOnly', 'DOMQuad',
	'DOMRect', 'SVGRect', 'DOMRectList', 'DOMRectReadOnly', 'DOMStringList', 'DOMStringMap', 'DOMTokenList', 'DataTransfer',
	'DataTransferItem', 'DataTransferItemList', 'DelayNode', 'DeviceMotionEvent', 'DeviceOrientationEvent', 'Document',
	'DocumentFragment', 'DocumentTimeline', 'DocumentType', 'DragEvent', 'DynamicsCompressorNode', 'Element', 'ElementInternals',
	'ErrorEvent', 'Event', 'EventSource', 'EventTarget', 'External', 'File', 'FileList', 'FileReader', 'FileSystem',
	'FileSystemDirectoryEntry', 'FileSystemDirectoryReader', 'FileSystemEntry', 'FileSystemFileEntry', 'FocusEvent', 'FontFace',
	'FontFaceSet', 'FontFaceSetLoadEvent', 'FormDataEvent', 'GainNode', 'Gamepad', 'GamepadButton', 'GamepadEvent',
	'GamepadHapticActuator', 'Geolocation', 'GeolocationCoordinates', 'GeolocationPosition', 'GeolocationPositionError',
	'HTMLAllCollection', 'HTMLAnchorElement', 'HTMLAreaElement', 'HTMLAudioElement', 'HTMLBRElement', 'HTMLBaseElement',
	'HTMLBodyElement', 'HTMLButtonElement', 'HTMLCanvasElement', 'HTMLCollection', 'HTMLDListElement', 'HTMLDataElement',
	'HTMLDataListElement', 'HTMLDetailsElement', 'HTMLDirectoryElement', 'HTMLDivElement', 'HTMLDocument', 'HTMLElement',
	'HTMLEmbedElement', 'HTMLFieldSetElement', 'HTMLFontElement', 'HTMLFormControlsCollection', 'HTMLFormElement',
	'HTMLFrameElement', 'HTMLFrameSetElement', 'HTMLHRElement', 'HTMLHeadElement', 'HTMLHeadingElement', 'HTMLHtmlElement',
	'HTMLIFrameElement', 'HTMLImageElement', 'HTMLInputElement', 'HTMLLIElement', 'HTMLLabelElement', 'HTMLLegendElement',
	'HTMLLinkElement', 'HTMLMapElement', 'HTMLMarqueeElement', 'HTMLMediaElement', 'HTMLMenuElement', 'HTMLMetaElement',
	'HTMLMeterElement', 'HTMLModElement', 'HTMLOListElement', 'HTMLObjectElement', 'HTMLOptGroupElement', 'HTMLOptionElement',
	'HTMLOptionsCollection', 'HTMLOutputElement', 'HTMLParagraphElement', 'HTMLParamElement', 'HTMLPictureElement',
	'HTMLPreElement', 'HTMLProgressElement', 'HTMLQuoteElement', 'HTMLScriptElement', 'HTMLSelectElement', 'HTMLSlotElement',
	'HTMLSourceElement', 'HTMLSpanElement', 'HTMLStyleElement', 'HTMLTableCaptionElement', 'HTMLTableCellElement',
	'HTMLTableColElement', 'HTMLTableElement', 'HTMLTableRowElement', 'HTMLTableSectionElement', 'HTMLTemplateElement',
	'HTMLTextAreaElement', 'HTMLTimeElement', 'HTMLTitleElement', 'HTMLTrackElement', 'HTMLUListElement', 'HTMLUnknownElement',
	'HTMLVideoElement', 'HashChangeEvent', 'Headers', 'History', 'IDBCursor', 'IDBCursorWithValue', 'IDBDatabase', 'IDBFactory',
	'IDBIndex', 'IDBKeyRange', 'IDBObjectStore', 'IDBOpenDBRequest', 'IDBRequest', 'IDBTransaction', 'IDBVersionChangeEvent',
	'IIRFilterNode', 'IdleDeadline', 'ImageBitmap', 'ImageBitmapRenderingContext', 'ImageData', 'InputEvent',
	'IntersectionObserver', 'IntersectionObserverEntry', 'KeyboardEvent', 'KeyframeEffect', 'Location', 'MathMLElement',
	'MediaCapabilities', 'MediaDeviceInfo', 'MediaDevices', 'MediaElementAudioSourceNode', 'MediaEncryptedEvent', 'MediaError',
	'MediaKeyMessageEvent', 'MediaKeySession', 'MediaKeyStatusMap', 'MediaKeySystemAccess', 'MediaKeys', 'MediaList',
	'MediaMetadata', 'MediaQueryList', 'MediaQueryListEvent', 'MediaRecorder', 'MediaRecorderErrorEvent', 'MediaSession',
	'MediaSource', 'MediaStream', 'MediaStreamAudioDestinationNode', 'MediaStreamAudioSourceNode', 'MediaStreamTrack',
	'MediaStreamTrackEvent', 'MessageChannel', 'MessageEvent', 'MessagePort', 'MimeType', 'MimeTypeArray', 'MouseEvent',
	'MutationEvent', 'MutationObserver', 'MutationRecord', 'NamedNodeMap', 'Navigator', 'NetworkInformation', 'Node',
	'NodeIterator', 'NodeList', 'Notification', 'OfflineAudioCompletionEvent', 'OfflineAudioContext', 'OscillatorNode',
	'OverconstrainedError', 'PageTransitionEvent', 'PannerNode', 'Path2D', 'PaymentMethodChangeEvent', 'PaymentRequest',
	'PaymentRequestUpdateEvent', 'PaymentResponse', 'Performance', 'PerformanceEntry', 'PerformanceEventTiming', 'PerformanceMark',
	'PerformanceMeasure', 'PerformanceNavigation', 'PerformanceNavigationTiming', 'PerformanceObserver',
	'PerformanceObserverEntryList', 'PerformancePaintTiming', 'PerformanceResourceTiming', 'PerformanceServerTiming',
	'PerformanceTiming', 'PeriodicWave', 'PermissionStatus', 'Permissions', 'PictureInPictureWindow', 'Plugin', 'PluginArray',
	'PointerEvent', 'PopStateEvent', 'ProcessingInstruction', 'ProgressEvent', 'PromiseRejectionEvent', 'PublicKeyCredential',
	'PushManager', 'PushSubscription', 'PushSubscriptionOptions', 'RTCCertificate', 'RTCDTMFSender', 'RTCDTMFToneChangeEvent',
	'RTCDataChannel', 'RTCDataChannelEvent', 'RTCDtlsTransport', 'RTCIceCandidate', 'RTCIceTransport', 'RTCPeerConnection',
	'RTCPeerConnectionIceErrorEvent', 'RTCPeerConnectionIceEvent', 'RTCRtpReceiver', 'RTCRtpSender', 'RTCRtpTransceiver',
	'RTCSessionDescription', 'RTCStatsReport', 'RTCTrackEvent', 'RadioNodeList', 'Range', 'ReadableStream',
	'ReadableStreamDefaultController', 'ReadableStreamDefaultReader', 'RemotePlayback', 'Request', 'ResizeObserver',
	'ResizeObserverEntry', 'ResizeObserverSize', 'Response', 'SVGAElement', 'SVGAngle', 'SVGAnimateElement',
	'SVGAnimateMotionElement', 'SVGAnimateTransformElement', 'SVGAnimatedAngle', 'SVGAnimatedBoolean', 'SVGAnimatedEnumeration',
	'SVGAnimatedInteger', 'SVGAnimatedLength', 'SVGAnimatedLengthList', 'SVGAnimatedNumber', 'SVGAnimatedNumberList',
	'SVGAnimatedPreserveAspectRatio', 'SVGAnimatedRect', 'SVGAnimatedString', 'SVGAnimatedTransformList', 'SVGAnimationElement',
	'SVGCircleElement', 'SVGClipPathElement', 'SVGComponentTransferFunctionElement', 'SVGDefsElement', 'SVGDescElement',
	'SVGElement', 'SVGEllipseElement', 'SVGFEBlendElement', 'SVGFEColorMatrixElement', 'SVGFEComponentTransferElement',
	'SVGFECompositeElement', 'SVGFEConvolveMatrixElement', 'SVGFEDiffuseLightingElement', 'SVGFEDisplacementMapElement',
	'SVGFEDistantLightElement', 'SVGFEDropShadowElement', 'SVGFEFloodElement', 'SVGFEFuncAElement', 'SVGFEFuncBElement',
	'SVGFEFuncGElement', 'SVGFEFuncRElement', 'SVGFEGaussianBlurElement', 'SVGFEImageElement', 'SVGFEMergeElement',
	'SVGFEMergeNodeElement', 'SVGFEMorphologyElement', 'SVGFEOffsetElement', 'SVGFEPointLightElement',
	'SVGFESpecularLightingElement', 'SVGFESpotLightElement', 'SVGFETileElement', 'SVGFETurbulenceElement', 'SVGFilterElement',
	'SVGForeignObjectElement', 'SVGGElement', 'SVGGeometryElement', 'SVGGradientElement', 'SVGGraphicsElement', 'SVGImageElement',
	'SVGLength', 'SVGLengthList', 'SVGLineElement', 'SVGLinearGradientElement', 'SVGMPathElement', 'SVGMarkerElement',
	'SVGMaskElement', 'SVGMetadataElement', 'SVGNumber', 'SVGNumberList', 'SVGPathElement', 'SVGPatternElement', 'SVGPointList',
	'SVGPolygonElement', 'SVGPolylineElement', 'SVGPreserveAspectRatio', 'SVGRadialGradientElement', 'SVGRectElement',
	'SVGSVGElement', 'SVGScriptElement', 'SVGSetElement', 'SVGStopElement', 'SVGStringList', 'SVGStyleElement', 'SVGSwitchElement',
	'SVGSymbolElement', 'SVGTSpanElement', 'SVGTextContentElement', 'SVGTextElement', 'SVGTextPathElement',
	'SVGTextPositioningElement', 'SVGTitleElement', 'SVGTransform', 'SVGTransformList', 'SVGUnitTypes', 'SVGUseElement',
	'SVGViewElement', 'Screen', 'ScreenOrientation', 'ScriptProcessorNode', 'SecurityPolicyViolationEvent', 'Selection',
	'ServiceWorker', 'ServiceWorkerContainer', 'ServiceWorkerRegistration', 'ShadowRoot', 'SharedWorker', 'SourceBuffer',
	'SourceBufferList', 'SpeechRecognitionAlternative', 'SpeechRecognitionResult', 'SpeechRecognitionResultList', 'SpeechSynthesis',
	'SpeechSynthesisErrorEvent', 'SpeechSynthesisEvent', 'SpeechSynthesisUtterance', 'SpeechSynthesisVoice', 'StaticRange',
	'StereoPannerNode', 'Storage', 'StorageEvent', 'StorageManager', 'StyleSheet', 'StyleSheetList', 'SubmitEvent', 'SubtleCrypto',
	'Text', 'TextDecoder', 'TextDecoderStream', 'TextEncoder', 'TextEncoderStream', 'TextMetrics', 'TextTrack', 'TextTrackCue',
	'TextTrackCueList', 'TextTrackList', 'TimeRanges', 'Touch', 'TouchEvent', 'TouchList', 'TrackEvent', 'TransformStream',
	'TransformStreamDefaultController', 'TransitionEvent', 'TreeWalker', 'UIEvent', 'URL', 'webkitURL', 'URLSearchParams', 'VTTCue',
	'VTTRegion', 'ValidityState', 'VideoPlaybackQuality', 'VisualViewport', 'WaveShaperNode', 'WebGL2RenderingContext',
	'WebGLActiveInfo', 'WebGLBuffer', 'WebGLContextEvent', 'WebGLFramebuffer', 'WebGLProgram', 'WebGLQuery', 'WebGLRenderbuffer',
	'WebGLRenderingContext', 'WebGLSampler', 'WebGLShader', 'WebGLShaderPrecisionFormat', 'WebGLSync', 'WebGLTexture',
	'WebGLTransformFeedback', 'WebGLUniformLocation', 'WebGLVertexArrayObject', 'WebSocket', 'WheelEvent', 'Window', 'Worker',
	'Worklet', 'WritableStream', 'WritableStreamDefaultController', 'WritableStreamDefaultWriter', 'XMLDocument', 'XMLHttpRequest',
	'XMLHttpRequestEventTarget', 'XMLHttpRequestUpload', 'XMLSerializer', 'XPathEvaluator', 'XPathExpression', 'XPathResult',
	'XSLTProcessor', 'CSS', 'WebAssembly', 'Audio', 'Image', 'Option', 'clientInformation', 'closed', 'customElements',
	'devicePixelRatio', 'document', 'event', 'external', 'frameElement', 'frames', 'history', 'innerHeight', 'innerWidth', 'length',
	'location', 'locationbar', 'menubar', 'name', 'navigator', 'ondevicemotion', 'ondeviceorientation', 'onorientationchange',
	'opener', 'orientation', 'outerHeight', 'outerWidth', 'pageXOffset', 'pageYOffset', 'parent', 'personalbar', 'screen',
	'screenLeft', 'screenTop', 'screenX', 'screenY', 'scrollX', 'scrollY', 'scrollbars', 'self', 'speechSynthesis', 'status',
	'statusbar', 'toolbar', 'top', 'visualViewport', 'window', 'alert', 'blur', 'cancelIdleCallback', 'captureEvents', 'close',
	'confirm', 'focus', 'getComputedStyle', 'getSelection', 'matchMedia', 'moveBy', 'moveTo', 'open', 'postMessage', 'print',
	'prompt', 'releaseEvents', 'requestIdleCallback', 'resizeBy', 'resizeTo', 'scroll', 'scrollBy', 'scrollTo', 'stop', 'toString',
	'dispatchEvent', 'cancelAnimationFrame', 'requestAnimationFrame', 'onabort', 'onanimationcancel', 'onanimationend',
	'onanimationiteration', 'onanimationstart', 'onauxclick', 'onblur', 'oncanplay', 'oncanplaythrough', 'onchange', 'onclick',
	'onclose', 'oncontextmenu', 'oncuechange', 'ondblclick', 'ondrag', 'ondragend', 'ondragenter', 'ondragleave', 'ondragover',
	'ondragstart', 'ondrop', 'ondurationchange', 'onemptied', 'onended', 'onerror', 'onfocus', 'onformdata', 'ongotpointercapture',
	'oninput', 'oninvalid', 'onkeydown', 'onkeypress', 'onkeyup', 'onload', 'onloadeddata', 'onloadedmetadata', 'onloadstart',
	'onlostpointercapture', 'onmousedown', 'onmouseenter', 'onmouseleave', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup',
	'onpause', 'onplay', 'onplaying', 'onpointercancel', 'onpointerdown', 'onpointerenter', 'onpointerleave', 'onpointermove',
	'onpointerout', 'onpointerover', 'onpointerup', 'onprogress', 'onratechange', 'onreset', 'onresize', 'onscroll', 'onseeked',
	'onseeking', 'onselect', 'onselectionchange', 'onselectstart', 'onstalled', 'onsubmit', 'onsuspend', 'ontimeupdate', 'ontoggle',
	'ontouchcancel', 'ontouchend', 'ontouchmove', 'ontouchstart', 'ontransitioncancel', 'ontransitionend', 'ontransitionrun',
	'ontransitionstart', 'onvolumechange', 'onwaiting', 'onwebkitanimationend', 'onwebkitanimationiteration',
	'onwebkitanimationstart', 'onwebkittransitionend', 'onwheel', 'onafterprint', 'onbeforeprint', 'onbeforeunload',
	'ongamepadconnected', 'ongamepaddisconnected', 'onhashchange', 'onlanguagechange', 'onmessage', 'onmessageerror', 'onoffline',
	'ononline', 'onpagehide', 'onpageshow', 'onpopstate', 'onrejectionhandled', 'onstorage', 'onunhandledrejection', 'onunload',
	'localStorage', 'caches', 'crossOriginIsolated', 'crypto', 'indexedDB', 'isSecureContext', 'origin', 'performance', 'atob',
	'btoa', 'createImageBitmap', 'queueMicrotask', 'sessionStorage', 'addEventListener', 'removeEventListener'
]

/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
	env: {
		es2022: true,
		node: true
	},
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: './tsconfig.eslint.json'
	},
	plugins: ['@typescript-eslint', 'deprecation'],
	rules: {
		'no-return-await': 'off',
		'@typescript-eslint/no-empty-interface': 'warn',
		'no-mixed-spaces-and-tabs': 'off',
		'no-duplicate-imports': 'warn',
		'no-empty-function': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'no-empty': 'off',
		'@typescript-eslint/ban-ts-comment': [
			'error',
			{
				'ts-expect-error': 'allow-with-description',
				'ts-ignore': 'allow-with-description',
				'ts-nocheck': 'allow-with-description',
				'ts-check': 'allow-with-description',
				'minimumDescriptionLength': 5
			}
		],
		'@typescript-eslint/no-floating-promises': 'warn',
		'prefer-promise-reject-errors': 'warn',
		'@typescript-eslint/no-misused-promises': 'error',
		'@typescript-eslint/no-base-to-string': 'error',
		'no-loss-of-precision': 'off',
		'@typescript-eslint/no-loss-of-precision': 'error',
		'no-throw-literal': 'off',
		'@typescript-eslint/no-throw-literal': 'warn',
		'@typescript-eslint/prefer-nullish-coalescing': 'warn',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'prefer-template': 'warn',
		'@typescript-eslint/no-this-alias': ['error', { allowDestructuring: true, allowedNames: ['that'] }],
		'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
		'no-implied-eval': 'off',
		'@typescript-eslint/no-implied-eval': ['error'],
		'deprecation/deprecation': 'warn',
		'@typescript-eslint/explicit-member-accessibility': ['warn', { accessibility: 'explicit' }],
		'@typescript-eslint/switch-exhaustiveness-check': 'warn',
		'@typescript-eslint/no-restricted-imports': [
			'error',
			{ paths: [{ name: 'console', importNames: ['assert'], message: 'Import from the `assert` module instead.' }] }
		],
		'no-restricted-globals': ['error', ...globals.map((v) => ({ name: v, message: "Don't use DOM globals." }))],
		'@typescript-eslint/no-namespace': 'off',
		'no-debugger': 'warn',
		'@typescript-eslint/prefer-as-const': 'warn'
	}
};
