


export const debounced = (func, delay) => {

    let timerId;
    return (...args) => {
        clearTimeout(timerId);

        timerId = setTimeout(() => {
            func(...args)
        }, delay)
    }

}

export const uniqBy = (array, field) => {

    return Array.from(new Set(array.map(ele => ele[field]))).map(fieldValue => array.find(ele => ele[field] === fieldValue))


}



export const throttled = (func, limit) => {

    let lastRun = 0;
    let timeoutId = null;

    return function (...args) {
        let context = this;
        const now = Date.now();
        const remaining = limit - (now - lastRun);

        if (remaining <= 0) {

            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null
            }
            func.apply(context, args);
            lastRun = now;
        }
        else {
            if (timeoutId)
                clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(context, args);
                lastRun = Date.now();

            }, remaining);

        }

    }

}









