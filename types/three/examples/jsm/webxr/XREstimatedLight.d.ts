import { DirectionalLight, Group, LightProbe, Texture, WebGLRenderer, Object3DEventMap } from '../../../src/Three.js';

export class SessionLightProbe {
    xrLight: XREstimatedLight;
    renderer: WebGLRenderer;
    lightProbe: LightProbe;
    xrWebGLBinding: XRWebGLBinding | null;
    estimationStartCallback: () => void;
    frameCallback: (this: SessionLightProbe, time: number, xrFrame: XRFrame) => void;

    constructor(
        xrLight: XREstimatedLight,
        renderer: WebGLRenderer,
        lightProbe: LightProbe,
        environmentEstimation: boolean,
        estimationStartCallback: () => void,
    );

    updateReflection: () => void;

    onXRFrame: XRFrameRequestCallback;

    dispose: () => void;
}

export interface XREstimatedLightEventMap extends Object3DEventMap {
    estimationstart: {};
    estimationend: {};
}

export class XREstimatedLight extends Group<XREstimatedLightEventMap> {
    lightProbe: LightProbe;
    directionalLight: DirectionalLight;
    environment: Texture;

    constructor(renderer: WebGLRenderer, environmentEstimation?: boolean);
}
