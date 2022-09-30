const swap = (arr, a, b) => {
    let out = JSON.parse(JSON.stringify(arr));

    out[a] = arr[b];
    out[b] = arr[a];

    return out;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function deepCopy(o) {
    return JSON.parse(JSON.stringify(o));
}

const sorts = {
    'bubble': async function (set, arr, speed) {
        let len = arr.length;
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len; j++) {
                if (arr[j] > arr[j + 1]) {
                    await sleep(speed);
                    arr = swap(arr, j, j + 1);
                    set(deepCopy(arr));
                }
            }
        }
        return true;
    },

    'insertion': async function (set, arr, speed) {

        for (let i = 0; i < arr.length; i++ ) {

            let key = arr[i];

            let j = i-1;
            while (j >= 0 && key < arr[j]){
                arr[j + 1] = arr[j];
                j -= 1;
            }
            arr[j + 1] = key;

            await sleep(speed);
            set(deepCopy(arr));
        }
        return true;
    },

    'merge': async function (set, arr, speed) {

        let running = deepCopy(arr);

        // Merge the two arrays: left and right
        function mergeArrays (left, right) {
            let resultArray = [], leftIndex = 0, rightIndex = 0;

            // We will concatenate values into the resultArray in order
            while (leftIndex < left.length && rightIndex < right.length) {
                if (left[leftIndex] < right[rightIndex]) {
                    resultArray.push(left[leftIndex]);
                    leftIndex++; // move left array cursor
                } else {
                    resultArray.push(right[rightIndex]);
                    rightIndex++; // move right array cursor
                }
            }

            // We need to concat here because there will be one element remaining
            // from either left OR the right
            return resultArray
                .concat(left.slice(leftIndex))
                .concat(right.slice(rightIndex));
        }

        async function recurse (unsortedArray, location) {
            unsortedArray = deepCopy(unsortedArray);
            // No need to sort the array if the array only has one element or empty
            if (unsortedArray.length <= 1) {
                return unsortedArray;
            }
            // In order to divide the array in half, we need to figure out the middle
            const middle = Math.floor(unsortedArray.length / 2);

            // This is where we will be dividing the array into left and right
            const left = unsortedArray.slice(0, middle);
            const right = unsortedArray.slice(middle);

            // Using recursion to combine the left and right
            let merged = mergeArrays(
                await recurse(left, location), await recurse(right, location + middle)
            );

            await sleep(speed);
            for (let i = 0; i < merged.length; i++) {
                running[i + location] = merged[i];
            }
            set(deepCopy(running));
            return merged;
        }

        await recurse(arr, 0);
        return true;
    },

    'quick': async function (set, arr, speed) {

        let running = deepCopy(arr);

        function swap_(items, leftIndex, rightIndex){
            let temp = items[leftIndex];
            items[leftIndex] = items[rightIndex];
            items[rightIndex] = temp;
        }

        async function partition(items, left, right) {
            let pivot   = items[Math.floor((right + left) / 2)], // middle element
                i       = left, // left pointer
                j       = right; // right pointer
            while (i <= j) {
                while (items[i] < pivot) {
                    i++;
                }
                while (items[j] > pivot) {
                    j--;
                }
                if (i <= j) {
                    swap_(items, i, j); // swapping two elements

                    let indexOfI = running.indexOf(items[i]);
                    let indexOfJ = running.indexOf(items[j]);
                    running = swap(running, indexOfI, indexOfJ);
                    set(running);

                    i++;
                    j--;

                    await sleep(speed);
                }
            }
            return i;
        }

        async function quickSort(items, left, right) {
            if (items.length > 1) {
                await partition(items, left, right).then (index => {
                    if (left < index - 1) { //more elements on the left side of the pivot
                        quickSort(items, left, index - 1);
                    }
                    if (index < right) { //more elements on the right side of the pivot
                        quickSort(items, index, right);
                    }
                });
            }
        }

        await quickSort(arr, 0, arr.length - 1);
        return true;
    },
}

export default sorts;