import EventEmitter from 'EventEmitter';

class AppEventHandler {
    /**
     * Initiate the EventEmitter
     */
    constructor() {
        this.eventEmitter = new EventEmitter();
    }

    /**
     * Bind the event listener
     * @param {string} eventName
     * @param {function} listener
     */
    on(eventName, listener) {
        this.eventEmitter.on(eventName, listener); 
    }

    /**
     * Clear the event listener
     * @param {string} eventName
     * @param {function} listener
     */
    removeEventListener(eventName, listener) {
        this.eventEmitter.removeListener(eventName, listener);
    }

    /**
     * Execute the Event 
     * @param {string} event
     * @param {object} payload
     * @param {boolean} error
     */
    emit(event, payload, error = false) {
        this.eventEmitter.emit(event, payload, error);
    }

}
export default AppEventHandler;
