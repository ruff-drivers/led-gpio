export declare class Device extends RuffDevice {
    /**
     * Turn this device on.
     * @param callback - The callback.
     */
    turnOn(callback: (error: Error) => void): void;

    /**
     * Turn this device off.
     * @param callback - The callback.
     */
    turnOff(callback: (error: Error) => void): void;
}

export default Device;
