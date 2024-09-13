export interface IPort extends chrome.runtime.Port {}

export default class Port implements IPort {
    private port: chrome.runtime.Port;
    private listeners: Map<string, ((message: any) => void)[]> = new Map();

    constructor(port: chrome.runtime.Port) {
        this.port = port;

        this.port.onMessage.addListener((message: any) => {
            const { type, data } = message;
            const handlers = this.listeners.get(type) || [];
            handlers.forEach(handler => handler(data));
        });
    }

    public on(type: string, callback: (data: any) => void): void {
        if (!this.listeners.has(type)) {
            this.listeners.set(type, []);
        }
        this.listeners.get(type)!.push(callback);
    }

    public send(type: string, data: any): void {
        this.port.postMessage({ type, data });
    }

    public removeListener(type: string, callback: (data: any) => void): void {
        const handlers = this.listeners.get(type);
        if (handlers) {
            const index = handlers.indexOf(callback);
            if (index !== -1) {
                handlers.splice(index, 1);
            }
        }
    }

    // Implement other methods and properties from chrome.runtime.Port
    public get name(): string {
        return this.port.name;
    }

    public get onDisconnect(): chrome.runtime.PortDisconnectEvent {
        return this.port.onDisconnect;
    }

    public get onMessage(): chrome.runtime.PortMessageEvent {
        return this.port.onMessage;
    }

    public disconnect(): void {
        this.port.disconnect();
    }

    public postMessage(message: any): void {
        this.port.postMessage(message);
    }

    // Add any other methods or properties from chrome.runtime.Port as needed
}